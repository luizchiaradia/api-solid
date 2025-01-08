import { Prisma, Gym } from "@prisma/client";

export interface FindManyNearbyParams {
    latitude: number;
    longitude: number;
}

export interface GymRepository {
    create(data: Prisma.GymCreateInput): Promise<Gym>;
    findById(id: string): Promise<Gym | null>;
    searchMany(query: string, page: number): Promise<Gym[]>;
    findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>;
}