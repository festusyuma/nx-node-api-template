import { expireItem, removeSetItem } from '@backend-template/cache';

import { jwtError } from '../utils';

export const invalidateToken = async (
  identifier: string,
  token?: string | null
): Promise<void> => {
  try {
    if (!token) await expireItem(identifier, -2);
    else await removeSetItem(identifier, token);
  } catch (e) {
    console.error(jwtError, e);
  }
};
