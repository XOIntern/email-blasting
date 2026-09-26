'use client';

import { useState } from 'react';
import { sendEmail } from './actions';
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

export default function EmailForm() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  async function handleSubmit(formData: FormData) {
    const subject = formData.get('subject') as string;

    await sendEmail(subject, body);
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
