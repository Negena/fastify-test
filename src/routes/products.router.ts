

import { FastifyInstance } from "fastify";
import { clients, deduct, products, profile } from "../controllers/products.controller";


export default async function productRoutes(fastify: any) {
    //VIEW ALL PRODUCTS
    fastify.get("/", products);
    // VIEW ALL CLIENTS
    fastify.get("/clients", { preHandler: [fastify.authenticate] }, clients);
    //BUY A PRODUCT
    fastify.put("/deduct", { preHandler: [fastify.authenticate] }, deduct);
    // SEE OWN PROFILE
    fastify.get("/profile", { preHandler: [fastify.authenticate] }, profile);
}