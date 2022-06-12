import { Injectable } from '@nestjs/common';
import { CreatePreferenceDto } from 'src/utils/dto/preferences/create-preference.dto';
@Injectable()
export class PreferencesService {
  create(createPreferenceDto: CreatePreferenceDto) {
    return 'This action adds a new preference';
  }

  findAll() {
    return `This action returns all preferences`;
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
