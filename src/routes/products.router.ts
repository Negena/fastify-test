

import { FastifyInstance } from "fastify";
import { clients, deduct, products, profile } from "../controllers/products.controller";


export default async function productRoutes(fastify: FastifyInstance) {
    fastify.get("/", products);
    fastify.get("/clients", { preHandler: [fastify.authenticate] }, clients);
    fastify.put("/deduct", { preHandler: [fastify.authenticate] }, deduct);
    fastify.get("/profile", { preHandler: [fastify.authenticate] }, profile);
}