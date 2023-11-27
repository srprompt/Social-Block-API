import { db } from "../conexao.js";
import jwt from "jsonwebtoken";

export const getAllUsers = (req, res) => {
  const token = req.cookies.accessToken;

    const q = `SELECT id, username, email, nome, fotoPerfil FROM usuario`;

    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
};