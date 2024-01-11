import UserController from "@/controllers/user-controller";

export async function POST(req) {
  try {
    const userController = new UserController();
    const result = await userController.handleRequest({ ...(await req.json()), action: "login" });

    return Response.json(result.data, { status: result.status });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
