import { Resend } from 'resend';

export async function POST(req: Request) {
  const { subject, body } = await req.json();

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: 'Test <test@broadcast.my.id>',
      to: ['yordanbian@gmail.com'],
      subject: subject,
      html: body,
    });

    if (error) {
      console.error(error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(
      { message: 'Email sent successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
