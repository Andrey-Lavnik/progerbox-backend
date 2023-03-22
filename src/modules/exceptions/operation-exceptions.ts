import { Injectable } from '@nestjs/common';
import { OperationException } from './exception-types/operation-exception';

@Injectable()
export class OperationExceptions {
  public readonly users = {
    notFound: (info: { id: number }) => new OperationException('USER_NOT_FOUND', info),
    invalidLogin: (info: { login: string }) => new OperationException('USER_INVALID_LOGIN', info),
    invalidPassword: () => new OperationException('USER_INVALID_PASSWORD'),
  };

  public readonly resources = {
    notFound: (info: { id: number }) => new OperationException('RESOURCE_NOT_FOUND', info),
  };

  public readonly categories = {
    notFound: (info: { id: number }) => new OperationException('CATEGORY_NOT_FOUND', info),
  };
}
