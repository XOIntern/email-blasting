import { db } from '../../../prisma/db';

export async function GET() {
  try {
    const recipients = await db.orm.public.Recipient.all();
    return Response.json({
      message: 'Recipients retrieved successfully',
      recipients,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}

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
