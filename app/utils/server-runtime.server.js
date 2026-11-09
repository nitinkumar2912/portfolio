import { createCookieSessionStorage, json } from '@remix-run/node';

export { json };

export function createPortfolioSessionStorage() {
  return createCookieSessionStorage({
    cookie: {
      name: '__session',
      httpOnly: true,
      maxAge: 604_800,
      path: '/',
      sameSite: 'lax',
      secrets: [process.env.SESSION_SECRET || ' '],
      secure: true,
    },
  });
}
