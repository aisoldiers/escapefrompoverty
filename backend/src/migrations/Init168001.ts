import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init168001 implements MigrationInterface {
  name = 'Init168001'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
     create table transactions
     ( id uuid primary key,
       amount numeric(12,2) not null,
       currency varchar(3) not null,
       method varchar(32) not null,
       status varchar(16) not null,
       customer_email varchar(255),
       callback_url text,
       created_at timestamptz default now()
     );
    `);
    await queryRunner.query(`
     create table idempotency_keys
     ( key varchar(64) primary key,
       response_json jsonb,
       created_at timestamptz default now()
     );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('drop table if exists idempotency_keys');
    await queryRunner.query('drop table if exists transactions');
  }
}
