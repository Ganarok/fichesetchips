import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../utils/dto/users/create-user.dto';
import { UpdateUserDto } from '../utils/dto/users/update-user.dto';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(userToCreate: CreateUserDto): Promise<void> {
    console.log(userToCreate)
    const user =  new this.userModel(userToCreate);
    await user.save()
  }

  async findOne(username: string): Promise<User> {
    const user = await this.userModel.findOne<User>({
      username: username
    })
    return user;
  }

  async update(user: User, user_id?: string): Promise<User> {
    // const user = await this.userModel.findOne<User>({
    //   username: username
    // })
    return user;
  }

  async remove(user_id?: string): Promise<User> {
    const user = await this.userModel.findOne<User>({
      _id: user_id
    })
    return user;
  }
}
