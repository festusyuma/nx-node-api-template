import { expireItem, getItem } from '@backend-template/cache';

import { otpError } from '../utils';

export const validateOtp = async (
  otp: string,
  identifier: string,
  type: string
) => {
  try {
    const key = `${identifier}_otp_${type}`;
    const existingOtp = await getItem(key);
    if (existingOtp !== otp) return false;

    await expireItem(key, -1);
    return true;
  } catch (e) {
    console.error(otpError, e);
    return false;
  }
};
