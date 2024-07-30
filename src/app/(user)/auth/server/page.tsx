import { getToken } from 'next-auth/jwt';
import { cookies, headers } from 'next/headers';
import { NextRequest } from 'next/server';

export default async function Page() {
  const jwt = await getToken({
    req: {
      headers: Object.fromEntries(headers() as Headers),
      cookies: Object.fromEntries(
        cookies()
          .getAll()
          .map((c) => [c.name, c.value])
      ),
    } as unknown as NextRequest,
  });
  return <pre>{JSON.stringify(jwt)}</pre>;
}
