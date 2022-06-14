import { Injectable } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../utils/dto/users/create-user.dto';
import { UpdateUserDto } from '../utils/dto/users/update-user.dto';

@Injectable()
export class UsersService {

  async create(userToCreate: CreateUserDto): Promise<User> {
    return await User.create({ ...userToCreate });
  }

  async findOne(username: string): Promise<User> {
    const user = await User.findOne({
      where: { username: username }
    })
    return user;
  }

  async update(user: User, updateUser: UpdateUserDto): Promise<User> {
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

  async remove(user: User): Promise<User> {
    // TODO
    return user;
  }

  async removeAsAnAdmin(user_id: number): Promise<User> {
    // TODO
    const user = await User.findOne({
      where: { id: user_id }
    })
    return user;
  }
}
