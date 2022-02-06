import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { SALT_ROUNDS } from 'src/common/config';

export class DefaultUserMigration1644134490165 implements MigrationInterface {
  name = 'DefaultUserMigration1644134490165';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "user" (name, login, password) values ('admin', 'admin', '${await bcrypt.hash('admin', SALT_ROUNDS)}')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "user" WHERE login = 'admin'`);
  }
}