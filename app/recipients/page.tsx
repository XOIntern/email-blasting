'use server';

import { db } from '@/prisma/db';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileSpreadsheet } from 'lucide-react';
import CreateRecipientForm from './createForm';
import RecipientsTable from './recipientsTable';

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
        <RecipientsTable recipients={recipients} />
      </div>
    </main>
  );
}
