import UserService from "../services/user-service";

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async handleRequest(req) {
    try {
      const { action, email, password, sessionToken } = req;

      switch (action) {
        case "register":
          await this.userService.createUser(email, password);
          return { status: 201, data: { message: "User registered successfully" } };

        case "login":
          const token = await this.userService.loginUser(email, password);
          if (token) {
            return { status: 200, data: { token } };
          } else {
            return { status: 401, data: { error: "Invalid email or password" } };
          }

        case "welcome":
          const user = await this.userService.verifySession(sessionToken);
          if (user) {
            return { status: 200, data: { message: `Hello ${user}, you are logged in` } };
          } else {
            return { status: 401, data: { error: "Unauthorized" } };
          }

        default:
          return { status: 400, data: { error: "Invalid action" } };
      }
    } catch (error) {
      console.error("Error in UserController:", error);
      return { status: 500, data: { error: "Internal Server Error" } };
    }
  }
}

export default UserController;
