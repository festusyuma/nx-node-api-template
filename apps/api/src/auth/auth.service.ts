import { CustomRes } from '@backend-template/helpers';
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
import { UserStatus } from '../utils/types';

@Injectable()
export class AuthService {
  constructor(
    private repo: UserRepo,
    private otpRepo: OtpRepo,
    private secrets: SecretsService, //@Inject(MESSAGE_MANAGER) private messaging: Messaging
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async login(data: LoginData) {
    const user = await this.repo
      .findByUsername(data.username)
      .elseThrow(CustomRes.unauthorized('Incorrect username or password'));

    if (user.status in [UserStatus.LOCKED, UserStatus.INACTIVE]) {
      throw CustomRes.unauthorized('Account locked, contact admin');
    }

    if (!(await bcrypt.compare(data.password, user.password))) {
      const login_attempts = (await this.cacheManager.get(
        `${user.id}_login_attempts`
      )) as number;

      if (!login_attempts) {
        await this.cacheManager.set(`${user.id}_login_attempts`, 1, 10000);
      } else {
        await this.cacheManager.set(
          `${user.id}_login_attempts`,
          login_attempts + 1
        );
      }
      if (login_attempts == 3) {
        await this.repo.updateStatusById(user.id, UserStatus.LOCKED);
        throw CustomRes.unauthorized('Account locked, contact admin');
      }
      throw CustomRes.unauthorized('Incorrect username or password');
    }
    await this.cacheManager.set(`${user.id}_login_attempts`, 0);
    const result: UserData = {
      id: user.id ?? '',
      agentId: user.agentId ?? '',
      email: user.email,
      username: user.username,
      role: user.role ?? '',
    };

    const token = jwt.sign(result, this.secrets.get('SECRET_KEY'), {
      expiresIn: 30000,
    });

    return { result, token };
  }

  async forgotPassword(data: forgotPasswordData) {
    const user = await this.repo
      .findByEmail(data.email)
      .elseThrow(CustomRes.unauthorized('Email not registered'));

    const otp = await this.otpRepo.create({
      otp: Math.random().toFixed(6).slice(2),
    });

    const otpDetails: OTPDetailsData = {
      timestamp: otp.created_at,
      client: data.email,
      success: true,
      message: 'OTP sent to user',
      otpId: otp.id,
      type: VERIFY_OTP_TYPE.RESET,
      userId: user.id,
    };

    const encoded = jwt.sign(otpDetails, this.secrets.get('SECRET_KEY'), {
      expiresIn: 30000,
    });

    // TODO send otp to user email

    return { token: encoded, otp: otp.otp };
  }

  async recoverUsername(data: recoverUsernameData) {
    const user = await this.repo.findByEmail(data.email).elseThrow();

    const otp = await this.otpRepo.create({
      otp: Math.random().toFixed(6).slice(2),
    });

    const otpDetails: OTPDetailsData = {
      timestamp: new Date(),
      client: data.email,
      success: true,
      message: 'OTP sent to user',
      otpId: otp.id,
      type: VERIFY_OTP_TYPE.RECOVER_USERNAME,
      userId: user.id,
    };

    const encoded = jwt.sign(otpDetails, this.secrets.get('SECRET_KEY'), {
      expiresIn: 30000,
    });
    //TODO send username to user email

    return { token: encoded, otp: otp.otp };
  }
  async verifyOTP(data: verifyOTPData) {
    const decoded = jwt.verify(
      data.token,
      this.secrets.get('SECRET_KEY')
    ) as OTPDetailsData;

    const current_date = new Date();

    if (data.client != decoded.client)
      throw CustomRes.badRequest('OTP was not sent to this particular email');

    const otp = await this.otpRepo.findById(decoded.otpId);

    if (!this.otpValidity(otp.expirationTime, current_date))
      throw CustomRes.badRequest('OTP Expired');
    if (otp.otp != data.otp)
      throw CustomRes.badRequest(
        'OTP inputted not valid,' + 'kindly re-enter OTP'
      );
    if (otp.verified) throw CustomRes.badRequest('OTP has been used');

    await this.otpRepo.update(otp.id, {
      verified: true,
      verifiedAt: new Date().toUTCString(),
    });

    //TODO send username to user email or send verification token to change password

    return { data, otp };
  }

  async changePassword(data: changePasswordData) {
    const decoded = jwt.verify(
      data.token,
      this.secrets.get('SECRET_KEY')
    ) as OTPDetailsData;

    if (!decoded) throw CustomRes.unauthorized('Invalid Token');

    const user = await this.repo
      .findByEmail(decoded.client)
      .elseThrow(CustomRes.badRequest('Account not active'));

    const salt: string = await bcrypt.genSalt(15);
    const hashPassword: string = await bcrypt.hash(data.password, salt);

    await this.repo.updatePasswordById(user.id, hashPassword);

    return { message: 'Password Updated' };
  }

  otpValidity = (a: Date, b: Date) => {
    return a.getTime() > b.getTime();
  };
}
