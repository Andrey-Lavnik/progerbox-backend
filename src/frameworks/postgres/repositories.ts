import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { Tag } from './entities/tag.entity';
import { UsedRefreshToken } from './entities/used-refresh-token.entity';
import { User } from './entities/user.entity';

// TODO separate entities and database schemas

@Injectable()
export class Repositories {
  constructor(
    @InjectRepository(Category) public readonly categories: Repository<Category>,
    @InjectRepository(Resource) public readonly resources: Repository<Resource>,
    @InjectRepository(Tag) public readonly tags: Repository<Tag>,
    @InjectRepository(UsedRefreshToken)
    public readonly usedRefreshTokens: Repository<UsedRefreshToken>,
    @InjectRepository(User) public readonly users: Repository<User>,
  ) {}
}
