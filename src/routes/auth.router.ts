
import { login, register } from "../controllers/auth.controller";
import { FastifyInstance } from "fastify";

export default async function authRoutes(fastify: FastifyInstance) {

    fastify.post("/register", register);
    fastify.post("/login", login);

}