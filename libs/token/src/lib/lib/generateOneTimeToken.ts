import { expireItem, setItem } from '@backend-template/cache';
import jwt from 'jsonwebtoken';

import { jwtError } from '../utils';

export const generateOneTimeToken = async <T>(data: T, identifier: string) => {
  try {
    const expiresIn = Number(process.env.ONE_TIME_JWT_EXPIRATION) || 3600;
    const token = jwt.sign({ data, identifier }, process.env.JWT_KEY ?? '', {
      expiresIn,
    });

    await setItem(identifier, token);
    await expireItem(identifier, expiresIn);

    return token;
  } catch (e) {
    console.error(jwtError, e);
  }
};
