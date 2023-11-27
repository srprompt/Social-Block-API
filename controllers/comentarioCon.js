import { db } from "../conexao.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req, res) => {
        const q = `SELECT c.*, u.id AS usuarioId, nome, fotoPerfil FROM comentario AS c JOIN usuario AS u ON (u.id = c.usuarioId)
        WHERE c.postId = ? ORDER BY c.criadoEm DESC`;
    
        db.query(q, [req.query.postId], (err,data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
};

export const addComment = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Usuário não autenticado!")

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token não é válido!");
  
        const q = "INSERT INTO comentario(`descricao`, `criadoEm`, `usuarioId`, `postId`) VALUES (?)";
        
        const values = [
            req.body.descricao,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
            req.body.postId
        ];
    
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Comentário gerado.");
        });
    });
  };