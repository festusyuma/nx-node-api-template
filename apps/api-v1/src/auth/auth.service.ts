import { CustomRes } from '@backend-template/helpers';
import { MESSAGE_MANAGER, Messaging } from '@backend-template/messaging';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { Cache } from 'cache-manager';
import jwt from 'jsonwebtoken';

import { OtpRepo } from '../repo/optRepo';
import { UserRepo } from '../repo/userRepo';
import { SecretsService } from '../secrets/secrets.service';
import { UserData } from '../utils/schema/auth';
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
    private otpRepo: OtpRepo,
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

    const JWTPayload: UserData = {
      id: user.id ?? '',
      email: user.email,
      username: user.username,
      role: user.role ?? '',
    };

    const token = jwt.sign(
      JWTPayload,
      this.secrets.get('SECRET_KEY') as string,
      { expiresIn: 30000 }
    );

    return { user, token };
  }

  async forgotPassword(data: forgotPasswordData) {
    const user = await this.repo
      .findByEmail(data.email)
      .elseThrow(CustomRes.unauthorized('Email not registered'));

    const otp = await this.otpRepo
      .create({
        otp: Math.random().toFixed(6).slice(2),
        expirationTime: this.addMinutesToDate(new Date(), 10).toTimeString(),
      })
      .elseThrow();

    const otpDetails: OTPDetailsData = {
      timestamp: otp.created_at,
      client: data.email,
      success: true,
      message: 'OTP sent to user',
      otpId: otp.otp,
      userId: user.id,
    };

    const encoded = jwt.sign(
      otpDetails,
      this.secrets.get('SECRET_KEY') as string,
      { expiresIn: 30000 }
    );

    await this.messaging.send({
      action: 'NOTIFICATION',
      body: {
        templateId: 'ForgotPassword',
        templateData: {
          name: user.username,
          otp: otp.otp,
        },
      },
    });

    return { token: encoded };
  }

  async recoverUsername(data: recoverUsernameData) {
    const user = await this.repo
      .findByEmail(data.email)
      .elseThrow(CustomRes.unauthorized('Email not registered'));

    const otp = await this.otpRepo
      .create({
        otp: Math.random().toFixed(6).slice(2),
        expirationTime: this.addMinutesToDate(new Date(), 10).toTimeString(),
      })
      .elseThrow();

    const otpDetails: OTPDetailsData = {
      timestamp: otp.created_at,
      client: data.email,
      success: true,
      message: 'OTP sent to user',
      otpId: otp.id,
      userId: user.id,
    };

    const encoded = jwt.sign(
      otpDetails,
      this.secrets.get('SECRET_KEY') as string,
      { expiresIn: 30000 }
    );
    await this.messaging.send({
      action: 'NOTIFICATION',
      body: {
        templateId: 'RecoverUsername',
        templateData: {
          name: user.username,
          otp: otp.otp,
        },
      },
    });

    return { token: encoded };
  }
  async verifyOTP(data: verifyOTPData) {
    const decoded = jwt.verify(
      data.token,
      this.secrets.get('SECRET_KEY') as string
    ) as OTPDetailsData;

    if (!decoded) throw CustomRes.unauthorized('Invalid Token');

    if (data.client != decoded.client)
      throw CustomRes.unauthorized('OTP was not sent to this particular email');

    const otp = await this.otpRepo.findById(decoded.otpId).elseThrow();
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
    const decoded = jwt.verify(
      data.token,
      this.secrets.get('SECRET_KEY') as string
    ) as OTPDetailsData;

    if (!decoded) throw CustomRes.unauthorized('Invalid Token');

    const user = await this.repo
      .findByEmail(decoded.client)
      .elseThrow(CustomRes.badRequest('Account not active'));

    const salt: string = await bcrypt.genSalt(15);
    const hashPassword: string = await bcrypt.hash(data.password, salt);

    this.repo.updatePasswordById(user.id, hashPassword);

    return { message: 'Password Updated' };
  }

  addMinutesToDate = (date: Date, minutes: number) => {
    return new Date(date.getTime() + minutes * 60000);
  };
}
