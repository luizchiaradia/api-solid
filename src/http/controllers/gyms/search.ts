
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";

export async function search(request: FastifyRequest, replay: FastifyReply) {
  const searchGymQuerySchema = z.object({
    q: z.string().nonempty(),
    page: z.coerce.number().min(1).default(1),
  });

  const { q, page } = searchGymQuerySchema.parse(request.query);

  const createGymUseCase = makeSearchGymsUseCase();

  const { gyms } = await createGymUseCase.execute({
    query: q,
    page,
  });

  return replay.status(200).send({
    gyms
  });
}
