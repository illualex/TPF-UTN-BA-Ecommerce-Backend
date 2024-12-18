import { responseBuilder } from "../utils/builders/responseBuilder.js";

export const getPingController = (req, res) => {
  try {
    const response = responseBuilder(true, 200, "SUCCESS", { message: "pong" });
    res.status(200).json(response);
  } catch (err) {
    const errorResponse = responseBuilder(false, 500, "ERROR", { detail: err.message });
    res.status(500).json(errorResponse);
  }
};
