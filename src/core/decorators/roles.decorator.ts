import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { METADATA_ROLES_KEY } from '@core/common/constants';
import { UserRole } from '@core/common/types';

export const Roles = (...roles: UserRole[]) =>
  applyDecorators(SetMetadata(METADATA_ROLES_KEY, roles), ApiSecurity('jwt'));
