import { env } from "../config/env";
import { logger } from "./logger";
import { Pool } from "pg";

export type User = {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string;
};

export type HealthRecord = {
  id: string;
  userId: string;
  type: string;
  title: string;
  data: unknown;
  createdAt: string;
};

export type WearableSample = {
  id: string;
  userId: string;
  source: string;
  payload: unknown;
  createdAt: string;
};

type Adapter = {
  init(): Promise<void>;
  createUser(u: Omit<User, "id" | "createdAt"> & { id?: string }): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
  createRecord(r: Omit<HealthRecord, "id" | "createdAt"> & { id?: string }): Promise<HealthRecord>;
  listRecords(userId: string): Promise<HealthRecord[]>;
  ingestWearable(s: Omit<WearableSample, "id" | "createdAt"> & { id?: string }): Promise<WearableSample>;
};

class MemoryAdapter implements Adapter {
  users: Map<string, User> = new Map();
  records: Map<string, HealthRecord> = new Map();
  wearable: Map<string, WearableSample> = new Map();
  async init() {}
  async createUser(u: Omit<User, "id" | "createdAt"> & { id?: string }) {
    const id = u.id || crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const user: User = { id, createdAt, email: u.email, passwordHash: u.passwordHash, name: u.name };
    this.users.set(id, user);
    return user;
  }
  async findUserByEmail(email: string) {
    for (const u of this.users.values()) if (u.email === email) return u;
    return null;
  }
  async createRecord(r: Omit<HealthRecord, "id" | "createdAt"> & { id?: string }) {
    const id = r.id || crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const rec: HealthRecord = { id, createdAt, userId: r.userId, type: r.type, title: r.title, data: r.data };
    this.records.set(id, rec);
    return rec;
  }
  async listRecords(userId: string) {
    const out: HealthRecord[] = [];
    for (const r of this.records.values()) if (r.userId === userId) out.push(r);
    return out;
  }
  async ingestWearable(s: Omit<WearableSample, "id" | "createdAt"> & { id?: string }) {
    const id = s.id || crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const sample: WearableSample = { id, createdAt, userId: s.userId, source: s.source, payload: s.payload };
    this.wearable.set(id, sample);
    return sample;
  }
}

class PostgresAdapter implements Adapter {
  pool: Pool;
  constructor(url: string) {
    this.pool = new Pool({ connectionString: url });
  }
  async init() {
    await this.pool.query(`
      create table if not exists app_users (
        id uuid primary key,
        email text unique not null,
        password_hash text not null,
        name text not null,
        created_at timestamptz not null
      );
    `);
    await this.pool.query(`
      create table if not exists health_records (
        id uuid primary key,
        user_id uuid not null references app_users(id) on delete cascade,
        type text not null,
        title text not null,
        data jsonb not null,
        created_at timestamptz not null
      );
    `);
    await this.pool.query(`
      create table if not exists wearable_samples (
        id uuid primary key,
        user_id uuid not null references app_users(id) on delete cascade,
        source text not null,
        payload jsonb not null,
        created_at timestamptz not null
      );
    `);
    logger.info({ msg: "database ready" });
  }
  async createUser(u: Omit<User, "id" | "createdAt"> & { id?: string }) {
    const id = u.id || crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const res = await this.pool.query(
      `insert into app_users (id,email,password_hash,name,created_at) values ($1,$2,$3,$4,$5) returning id,email,password_hash as "passwordHash",name,created_at as "createdAt"`,
      [id, u.email, u.passwordHash, u.name, createdAt]
    );
    return res.rows[0] as User;
  }
  async findUserByEmail(email: string) {
    const res = await this.pool.query(
      `select id,email,password_hash as "passwordHash",name,created_at as "createdAt" from app_users where email=$1`,
      [email]
    );
    return res.rows[0] || null;
  }
  async createRecord(r: Omit<HealthRecord, "id" | "createdAt"> & { id?: string }) {
    const id = r.id || crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const res = await this.pool.query(
      `insert into health_records (id,user_id,type,title,data,created_at) values ($1,$2,$3,$4,$5,$6) returning id,user_id as "userId",type,title,data,created_at as "createdAt"`,
      [id, r.userId, r.type, r.title, JSON.stringify(r.data), createdAt]
    );
    return res.rows[0] as HealthRecord;
  }
  async listRecords(userId: string) {
    const res = await this.pool.query(
      `select id,user_id as "userId",type,title,data,created_at as "createdAt" from health_records where user_id=$1 order by created_at desc`,
      [userId]
    );
    return res.rows as HealthRecord[];
  }
  async ingestWearable(s: Omit<WearableSample, "id" | "createdAt"> & { id?: string }) {
    const id = s.id || crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const res = await this.pool.query(
      `insert into wearable_samples (id,user_id,source,payload,created_at) values ($1,$2,$3,$4,$5) returning id,user_id as "userId",source,payload,created_at as "createdAt"`,
      [id, s.userId, s.source, JSON.stringify(s.payload), createdAt]
    );
    return res.rows[0] as WearableSample;
  }
}

export const db: Adapter = env.databaseUrl ? new PostgresAdapter(env.databaseUrl) : new MemoryAdapter();
