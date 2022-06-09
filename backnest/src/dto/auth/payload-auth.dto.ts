import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class PayloadAuthDto  {
    _id: ObjectId;
    username: string;
}
