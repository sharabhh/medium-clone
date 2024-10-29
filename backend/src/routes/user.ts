import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signupInput, signinInput } from "@sharabh/medium-project-common";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.get("/", (c) => {
  return c.text("Hello Hono!, from user.ts");
});

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    const data = signupInput.safeParse(body)

    if (!success) {
      console.log(data.error);
      
      c.status(411);
      return c.json({ message: "Inputs are not in correct format", error: data?.error  });
    }
    const user = await prisma.user.create({
      data: {
        email: body.username,
        password: body.password,
      },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    console.log(jwt);

    return c.json({ jwt });
  } catch (err) {
    c.status(403);
    return c.json({ msg: "cannot create user" });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);

    if (!success) {
      c.status(411);
      return c.json({
        msg: "Inputs are not in correct format",
      });
    }
    console.log(body);
    const user = await prisma.user.findUnique({
      where: {
        email: body.username,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "user not found" });
    }
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e) {
    console.log(e);
  }
});

export default userRouter;
