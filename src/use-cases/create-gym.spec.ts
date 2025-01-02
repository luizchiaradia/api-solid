import { expect, describe, it, beforeEach } from "vitest";
import { CreateGymUseCase } from "./create-gym";
import { compare } from "bcryptjs";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let sut: CreateGymUseCase;
let gymsRepository: InMemoryGymsRepository;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });
  it("should be able to create a gym", async () => {
    const { gym } = await sut.execute({
      title: "Gym 01",
      description: "The best gym",
      phone: "123456789",
      latitude: -19.9320754,
      longitude: -43.9503757,
    });
    expect(gym.id).toEqual(expect.any(String));
  });
});
