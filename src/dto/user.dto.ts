import { UserModel } from '../models/user.model';

export const createUserDtoKeys: Array<string> = ['email', 'password'];

export interface CreateUserDto extends Omit<UserModel, '_id' | 'passwordHash'> {
    password: string
}

export interface DeleteUserDto {
    userEmail: string
    userId: string
}