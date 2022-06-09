import { ApiProperty } from '@nestjs/swagger';
import mongoose, { ObjectId } from 'mongoose';

export class PayloadAuthDto  {
    _id: mongoose.Types.ObjectId;
    username: string;
}
