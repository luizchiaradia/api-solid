import { expect, describe, it, beforeEach } from "vitest";
import { SearchGymsUseCase } from "./search-gyms";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let sut: SearchGymsUseCase;
let GymsRepository: InMemoryGymsRepository;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    GymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(GymsRepository);
  });
  it("should be able to search gym", async () => {
    await GymsRepository.create({
      title: "Gym 1",
      description: "The best gym 1",
      phone: "123456789",
      latitude: -19.9320754,
      longitude: -43.9503757,
    });
    await GymsRepository.create({
      title: "Gym 2",
      description: "The best gym 2",
      phone: "123456789",
      latitude: -19.9320754,
      longitude: -43.9503757,
    });
    const { gyms } = await sut.execute({
      query: "Gym",
      page: 1,
    });
    expect(gyms).toHaveLength(2);
  });

  it("should be able to fetch paginated check-in history", async () => {
    for (let i = 1; i <= 22; i++) {
      await GymsRepository.create({
        title: `Gym ${i}`,
        description: `The best gym ${i}`,
        phone: "123456789",
        latitude: -19.9320754,
        longitude: -43.9503757,
      });
    }
    const { gyms } = await sut.execute({
      query: "Gym",
      page: 2,
    });
    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Gym 21" }),
      expect.objectContaining({ title: "Gym 22" }),
    ]);
  });
});
