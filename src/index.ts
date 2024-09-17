import fastifyJwt from "@fastify/jwt";
import axios from "axios";
import bcrypt from "bcryptjs"
import * as dotenv from 'dotenv';
import authRoutes from "./routes/auth.router";
import productRoutes from "./routes/products.router";

const NodeCache = require('node-cache');
const fastify = require("fastify")({ logger: true });

// Load environment variables from .env file
dotenv.config();

//REGISTER A DB
fastify.register(require('@fastify/postgres'), {
    connectionString: `postgres://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DB}`
})

//AUTH REGISTRATION
fastify.register(fastifyJwt, {
    secret: 'somesecret' // Replace with a strong secret
});


// AUTH-DECORATOR
fastify.decorate('authenticate', async (request: any, reply: any) => {
    try {
        await request.jwtVerify();
    } catch (err) {
        reply.send(err);
    }
});


//AUTH-ROUTE
fastify.register(authRoutes, { prefix: "/auth" })
fastify.register(productRoutes, { prefix: "/products" })


// START THE SERVER
fastify.listen({ port: 3000 }, (err: string, address: string) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at port 30000`);
});


//EXPORTING APPLICATION
export default fastify