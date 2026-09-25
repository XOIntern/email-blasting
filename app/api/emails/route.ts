import { Resend } from 'resend';

interface ResendAttachment {
  filename: string;
  content: string;
  contentId: string;
}

function parseBase64ImagesToCID(html: string) {
  const attachments: ResendAttachment[] = [];
  let counter = 0;

  const updatedHtml = html.replace(
    /<img([^>]*)\bsrc=["']data:image\/(png|jpeg|jpg|gif|webp);base64,([^"']+)["']([^>]*)>/gi,
    (_, prefix, extension, base64Data, suffix) => {
      counter++;
      const contentId = `img_${counter}_${Date.now()}`;
      const filename = `image_${counter}.${extension}`;

      attachments.push({
        filename,
        content: base64Data, // Raw base64 content without data URI prefix
        contentId,
      });

      return `<img${prefix}src="cid:${contentId}"${suffix}>`;
    },
  );

  return { html: updatedHtml, attachments };
}

export async function POST(req: Request) {
  const { subject, body } = await req.json();
  const { html: updatedHtml, attachments } = parseBase64ImagesToCID(body);

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: 'Test <test@broadcast.my.id>',
      to: ['yordanbian@gmail.com'],
      subject: subject,
      html: updatedHtml,
      attachments,
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
