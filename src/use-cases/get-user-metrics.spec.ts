
import { expect, describe, it, beforeEach} from "vitest";
import { GetUserMetricsUseCase } from "./get-user-metrics";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

let sut: GetUserMetricsUseCase;
let checkInRepository: InMemoryCheckInsRepository;

describe("Get User Metrics Use Case", () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInRepository);
  });

  it("should be able to get check-ins metrics", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        user_id: "user-01",
        gym_id: `gym-${i}`,
      });
    }
    const { checkInsCount } = await sut.execute({
      userId: "user-01",
    });
    expect(checkInsCount).toEqual(22);
  });
});
