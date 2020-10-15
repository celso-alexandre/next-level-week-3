import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createImages1602714066867 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'images',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'path',
          type: 'varchar',
        },
        {
          name: 'orphanage_id',
          type: 'integer',
        },
      ],
      foreignKeys: [
        {
          name: 'FK_IMAGE_ORPHANAGE',
          referencedTableName: 'orphanages',
          columnNames: ['orphanage_id'],
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }
}
