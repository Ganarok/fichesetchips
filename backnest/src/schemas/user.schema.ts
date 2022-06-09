import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Preference } from './preference.schema';
import * as bcrypt from 'bcrypt';
import { ROLE } from 'src/utils/dto/types';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ _id: true, type: mongoose.Schema.Types.ObjectId, auto: true })
    _id?: mongoose.Types.ObjectId;

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, default: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png" })
    avatar: string;

    @Prop({ required: true, default: "USER" })
    role: ROLE;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Preference', default: new mongoose.Types.ObjectId("62a1bc57f1343ffe0c12ef09") })
    preference_id?: mongoose.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(user.password, salt)
        user.password = hash
        next()
    } else {
        next()
    }
})