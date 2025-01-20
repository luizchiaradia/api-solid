import { GymRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface CreateGymUseCaseRequest {
    title: string;
    description: string | null;
    phone: string | null;
    latitude: number;
    longitude: number;
}

interface CreateGymUseCaseResponse {
    gym: Gym;
}

export class CreateGymUseCase {
  
  constructor(private gymRepository: GymRepository) {}
  
  async execute({ title, description, phone, latitude, longitude}: CreateGymUseCaseRequest) : Promise<CreateGymUseCaseResponse> {

    const gym = await this.gymRepository.create({
        title,
        description,
        phone,
        latitude,
        longitude,
    })

    return { gym };
 }
}
