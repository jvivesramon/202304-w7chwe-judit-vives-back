import { type Request, type Response } from "express";
import { notFoundError } from "./notFoundError.js";
import CustomError from "../../../CustomError/CustomError.js";

type CustomResponse = Pick<Response, "status" | "json">;

describe("Given an notFoundError middleware", () => {
  describe("When it receives a next function", () => {
    test("Then it should call it with the CustomError with status code 404 and message 'Endpoint not found'", () => {
      const next = jest.fn();

      const req = {};

      const res: CustomResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const customError = new CustomError(404, "Endpoint not found");

      notFoundError(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
