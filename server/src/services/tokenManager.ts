import { createHash } from 'node:crypto';
import valkey from '../databases/valkey/valkey';

const EXPIRY = 60 * 60 * 16;

export async function GenerateToken(email: string, id: number) {
  const rand = randString();

  const hashed = createHash('sha256')
    .update(rand + email + rand)
    .digest('hex');

  const res = await valkey.get(hashed);

  if (res != null) {
    return GenerateToken(email, id);
  }

  valkey.set(hashed, id, 'EX', EXPIRY);
  valkey.set(`value:${id}`, hashed, 'EX', EXPIRY);

  return hashed;
}

export async function FindOrGenerateToken(email: string, id: number) {
  const res = await valkey.get(`value: ${id}`);

  if (res == null) {
    return await GenerateToken(email, id);
  }

  return res;
}

export async function verifyToken(token: string) {
  const res = await valkey.get(token);

  return res;
}

function randString(): string {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
