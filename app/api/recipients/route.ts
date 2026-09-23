import { db } from '../../../prisma/db';

export async function POST(req: Request) {
  const { name, emailAddress } = await req.json();

  try {
    const recipient = await db.orm.public.Recipient.create({
      name: name,
      emailAddress: emailAddress,
    });

    return Response.json(
      { message: 'Recipient created successfully', recipient },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
