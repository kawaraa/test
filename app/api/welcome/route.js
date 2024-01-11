import UserController from "@/controllers/user-controller";

export async function GET(req) {
  try {
    const sessionToken = req.headers.get("authorization").split(" ")[1];
    const userController = new UserController();
    const result = await userController.handleRequest({ action: "welcome", sessionToken });
    return Response.json(result.data, { status: result.status });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
