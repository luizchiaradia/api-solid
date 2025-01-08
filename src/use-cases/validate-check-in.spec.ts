import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { ValidateCheckInUseCase } from "./validate-check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let sut: ValidateCheckInUseCase;
let checkInsRepository: InMemoryCheckInsRepository;

describe("Validade Check-in Use Case", () => {
  beforeEach(async() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);
    // vi.useFakeTimers();
  });
  afterEach(() => {
    // vi.useRealTimers();
  });
  it("should be able to validate check in", async () => {
    const createdCheckIn = await checkInsRepository.create({
        user_id: "1",
        gym_id: "1",
        });
    const { checkIn } = await sut.execute({
        checkInId: createdCheckIn.id,
    });
    expect(checkIn?.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
  });
  it("should be able to validate an inexistent check in", async () => {
    await expect(sut.execute({
        checkInId: 'inexistent-check-in-id',
    })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
