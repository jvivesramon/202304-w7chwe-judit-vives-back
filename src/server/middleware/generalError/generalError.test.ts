import { type Request, type Response } from "express";
import type CustomError from "../../../CustomError/CustomError";
import { generalError } from "./generalError.js";

type CustomResponse = Pick<Response, "status" | "json">;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a generalError middleware", () => {
  describe("When it is called with an unknown error", () => {
    const next = jest.fn();

    const req = {};

    const res: CustomResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const error = new Error("Everything has explode");

    test("Then it should call the response's method status with code 500", () => {
      const statusCode = 500;

      generalError(error as CustomError, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });

    test("Then it should call the response's method json with code 500", () => {
      const { message } = error;

      generalError(error as CustomError, req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ message });
    });
  });
});
