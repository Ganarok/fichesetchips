import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { LANGUAGES, THEMES } from 'src/utils/dto/types';

export type PreferenceDocument = Preference & Document;

@Schema()
export class Preference {
  @Prop({ _id: true, type: mongoose.Schema.Types.ObjectId, auto: true })
  _id?: mongoose.Types.ObjectId;
  
  @Prop({ required: true, default: "DEFAULT" })
  theme: THEMES;

  @Prop({ required: true, default: "FRENCH" })
  language: LANGUAGES;
}

export const PreferenceSchema = SchemaFactory.createForClass(Preference);
