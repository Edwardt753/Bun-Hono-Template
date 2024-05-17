import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

// Declaring Hono as the App Server
const app = new Hono({ strict: false });
//if false -> /hello/ ->ok
//if true -> /hello/ ->error not found

//Types Declaration for env If Needed
declare module "bun" {
  interface Env {
    CLIENT_URL: string;
  }
}

// Logger Configuration
app.use("*", logger());

// CORS Configuration
app.use(
  "*",
  cors({
    origin: Bun.env.CLIENT_URL.split(";"),
    // allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    // allowMethods: ["POST", "GET", "OPTIONS"],
    // exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    // maxAge: 600,
    // credentials: true,
  })
);

app.use("*", prettyJSON());

//main route endpoints
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

//Import Routing
import route from "./routes/route";
app.route("/", route);

export default {
  port: Bun.env.APP_PORT,
  fetch: app.fetch,
};
