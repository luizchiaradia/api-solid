import { FastifyInstance } from "fastify";
import { register } from "@/http/controllers/users/register";
import { authenticate } from "@/http/controllers/users/authenticate";
import { profile } from "@/http/controllers/users/profile";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { refresh } from "@/http/controllers/users/refresh";

export async function usersRoutes(app:FastifyInstance) {
    app.post("/users", register)
    app.post("/sessions", authenticate)
    app.get("/me", {onRequest: [verifyJWT]}, profile)
    app.patch("/token/refresh", refresh)
}