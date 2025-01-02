import { prisma } from "@/lib/prisma"
import { Prisma, Gym } from "@prisma/client"
import { GymRepository } from "../gyms-repository"

export class PrismaGymsRepository implements GymRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })
    return gym
  }

  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })
    return gym
  }
}
