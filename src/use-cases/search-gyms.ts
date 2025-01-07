import { GymRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface SearchGymsUseCaseRequest {
    query: string;
    page: number;
}

interface SearchGymsUseCaseResponse {
    gyms: Gym[];
}

export class SearchGymsUseCase {
  
  constructor(private usersRepository: GymRepository) {}
  
  async execute({ query, page }: SearchGymsUseCaseRequest) : Promise<SearchGymsUseCaseResponse> {

    const gyms = await this.usersRepository.searchMany(query, page)

    return { gyms };
 }
}
