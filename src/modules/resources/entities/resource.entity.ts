import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Tag } from '../../categories/entities/tag.entity';
import { LanguageTag } from '../../../shared/types';
import { User } from '../../users/entities/user.entity';

export enum ResourceType {
  ARTICLE = 'article',
  VIDEO = 'video',
  ARTICLE_SERIES = 'articleSeries',
  VIDEO_SERIES = 'videoSeries',
  PRACTICE = 'practice',
}

@Entity({ name: 'Resources' })
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: ResourceType,
  })
  type: ResourceType;

  @Column({
    type: 'enum',
    enum: LanguageTag,
  })
  language: LanguageTag;

  @Column()
  authorId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Tag, (tag) => tag.resources)
  @JoinTable({ name: 'ResourceTags' })
  tags: Tag[];

  @ManyToOne(() => User, (user) => user.resources)
  @JoinColumn({ name: 'authorId' })
  author: User;
}
