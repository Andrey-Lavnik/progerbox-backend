import { Module } from '@nestjs/common';
import { Cryptography } from './cryptography';

@Module({
  providers: [Cryptography],
  exports: [Cryptography],
})
export class CryptographyModule {}
