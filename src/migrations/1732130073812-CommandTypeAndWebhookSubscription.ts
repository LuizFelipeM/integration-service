import { MigrationInterface, QueryRunner } from "typeorm";

export class CommandTypeAndWebhookSubscription1732130073812 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE command_type(
                id serial primary key,
                name text unique not null
            )`
        )
        await queryRunner.query(
            `CREATE TABLE webhook_subscription(
                id serial primary key,
                url text not null,
                command_type_id int references command_type(id)
            )`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS webhook_subscription`)
        await queryRunner.query(`DROP TABLE IF EXISTS command_type`)
    }

}
