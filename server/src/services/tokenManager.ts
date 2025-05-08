import { createHash } from 'node:crypto';
import valkey from '../databases/valkey/valkey';

const EXPIRY = 60 * 60 * 16;

export function GenerateToken(email: string, id: number): string {
  const rand = randString();

  const hashed = createHash('sha256')
    .update(rand + email + rand)
    .digest('hex');

  valkey.set(hashed, id, 'EX', EXPIRY);

  return hashed;
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
