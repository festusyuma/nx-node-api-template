import { CustomRes } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
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
  verifyOTPData,
} from '../utils/schema/types';

@Injectable()
export class AuthService {
  constructor(
    private repo: UserRepo,
    private otpRepo: OtpRepo,
    private secrets: SecretsService //@Inject(MESSAGE_MANAGER) private messaging: Messaging
  ) {}

  async login(data: LoginData) {
    const user = await this.repo
      .findByUsername(data.username)
      .elseThrow(CustomRes.unauthorized('Incorrect username or password'));

    if (!(await bcrypt.compare(data.password, user.password)))
      throw CustomRes.unauthorized('Incorrect username or password');

    const result: UserData = {
      id: user.id ?? '',
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
      userId: user.id,
    };

    const encoded = jwt.sign(otpDetails, this.secrets.get('SECRET_KEY'), {
      expiresIn: 30000,
    });
    //
    // await this.messaging.send({
    //   action: 'NOTIFICATION',
    //   body: {
    //     templateId: 'ForgotPassword',
    //     templateData: {
    //       name: user.username,
    //       otp: otp.otp,
    //     },
    //   },
    // });

    return { token: encoded };
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
      userId: user.id,
    };

    const encoded = jwt.sign(otpDetails, this.secrets.get('SECRET_KEY'), {
      expiresIn: 30000,
    });
    // await this.messaging.send({
    //   action: 'NOTIFICATION',
    //   body: {
    //     templateId: 'RecoverUsername',
    //     templateData: {
    //       name: user.username,
    //       otp: otp.otp,
    //     },
    //   },
    // });

    return { token: encoded };
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

    //const user = await this.repo.findByEmail(decoded.client).elseThrow();

    // switch (data.type) {
    //   case VERIFY_OTP_TYPE.RECOVER_USERNAME:
    //     await this.messaging.send({
    //       action: 'NOTIFICATION',
    //       body: {
    //         templateId: 'RecoverUsername',
    //         templateData: {
    //           name: user.username,
    //           username: user.username,
    //         },
    //       },
    //     });
    //     break;
    //   case VERIFY_OTP_TYPE.RESET:
    //     break;
    // }

    await this.otpRepo.update(otp.id, {
      verified: true,
      verifiedAt: new Date().toUTCString(),
    });

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
