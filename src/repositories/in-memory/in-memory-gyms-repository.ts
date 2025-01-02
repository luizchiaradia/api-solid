import { GymRepository } from '../../repositories/gyms-repository'
import { Gym, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryGymsRepository implements GymRepository {
    public items: Gym[] = []

    async findById(id: string) {
        const gym = this.items.find(item => item.id === id)
        if (!gym) {
            return null
        }
        return gym
    }

    async create(data: Prisma.GymUncheckedCreateInput) {
        const gym = {
            id: randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude as any),
            longitude: new Prisma.Decimal(data.longitude as any),
        }
        this.items.push(gym)
        return gym
    }
}