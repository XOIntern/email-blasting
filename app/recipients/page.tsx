'use server';

import { db } from '@/prisma/db';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileSpreadsheet } from 'lucide-react';
import CreateRecipientForm from './createForm';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

export default async function RecipientsPage() {
  const recipients = await db.orm.public.Recipient.all();

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

          <CreateRecipientForm />

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
                <TableHead className="w-1/5">Select</TableHead>
                <TableHead className="w-2/5">Name</TableHead>
                <TableHead className="w-2/5">Email Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recipients.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-muted-foreground"
                  >
                    No recipients yet. Add one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                recipients.map((recipient) => (
                  <TableRow key={recipient.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
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
