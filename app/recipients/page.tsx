'use client';

import Link from 'next/link';
import { ArrowLeft, FileSpreadsheet, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

// Sample scaffold data reflecting Prisma Recipient schema
const sampleRecipients = [
  {
    id: 1,
    name: 'Alice Johnson',
    emailAddress: 'alice.johnson@example.com',
  },
  {
    id: 2,
    name: 'Bob Smith',
    emailAddress: 'bob.smith@example.com',
  },
  {
    id: 3,
    name: 'Catherine Lee',
    emailAddress: 'catherine.lee@example.com',
  },
  {
    id: 4,
    name: 'David Miller',
    emailAddress: 'david.miller@example.com',
  },
];

export default function RecipientsPage() {
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
          <Dialog>
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

              <form className="flex flex-col gap-4">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter recipient name"
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
              {sampleRecipients.map((recipient) => (
                <TableRow key={recipient.id}>
                  <TableCell className="font-medium">
                    {recipient.name}
                  </TableCell>
                  <TableCell>{recipient.emailAddress}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}
