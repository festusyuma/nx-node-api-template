import { expireItem, setItem } from '@backend-template/cache';

import { otpError, OTPExpirationMinutes } from '../utils';

export const generateOtp = async (identifier: string, type: string) => {
  try {
    const otp = Math.random().toFixed(6).slice(2);
    const key = `${identifier}_otp_${type}`;

    await setItem(key, otp);
    await expireItem(key, OTPExpirationMinutes * 60);
    return otp;
  } catch (e) {
    console.error(otpError, e);
    return null;
  }
};
