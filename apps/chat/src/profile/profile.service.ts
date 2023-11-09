import { CustomRes } from '@backend-template/http';
import { Injectable } from '@nestjs/common';

import { NewProfile } from '../utils/types';
import { ProfileRepo } from './profile.repo';

@Injectable()
export class ProfileService {
  constructor(private profileRepo: ProfileRepo) {}

  fetchProfile(id: string) {
    return this.profileRepo.findById(id).elseNull();
  }

  async createProfile(input: NewProfile & { email: string; id: string }) {
    const existing = await this.profileRepo.findById(input.id).elseNull();
    if (existing) throw CustomRes.failed('profile already exist');

    return this.profileRepo.create(input);
  }
}
