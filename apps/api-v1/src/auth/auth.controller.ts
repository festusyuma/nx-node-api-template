import { CustomRes, ZodValidationPipe } from '@backend-template/helpers';
import { recoverUsernameData } from '@backend-template/types';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';

import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  recoverUsernameSchema,
  verifyOTPSchema,
} from '../utils/schema';
import {
  changePasswordData,
  forgotPasswordData,
  LoginData,
  verifyOTPData,
} from '../utils/schema/authSchema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ZodValidationPipe(loginSchema))
  async login(@Body() data: LoginData) {
    return CustomRes.success(await this.authService.login(data));
  }

  @Post('forgotPassword')
  @UsePipes(new ZodValidationPipe(forgotPasswordSchema))
  async forgotPassword(@Body() data: forgotPasswordData) {
    return CustomRes.success(await this.authService.forgotPassword(data));
  }

  @Post('verifyOTP')
  @UsePipes(new ZodValidationPipe(verifyOTPSchema))
  async verifyOTP(@Body() data: verifyOTPData) {
    return CustomRes.success(await this.authService.verifyOTP(data));
  }

  @Post('recoverUsername')
  @UsePipes(new ZodValidationPipe(recoverUsernameSchema))
  async recoverUsername(@Body() data: recoverUsernameData) {
    return CustomRes.success(await this.authService.recoverUsername(data));
  }

  @Post('changePassword')
  @UsePipes(new ZodValidationPipe(changePasswordSchema))
  async changePassword(@Body() data: changePasswordData) {
    return CustomRes.success(await this.authService.changePassword(data));
  }
}
