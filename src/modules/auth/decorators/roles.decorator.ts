import { UserRole } from '../../users/entities/user.entity';
import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { METADATA_ROLES_KEY } from '../../../shared/constants';

export const Roles = (...roles: UserRole[]) =>
  applyDecorators(SetMetadata(METADATA_ROLES_KEY, roles), ApiSecurity('jwt'));
