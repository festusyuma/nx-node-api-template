import { addToSet, expireItem, removeSetItems } from '@backend-template/cache';
import jwt from 'jsonwebtoken';
import { DateTime } from 'luxon';

import { jwtError } from '../utils';

export const generateToken = async <T = unknown>(
  data: T,
  identifier: string
): Promise<string | null> => {
  try {
    const expiresIn = Number(process.env.JWT_EXPIRATION) || 3600;
    const token = jwt.sign({ data, identifier }, process.env.JWT_KEY ?? '', {
      expiresIn,
    });

    const now = DateTime.now().toMillis() + 1;
    const score = DateTime.now().plus({ seconds: expiresIn }).toMillis();

    await addToSet(identifier, score, token);
    await removeSetItems(identifier, '-inf', now);
    await expireItem(identifier, expiresIn);

    return token;
  } catch (e) {
    console.error(jwtError, e);
    return null;
  }
};
