import type { Context } from "hono";
import main_db from "../model";

export async function Liststudent(c: any) {
  const { id } = c.req.param;

  try {
    const resultlist = await main_db.studentsmodel!.findAll();
    return c.json({
      data: resultlist,
    });
  } catch (error) {
    return c.json({
      message: false,
      data: "not found / error",
    });
  }
}
