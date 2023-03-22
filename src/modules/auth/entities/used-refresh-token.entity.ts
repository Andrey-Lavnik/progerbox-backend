import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'UsedRefreshTokens' })
export class UsedRefreshToken {
  @PrimaryColumn()
  value: string;

  @CreateDateColumn()
  createdAt: Date;
}
