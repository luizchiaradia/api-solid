import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";

export async function register(request: FastifyRequest, replay: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {

    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({ name, email, password });

  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return replay.status(409).send({message: err.message});
    }
    throw err
  }

  return replay.status(201).send();
}
