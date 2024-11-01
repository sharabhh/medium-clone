import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { verify } from "hono/jwt";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
  createBlogInput,
  updateBlogInput,
} from "@sharabh/medium-project-common";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  try {
    const header = c.req.header("Authorization") || "";

    const response = await verify(header, c.env.JWT_SECRET);
    console.log(response);

    if (response.id) {
      c.set("userId", response.id as any);
      await next();
    } else {
      c.status(401);
      return c.json({ error: "unauthorized" });
    }
  } catch (e) {
    c.status(500);
    return c.json({ error: "Internal Server Error", details: e });
  }
});

// create blog
blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

    const { success } = createBlogInput.safeParse(body);

    if (!success) {
      c.status(411);
      return c.json({ msg: "Inputs are not in correct format" });
    }
    const authorId = c.get("userId");

    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
        published: "",
      },
    });
    return c.json({
      id: blog.id,
    });
  } catch (e) {
    console.log(e);
    c.status(403);
    c.json({ msg: "cannot create" });
  }
});

// update blog
blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);

    if (!success) {
      c.status(411);
      return c.json({
        msg: "Inputs are not in correct format",
      });
    }
    const blog = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({
      id: blog.id,
    });
  } catch (e) {
    c.status(403);
    return c.json({ msg: "failed to update" });
  }
});

// add pagination here
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({ blogs });
  } catch (e) {
    c.status(403);
    return c.json({ msg: "failed to fetch" });
  }
});

// fetch specific blog
blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id = c.req.param("id");
    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({
      id: blog,
    });
  } catch (e) {
    c.status(404);
    return c.json({ msg: "not found" });
  }
});

export default blogRouter;
