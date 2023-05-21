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
import CustomError from "../../CustomError/CustomError";

describe("Given a loginUserController controller", () => {
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

  jwt.sign = jest.fn().mockReturnValue(token);

  describe("When it receives a new user's data", () => {
    bcrypt.compare = jest.fn().mockResolvedValue(true);

    test("Then it should call the response's method method status with 200", async () => {
      await loginUserController(
        req as UserCredentialsRequest,
        res as Response,
        next
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's method json with a token", async () => {
      await loginUserController(
        req as UserCredentialsRequest,
        res as Response,
        next
      );

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When it receives an invalid user data", () => {
    test("Then it should call the next method with the text error 'Wrong credentials' and the status code 401", async () => {
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const expectedError = new CustomError(401, "Wrong credentials");

      await loginUserController(
        req as UserCredentialsRequest,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
