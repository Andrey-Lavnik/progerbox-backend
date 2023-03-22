import { MigrationInterface, QueryRunner } from 'typeorm';

export class auth1679217084145 implements MigrationInterface {
  name = 'auth1679217084145';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "UsedRefreshTokens" ("value" character varying NOT NULL, CONSTRAINT "PK_cef7fafebe148dd8d0e924fef94" PRIMARY KEY ("value"))`,
    );
    await queryRunner.query(`ALTER TABLE "Users" ADD "email" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email")`);
    await queryRunner.query(`ALTER TABLE "Users" ADD "passwordHash" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Users" ADD "salt" character varying(16) NOT NULL`);
    await queryRunner.query(`CREATE TYPE "public"."Users_role_enum" AS ENUM('regular', 'admin')`);
    await queryRunner.query(`ALTER TABLE "Users" ADD "role" "public"."Users_role_enum" NOT NULL DEFAULT 'regular'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE "public"."Users_role_enum"`);
    await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "salt"`);
    await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "passwordHash"`);
    await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945"`);
    await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "email"`);
    await queryRunner.query(`DROP TABLE "UsedRefreshTokens"`);
  }
}
