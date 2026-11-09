import { createPortfolioSessionStorage, json } from '~/utils/server-runtime.server';

export async function action({ request }) {
  const formData = await request.formData();
  const theme = formData.get('theme');

  const { getSession, commitSession } = createPortfolioSessionStorage();

  const session = await getSession(request.headers.get('Cookie'));
  session.set('theme', theme);

  return json(
    { status: 'success' },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    }
  );
}
