import UserRepository from "../repositories/user.repository.js";
import { responseBuilder } from "../utils/builders/responseBuilder.js";

// Controlador para obtener un usuario por su correo electrónico (requiere autenticación)
export const getUserByEmailController = async (req, res) => {
  try {
    console.log("llega")
    // El correo electrónico se extrae del token de autenticación (JWT)
    const { email } = req.user; // Asumiendo que el correo electrónico está en el token JWT (decodificado en el middleware)

    if (!email) {
      return res.status(400).json(
        responseBuilder(false, 400, "BAD_REQUEST", {
          detail: "Email is required",
        })
      );
    }

    const user = await UserRepository.getByEmail(email); // Buscar al usuario por su correo electrónico

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

// Controlador para obtener todos los usuarios
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

// Controlador para obtener un usuario por ID
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

// Controlador para actualizar un usuario
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

// Controlador para eliminar un usuario
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
