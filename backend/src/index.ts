import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import userRouter from "./routes/user"
import blogRouter from "./routes/blog"

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    prisma: string;
  };
}>();

// app.use("*", async (c, next) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env?.DATABASE_URL,
//   }).$extends(withAccelerate());

//   c.set('prisma', prisma as any);
//   await next();
// });

// app.use("/api/v1/blog/*", async (c, next) => {
//   const header = c.req.header("authorization") || "";
//   const response = await verify(header, c.env.JWT_SECRET);
//   if (response.id) {
//     c.set("userId", response.id as any);
//     await next();
//   } else {
//     c.status(401);
//     return c.json({ error: "unauthorized" });
//   }
// });



app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)



app.get("/", (c) => {
  return c.text("Hello Hono!");
});





export default app;
