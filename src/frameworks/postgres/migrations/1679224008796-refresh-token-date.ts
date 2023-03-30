import { MigrationInterface, QueryRunner } from 'typeorm';

export class refreshTokenDate1679224008796 implements MigrationInterface {
  name = 'refreshTokenDate1679224008796';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "UsedRefreshTokens" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "UsedRefreshTokens" DROP COLUMN "createdAt"`);
  }
}
