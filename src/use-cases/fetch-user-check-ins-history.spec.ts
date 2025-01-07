import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

let sut: FetchUserCheckInsHistoryUseCase;
let checkInRepository: InMemoryCheckInsRepository;

describe("Fetch User Check-in History Use Case", () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHistoryUseCase(checkInRepository);
  });
  it("should be able to fetch check-in history", async () => {
    await checkInRepository.create({
      user_id: "user-01",
      gym_id: "gym-01",
    });
    await checkInRepository.create({
      user_id: "user-01",
      gym_id: "gym-02",
    });
    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 1,
    });
    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ user_id: "user-01", gym_id: "gym-01" }),
      expect.objectContaining({ user_id: "user-01", gym_id: "gym-02" }),
    ]);
  });

  it("should be able to fetch paginated check-in history", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        user_id: "user-01",
        gym_id: `gym-${i}`,
      });
    }
    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 2,
    });
    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ user_id: "user-01", gym_id: "gym-21" }),
      expect.objectContaining({ user_id: "user-01", gym_id: "gym-22" }),
    ]);
  });
});
