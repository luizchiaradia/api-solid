import { expect, describe, it, beforeEach } from "vitest";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let sut: FetchNearbyGymsUseCase;
let GymsRepository: InMemoryGymsRepository;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    GymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(GymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await GymsRepository.create({
      title: "Far Gym 1",
      description: "The best gym 1",
      phone: "123456789",
      latitude: -19.8380901,
      longitude: -43.7947809,
    });
    await GymsRepository.create({
      title: "Near Gym 2",
      description: "The best gym 2",
      phone: "123456789",
      latitude: -19.9272542,
      longitude: -43.9464008,
    });
    const { gyms } = await sut.execute({
        userLatitude: -19.9272542,
        userLongitude: -43.9464008,
    });
    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
        expect.objectContaining({ title: "Near Gym 2" }),
    ]);
  });

});
