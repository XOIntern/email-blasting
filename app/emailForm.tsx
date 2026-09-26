'use client';

import { useState } from 'react';
import { ResendAttachment, sendEmail } from './actions';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Tiptap from '@/components/Tiptap';

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

export default function EmailForm() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  async function handleSubmit(formData: FormData) {
    const subject = formData.get('subject') as string;
    const { html, attachments } = parseBase64ImagesToCID(body);

    await sendEmail(subject, html, attachments);
    alert('Email sent successfully!');
    setSubject('');
    setBody('');
  }

  return (
    <form action={handleSubmit} className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Send Email</CardTitle>
          <CardDescription>
            Compose an email message to blast to your organization&apos;s
            recipient list.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="subject">Subject</FieldLabel>
              <Input
                id="subject"
                name="subject"
                type="text"
                placeholder="Enter email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="body">Body</FieldLabel>
              <Tiptap content={body} onChange={setBody} />
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">
            Send Email
            <Send data-icon="inline-start" />
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
