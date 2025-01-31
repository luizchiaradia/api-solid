import { randomUUID } from "node:crypto"
import { CheckInsRepository } from "../check-ins-repository"
import { CheckIn, Prisma } from '@prisma/client'
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements CheckInsRepository {

  public items: CheckIn[] = []
  
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }
    this.items.push(checkIn)
    return checkIn
  }

  async findById(checkInId: string) {
    return this.items.find((checkIn) => checkIn.id === checkInId) || null
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)
    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = this.items
    .filter((checkIn) => checkIn.user_id === userId)
    .slice((page - 1) * 20, page * 20)
    return checkIns
  }

  async countByUserId(userId: string) {
    return this.items.filter((checkIn) => checkIn.user_id === userId).length
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkInOnsameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);
      return checkIn.user_id === userId && isOnSameDate;
    });

    if (!checkInOnsameDate) {
      return null;
    }

    return checkInOnsameDate;
  }
}