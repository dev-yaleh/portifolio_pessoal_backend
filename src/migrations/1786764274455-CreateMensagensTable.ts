import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMensagensTable1786764274455 implements MigrationInterface {
    name = 'CreateMensagensTable1786764274455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tb_mensagens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(150) NOT NULL, \`email\` varchar(150) NOT NULL, \`mensagem\` varchar(2000) NOT NULL, \`lida\` tinyint NOT NULL DEFAULT 0, \`emailEnviado\` tinyint NOT NULL DEFAULT 0, \`data_criacao\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`tb_mensagens\``);
    }

}
