#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/b82551d8384154c39d66f7e5f90718884489f51ae0b5a530c50469053c833524/contract';
import endContract from '../../snapshots/b82551d8384154c39d66f7e5f90718884489f51ae0b5a530c50469053c833524/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'email',
        columns: [
          col('body', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('subject', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'recipient',
        columns: [
          col('emailAddress', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('emailId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'recipient',
        constraint: 'recipient_name_key',
        columns: ['name'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'recipient',
        constraint: 'recipient_emailAddress_key',
        columns: ['emailAddress'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'recipient',
        index: 'recipient_emailId_idx_f0213919',
        columns: ['emailId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'recipient',
        foreignKey: {
          name: 'recipient_emailId_fkey',
          columns: ['emailId'],
          references: { schema: 'public', table: 'email', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
