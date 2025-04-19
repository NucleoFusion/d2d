import Valkey from 'iovalkey';

const valkey = new Valkey({
  port: 6379,
  host: 'valkey',
  password: 'valkeypassword',
});

valkey.on('error', (err) => {
  console.error('[Valkey] Error:', err);
});

export default valkey;
