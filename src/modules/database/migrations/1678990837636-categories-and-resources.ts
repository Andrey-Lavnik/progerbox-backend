import { MigrationInterface, QueryRunner } from 'typeorm';

export class categoriesAndResources1678990837636 implements MigrationInterface {
  name = 'categoriesAndResources1678990837636';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Resources" ADD "name" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Resources" ADD "description" character varying NOT NULL`);
    await queryRunner.query(
      `CREATE TYPE "public"."Resources_type_enum" AS ENUM('article', 'video', 'articleSeries', 'videoSeries', 'practice')`,
    );
    await queryRunner.query(`ALTER TABLE "Resources" ADD "type" "public"."Resources_type_enum" NOT NULL`);
    await queryRunner.query(`CREATE TYPE "public"."Resources_language_enum" AS ENUM('ru', 'en')`);
    await queryRunner.query(`ALTER TABLE "Resources" ADD "language" "public"."Resources_language_enum" NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Resources" ADD "authorId" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Categories" ADD "description" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "Resources" ADD CONSTRAINT "FK_15d8607418778e9c2debba8b4e0" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Resources" DROP CONSTRAINT "FK_15d8607418778e9c2debba8b4e0"`);
    await queryRunner.query(`ALTER TABLE "Categories" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "Resources" DROP COLUMN "authorId"`);
    await queryRunner.query(`ALTER TABLE "Resources" DROP COLUMN "language"`);
    await queryRunner.query(`DROP TYPE "public"."Resources_language_enum"`);
    await queryRunner.query(`ALTER TABLE "Resources" DROP COLUMN "type"`);
    await queryRunner.query(`DROP TYPE "public"."Resources_type_enum"`);
    await queryRunner.query(`ALTER TABLE "Resources" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "Resources" DROP COLUMN "name"`);
  }
}
