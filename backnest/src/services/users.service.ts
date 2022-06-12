import { Injectable } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../utils/dto/users/create-user.dto';
import { UpdateUserDto } from '../utils/dto/users/update-user.dto';

@Injectable()
export class UsersService {

  async create(userToCreate: CreateUserDto): Promise<void> {
    await User.create({ ...userToCreate });
  }

  async findOne(username: string): Promise<User> {
    const user = await User.findOne({
      where: { username: username }
    })
    return user;
  }

  async update(user: User): Promise<User> {
    // TODO
    return user;
  }

  async updateAsAnAdmin(userUpdate: UpdateUserDto, user_id: number): Promise<User> {
    // TODO
    const user = await User.findOne({
      where: { id: user_id }
    })
    return user;
  }

  async remove(user_id?: string): Promise<User> {
    // TODO
    const user = await User.findOne({
      where: { id: user_id }
    })
    return user;
  }
}
