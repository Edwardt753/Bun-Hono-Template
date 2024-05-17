import { Hono } from "hono";
const route = new Hono({ strict: false });
import { Liststudent } from "../controller/01_studentlist";

route.get("/home", (c: any) => {
  return c.json({ message: "Hello World Home!" });
});

route.get("/student", Liststudent);
export default route;
