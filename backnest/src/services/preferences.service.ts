import { Injectable } from '@nestjs/common';
import { Preference } from 'src/schemas/preference.schema';
import { CreatePreferenceDto } from 'src/utils/dto/preferences/request-preference.dto';
@Injectable()
export class PreferencesService {
  async create(createPreferenceDto: CreatePreferenceDto) {
    const preference = await Preference.create({ ...createPreferenceDto });
    return preference;
  }

  async findAll() {
    const preferences = await Preference.findAll()
    return preferences;
  }

  findOne(id: number) {
    return `This action returns a #${id} preference`;
  }

  update(id: number, updatePreferenceDto: CreatePreferenceDto) {
    return `This action updates a #${id} preference`;
  }

  remove(id: number) {
    return `This action removes a #${id} preference`;
  }
}
