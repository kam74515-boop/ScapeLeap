import { sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/libs/DB';

export async function GET() {
  try {
    await db.execute(sql`select 1`);
    return NextResponse.json({
      status: 'ok',
      service: 'scapeleap',
      database: 'connected',
    });
  } catch {
    return NextResponse.json({
      status: 'degraded',
      service: 'scapeleap',
      database: 'unavailable',
    }, { status: 503 });
  }
}
