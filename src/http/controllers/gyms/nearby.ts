import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fetch-nearby-gyms-use-case";

export async function nearby(request: FastifyRequest, replay: FastifyReply) {
  const nearbyGymQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return value >= -90 && value <= 90;
    }),
    longitude: z.number().refine((value) => {
      return value >= -180 && value <= 180;
    }),
  });

  const { latitude, longitude } = nearbyGymQuerySchema.parse(request.query);

  const nearbyGymUseCase = makeFetchNearbyGymsUseCase();

  const { gyms } = await nearbyGymUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return replay.status(201).send({
    gyms,
  });
}
