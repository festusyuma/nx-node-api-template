import { getSetItems } from '@backend-template/cache';
import jwt from 'jsonwebtoken';
import { DateTime } from 'luxon';

import { jwtError, JwtGenerationPayload } from '../utils';

export const validateToken = async <T>(
  token?: string
): Promise<T | undefined> => {
  try {
    if (!token) return;

    const { data, identifier } = jwt.verify(
      token,
      process.env.JWT_KEY ?? ''
    ) as JwtGenerationPayload<T>;
    if (!data) return;

    const now = DateTime.now().toMillis() + 1;
    const validTokens = (await getSetItems(identifier, now, '+inf')) || [];
    if (!validTokens.includes(token)) return;
    return data;
  } catch (e) {
    console.error(jwtError, e);
    return;
  }
};
