import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Preference } from './preference.schema';
import { ROLE } from 'src/utils/types';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ _id: true, type: mongoose.Schema.Types.ObjectId, auto: true })
    _id?: ObjectId;

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: false, default: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png" })
    avatar?: string;

    @Prop({ required: true, default: "USER" })
    role?: ROLE;

    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Preference' })
    preference?: Preference;

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