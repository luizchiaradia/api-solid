import { GymRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface FetchNearbyGymsUseCaseRequest {
    userLatitude: number;
    userLongitude: number;
}

interface FetchNearbyGymsUseCaseResponse {
    gyms: Gym[];
}

export class FetchNearbyGymsUseCase {
  
  constructor(private usersRepository: GymRepository) {}
  
  async execute({ userLatitude, userLongitude }: FetchNearbyGymsUseCaseRequest) : Promise<FetchNearbyGymsUseCaseResponse> {

    const gyms = await this.usersRepository.findManyNearby({ latitude: userLatitude, longitude: userLongitude })

    return { gyms };
 }
}
