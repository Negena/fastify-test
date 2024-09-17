import { login, register } from "../controllers/auth.controller";
import { FastifyInstance } from "fastify";

export default async function authRoutes(fastify: any) {
    //REGISTRATION ROUTE
    fastify.post("/register", register);
    //SIGN-IN ROUTE
    fastify.post("/login", login);
}