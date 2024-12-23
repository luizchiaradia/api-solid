import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AutenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AutenticateUseCaseResponse {
    user: User
}

export class AutenticateUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AutenticateUseCaseRequest): Promise<AutenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doestPasswordMatches = await compare(password, user.password_hash);
    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError();
    }
    return {
      user,
    }
  }
}
