import { NextRequest, NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader?.startsWith('Basic ')) {
    return unauthorized();
  }

  const base64Credentials = authHeader.slice('Basic '.length);

  let credentials: string;

  try {
    credentials = atob(base64Credentials);
  } catch {
    return unauthorized();
  }

  const separatorIndex = credentials.indexOf(':');

  if (separatorIndex === -1) {
    return unauthorized();
  }

  const username = credentials.slice(0, separatorIndex);
  const password = credentials.slice(separatorIndex + 1);

  if (
    username !== process.env.BASIC_AUTH_USER ||
    password !== process.env.BASIC_AUTH_PASSWORD
  ) {
    return unauthorized();
  }

  return NextResponse.next();
}

function unauthorized() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Development"',
    },
  });
}

export const config = {
  matcher: ['/:path*'],
};
