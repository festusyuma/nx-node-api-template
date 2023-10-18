import { expireItem, getItem } from '@backend-template/cache';
import jwt from 'jsonwebtoken';

import { jwtError, JwtGenerationPayload } from '../utils';

export const validateOneTimeToken = async <T>(
  token: string
): Promise<T | void> => {
  try {
    const { data, identifier } = jwt.verify(
      token,
      process.env.JWT_KEY ?? ''
    ) as JwtGenerationPayload<T>;
    if (!data) return;

    const validToken = await getItem(identifier);
    if (!validToken || validToken !== token) return;
    await expireItem(identifier, -1);

    return data;
  } catch (e) {
    console.error(jwtError, e);
  }
};
