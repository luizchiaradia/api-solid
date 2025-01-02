import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { CheckInUseCase } from "./check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins";

let sut: CheckInUseCase;
let usersRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;

describe("Check-in Use Case", () => {
  beforeEach(async() => {
    usersRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(usersRepository, gymsRepository);
    vi.useFakeTimers();
    await gymsRepository.create({
      id: "gym-01",
      title: "Gym 01",
      description: "The best gym",
      phone: "123456789",
      latitude: -19.9320754,
      longitude: -43.9503757,
    });
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -19.9320754,
      userLongitude: -43.9503757,
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });
  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -19.9320754,
      userLongitude: -43.9503757,
    });
    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -19.9320754,
        userLongitude: -43.9503757,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });
  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -19.9320754,
      userLongitude: -43.9503757,
    });
    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -19.9320754,
      userLongitude: -43.9503757,
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });
  it("should be not be able to check in on distant gym", async () => {
    await expect(() => sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -19.9272542,
      userLongitude: -43.9464008,
    })).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
