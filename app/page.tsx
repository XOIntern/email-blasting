'use client';

import { useState, SubmitEvent } from 'react';

import { Send, Users } from 'lucide-react';
import Link from 'next/link';
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

export default function Home() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch('/api/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subject, body }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Error:', error);
      return;
    }

    alert('Email sent successfully!');
    setSubject('');
    setBody('');
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4 md:p-8">
      <div className="flex w-full max-w-2xl flex-col gap-4">
        <div className="flex justify-start">
          <Link href="/recipients">
            <Button type="button">
              <Users data-icon="inline-start" />
              Manage Recipients
            </Button>
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="w-full">
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
      </div>
    </main>
  );
}
