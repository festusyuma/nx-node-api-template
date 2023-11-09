import {
  Authenticated,
  AuthenticatedGuard,
} from '@backend-template/graphql-server';
import { UserData } from '@backend-template/types';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { NewProfile, Profile } from '../utils/types';
import { ProfileService } from './profile.service';

@Resolver('Profile')
@UseGuards(AuthenticatedGuard)
export class ProfileResolver {
  constructor(private profileService: ProfileService) {}

  @Query()
  getProfile(@Authenticated() user: UserData) {
    return this.profileService.fetchProfile(user.sub);
  }

  @Mutation()
  createProfile(
    @Authenticated() user: UserData,
    @Args('input') input: NewProfile
  ) {
    return this.profileService.createProfile({
      ...input,
      id: user.sub,
      email: user.email,
    });
  }

  @ResolveField()
  email(@Authenticated() user: UserData, @Parent() profile: Profile) {
    if (profile.id === user.sub) return profile.email;
    else return null;
  }
}
