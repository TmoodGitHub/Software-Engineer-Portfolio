import { Redis } from '@upstash/redis';

const errors = await Redis.fromEnv().lrange(
  'tmoodbot:errors',
  0,
  -1,
);

if (errors.length === 0) {
  console.log('No errors recorded.');
}

for (const e of errors) {
  const status = e.status ? ` ${e.status}` : '';
  console.log(
    `${e.time}  ref ${e.ref}${status}  ${e.name}: ${e.message}`,
  );
}
