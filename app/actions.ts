'use server';

import { Resend } from 'resend';

export interface ResendAttachment {
  filename: string;
  content: string;
  contentId: string;
}

export async function sendEmail(
  subject: string,
  html: string,
  attachments: ResendAttachment[],
) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: 'Test <test@broadcast.my.id>',
    to: 'yordanbian@gmail.com',
    subject,
    html,
    attachments,
  });
}
