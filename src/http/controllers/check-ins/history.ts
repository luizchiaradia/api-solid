
import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function history(request: FastifyRequest, replay: FastifyReply) {
  const checkInhistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInhistoryQuerySchema.parse(request.query);

  const fetchUserHistoryUseCase = makeFetchUserCheckInsHistoryUseCase();

  const { checkIns } = await fetchUserHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  });

  return replay.status(200).send({
    checkIns
  });
}
