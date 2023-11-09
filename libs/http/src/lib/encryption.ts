import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, createHash } from 'crypto';

@Injectable()
export class Encryption {
  private readonly key: string;
  private readonly iv: string;

  constructor(encryptionKey: string, encryptionIV: string) {
    this.key = createHash('sha512')
      .update(encryptionKey)
      .digest('hex')
      .substring(0, 32);

    this.iv = createHash('sha512')
      .update(encryptionIV)
      .digest('hex')
      .substring(0, 16);
  }

  encrypt(data: unknown) {
    const cipher = createCipheriv(
      'aes-256-cbc',
      Buffer.from(this.key),
      this.iv
    );

    return Buffer.from(
      cipher.update(JSON.stringify(data), 'utf8', 'hex') + cipher.final('hex')
    ).toString('base64');
  }

  decrypt<T>(encryptedData: string) {
    const buff = Buffer.from(encryptedData, 'base64');
    const decipher = createDecipheriv('aes-256-cbc', this.key, this.iv);

    return JSON.parse(
      decipher.update(buff.toString(), 'hex', 'utf8') + decipher.final('utf8')
    ) as T;
  }
}
