import { Injectable } from '@nestjs/common';
import { SHA3 } from 'sha3';
import * as crypto from 'crypto';

@Injectable()
export class Cryptography {
  public getSalt(length = 16): string {
    return crypto.randomBytes(length / 2).toString('hex');
  }

  public getHash(value: string, salt?: string): string {
    const hash = new SHA3(256);
    hash.update((salt ?? '') + value, 'utf-8');
    return hash.digest('hex');
  }
}
