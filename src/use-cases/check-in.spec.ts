import { expect, describe, it, beforeEach } from "vitest";
import { CheckInUseCase } from "./check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

let sut: CheckInUseCase;
let usersRepository: InMemoryCheckInsRepository;

describe("Check-in Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(usersRepository);
  });
  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
        gymId : "gym-01",
        userId : "user-01"
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });
});
