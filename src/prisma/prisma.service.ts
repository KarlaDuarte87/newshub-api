import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error('DATABASE_URL não definida');
    }

    const parsedUrl = new URL(url);
    const sslMode = parsedUrl.searchParams.get('sslmode');
    const isLocalHost =
      ['localhost', '127.0.0.1'].includes(parsedUrl.hostname) ||
      parsedUrl.hostname.endsWith('.local');
    const useSSL =
      sslMode === 'require' ||
      (sslMode !== 'disable' && sslMode !== 'false' && !isLocalHost);

    const pool = new Pool({
      connectionString: url,
      ssl: useSSL ? { rejectUnauthorized: false } : false,
    });
    const adapter = new PrismaPg(pool);
    super({ adapter: adapter as any });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}