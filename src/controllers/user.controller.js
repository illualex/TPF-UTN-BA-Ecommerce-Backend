import UserRepository from "../repositories/user.repository.js";
import { responseBuilder } from "../utils/builders/responseBuilder.js";

export const getUserByEmailController = async (req, res) => {
  try {
    const { email } = req.user;

    if (!email) {
      return res.status(400).json(
        responseBuilder(false, 400, "BAD_REQUEST", {
          detail: "Email is required",
        })
      );
    }

    const user = await UserRepository.getByEmail(email);

    if (!user) {
      return res
        .status(404)
        .json(
          responseBuilder(false, 404, "NOT_FOUND", { detail: "User not found" })
        );
    }

    res.status(200).json(responseBuilder(true, 200, "SUCCESS", { user }));
  } catch (err) {
    res
      .status(500)
      .json(
        responseBuilder(false, 500, "SERVER_ERROR", { detail: err.message })
      );
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const users = await UserRepository.getAll();

    if (!users.length) {
      return res
        .status(404)
        .json(
          responseBuilder(false, 404, "NOT_FOUND", { detail: "No users found" })
        );
    }

    res.status(200).json(responseBuilder(true, 200, "SUCCESS", { users }));
  } catch (err) {
    res
      .status(500)
      .json(
        responseBuilder(false, 500, "SERVER_ERROR", { detail: err.message })
      );
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json(
        responseBuilder(false, 400, "BAD_REQUEST", {
          detail: "User ID is required",
        })
      );
    }

    const user = await UserRepository.getById(user_id);

    if (!user) {
      return res
        .status(404)
        .json(
          responseBuilder(false, 404, "NOT_FOUND", { detail: "User not found" })
        );
    }

    res.status(200).json(responseBuilder(true, 200, "SUCCESS", { user }));
  } catch (err) {
    res
      .status(500)
      .json(
        responseBuilder(false, 500, "SERVER_ERROR", { detail: err.message })
      );
  }
};

export const updateUserController = async (req, res) => {
  try {
    const { user_id } = req.params;
    const updates = req.body;

    const user = await UserRepository.getById(user_id);

    if (!user) {
      return res
        .status(404)
        .json(
          responseBuilder(false, 404, "NOT_FOUND", { detail: "User not found" })
        );
    }

    const updatedUser = await UserRepository.updateById(user_id, updates);
    res
      .status(200)
      .json(responseBuilder(true, 200, "USER_UPDATED", { user: updatedUser }));
  } catch (err) {
    res
      .status(500)
      .json(
        responseBuilder(false, 500, "SERVER_ERROR", { detail: err.message })
      );
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await UserRepository.getById(user_id);

    if (!user) {
      return res
        .status(404)
        .json(
          responseBuilder(false, 404, "NOT_FOUND", { detail: "User not found" })
        );
    }

    await UserRepository.deleteById(user_id);
    res.status(204).json(responseBuilder(true, 204, "USER_DELETED"));
  } catch (err) {
    res
      .status(500)
      .json(
        responseBuilder(false, 500, "SERVER_ERROR", { detail: err.message })
      );
  }
};
