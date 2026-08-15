import { MigrationInterface, QueryRunner } from "typeorm";

export class AddViewsToProjetos1786758928260 implements MigrationInterface {
    name = 'AddViewsToProjetos1786758928260'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tb_projetos\` ADD \`views\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tb_projetos\` DROP COLUMN \`views\``);
    }

}
