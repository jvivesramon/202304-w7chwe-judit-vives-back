import { type Response, type Request } from "express";
import {
  type UserData,
  type UserCredentials,
  type UserCredentialsRequest,
} from "../types";
import { Types } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../database/models/User.js";
import loginUserController from "./userControllers";

describe("Given a loginUserController controller", () => {
  describe("When it receives a new user's data", () => {
    test("Then it should call the response's method method status with 200", async () => {
      const credentials: UserCredentials = {
        username: "Jud",
        password: "Jud",
      };

      const req: Pick<Request, "body"> = {
        body: credentials,
      };

      const res: Pick<Response, "status" | "json"> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const next = jest.fn();

      const expectedStatus = 200;

      const userMock: UserData = {
        _id: new Types.ObjectId().toString(),
        username: "Jud",
        password: "Jud",
      };

      const token = "someToken";

      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(userMock),
      });

      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue(token);

      await loginUserController(
        req as UserCredentialsRequest,
        res as Response,
        next
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
});
