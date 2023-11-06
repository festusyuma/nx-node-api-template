import { CustomRes } from '@backend-template/helpers';
import { MESSAGE_MANAGER, Messaging } from '@backend-template/messaging';
import {
  generateOtp,
  generateToken,
  validateOtp,
  validateToken,
} from '@backend-template/token';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { Cache } from 'cache-manager';
import jwt, { Secret } from 'jsonwebtoken';

import { UserRepo } from '../repo/userRepo';
import { SecretsService } from '../secrets/secrets.service';
import {
  changePasswordData,
  forgotPasswordData,
  LoginData,
  OTPDetailsData,
  recoverUsernameData,
  VERIFY_OTP_TYPE,
  verifyOTPData,
} from '../utils/schema/types';

@Injectable()
export class AuthService {
  constructor(
    private repo: UserRepo,
    private secrets: SecretsService,
    @Inject(MESSAGE_MANAGER) private messaging: Messaging,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async login(data: LoginData) {
    const user = await this.repo
      .findByUsername(data.username)
      .elseThrow(CustomRes.unauthorized('Incorrect username or password'));

    if (!(await bcrypt.compare(data.password, user.password)))
      throw CustomRes.unauthorized('Incorrect username or password');

    const token = await generateToken(user, `user_${user.id}_token`);

    return { user, token };
  }

  async forgotPassword(data: forgotPasswordData) {
    const user = await this.repo
      .findByEmail(data.email)
      .elseThrow(CustomRes.unauthorized('Email not registered'));

    const otpDetails: OTPDetailsData = {
      timestamp: new Date(),
      client: data.email,
      success: true,
      message: 'OTP sent to user',
      otp: (await generateOtp(
        `user_${user.id}_otp`,
        VERIFY_OTP_TYPE.RESET
      )) as string,
      userId: user.id,
    };

    const encoded = await generateToken(
      otpDetails,
      `user_${user.id}_otpDetail`
    );

    await this.messaging.send({
      action: 'NOTIFICATION',
      body: {
        templateId: 'ForgotPassword',
        templateData: {
          name: user.username,
          otp: otpDetails.otp,
        },
      },
    });

    return { token: encoded };
  }

  async recoverUsername(data: recoverUsernameData) {
    const user = await this.repo
      .findByEmail(data.email)
      .elseThrow(CustomRes.unauthorized('Email not registered'));

    const otpDetails: OTPDetailsData = {
      timestamp: new Date(),
      client: data.email,
      success: true,
      message: 'OTP sent to user',
      otp: (await generateOtp(
        `user_${user.id}_otp`,
        VERIFY_OTP_TYPE.RECOVER_USERNAME
      )) as string,
      userId: user.id,
    };

    const encoded = await generateToken(
      otpDetails,
      `user_${user.id}_otpDetail`
    );

    await this.messaging.send({
      action: 'NOTIFICATION',
      body: {
        templateId: 'RecoverUsername',
        templateData: {
          name: user.username,
          otp: otpDetails.otp,
        },
      },
    });

    return { token: encoded };
  }
  async verifyOTP(data: verifyOTPData) {
    const decoded = (await validateToken(data.token)) as OTPDetailsData;

    if (!decoded) throw CustomRes.unauthorized('Invalid Token');

    if (data.client != decoded.client)
      throw CustomRes.unauthorized('OTP was not sent to this particular email');

    const otp = await validateOtp(
      data.otp,
      `user_${decoded.userId}_otp`,
      data.type
    );
    if (!otp)
      throw CustomRes.unauthorized(
        'OTP inputted not valid,\n' + 'kindly re-enter OTP'
      );

    const user = await this.repo.findByEmail(decoded.client).elseThrow();

    switch (data.type) {
      case VERIFY_OTP_TYPE.RECOVER_USERNAME:
        await this.messaging.send({
          action: 'NOTIFICATION',
          body: {
            templateId: 'RecoverUsername',
            templateData: {
              name: user.username,
              username: user.username,
            },
          },
        });
        break;
      case VERIFY_OTP_TYPE.RESET:
        break;
    }

    return data;
  }

  async changePassword(data: changePasswordData) {
    const decoded = (await validateToken(data.token)) as OTPDetailsData;

    if (!decoded) throw CustomRes.unauthorized('Invalid Token');

    const user = await this.repo
      .findByEmail(decoded.client)
      .elseThrow(CustomRes.badRequest('Account not active'));

    const salt: string = await bcrypt.genSalt(15);
    const hashPassword: string = await bcrypt.hash(data.password, salt);

    this.repo.updatePasswordById(user.id, hashPassword);

    return { message: 'Password Updated' };
  }
}
