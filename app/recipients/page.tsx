'use client';

import { useState, useEffect, SubmitEvent } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileSpreadsheet, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Recipient = {
  id: number;
  name: string;
  emailAddress: string;
};

export default function RecipientsPage() {
  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [open, setOpen] = useState(false);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [loading, setLoading] = useState(true);

  const getRecipients = async () => {
    const res = await fetch('/api/recipients');

    if (!res.ok) {
      throw new Error('Failed to fetch recipients');
    }

    const data = await res.json();
    return data.recipients;
  };

  const fetchRecipients = async () => {
    try {
      setLoading(true);
      const recipients = await getRecipients();
      setRecipients(recipients);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    getRecipients()
      .then((recipients) => {
        if (!cancelled) {
          setRecipients(recipients);
        }
      })
      .catch(console.error)
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleAddRecipient(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch('/api/recipients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, emailAddress }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Error:', error);
      return;
    }

    const data = await response.json();

    alert(data.message);
    setName('');
    setEmailAddress('');
    setOpen(false);
    fetchRecipients();
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4 md:p-8">
      <div className="flex w-full max-w-3xl flex-col gap-4">
        {/* Top action bar */}
        <div className="flex items-center gap-2">
          <Link href="/" aria-label="Back to home">
            <Button variant="outline" size="icon" type="button">
              <ArrowLeft />
              <span className="sr-only">Back to home</span>
            </Button>
          </Link>

          {/* Add Recipient Dialog */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              render={
                <Button type="button">
                  <Plus data-icon="inline-start" />
                  Add Recipient
                </Button>
              }
            />
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Recipient</DialogTitle>
                <DialogDescription>
                  Enter the details of the new recipient to add to your list.
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={handleAddRecipient}
                className="flex flex-col gap-4"
              >
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter recipient name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="emailAddress">
                      Email Address
                    </FieldLabel>
                    <Input
                      id="emailAddress"
                      name="emailAddress"
                      type="email"
                      placeholder="Enter email address"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                    />
                  </Field>
                </FieldGroup>

                <DialogFooter>
                  <Button type="submit">Add Recipient</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Button variant="outline" type="button">
            <FileSpreadsheet data-icon="inline-start" />
            Import from Excel
          </Button>
        </div>

        {/* Recipients table */}
        <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-xs">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2">Name</TableHead>
                <TableHead className="w-1/2">Email Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="text-center text-muted-foreground"
                  >
                    Loading…
                  </TableCell>
                </TableRow>
              ) : recipients.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="text-center text-muted-foreground"
                  >
                    No recipients yet. Add one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                recipients.map((recipient) => (
                  <TableRow key={recipient.id}>
                    <TableCell className="font-medium">
                      {recipient.name}
                    </TableCell>
                    <TableCell>{recipient.emailAddress}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}
