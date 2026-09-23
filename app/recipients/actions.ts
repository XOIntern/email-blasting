'use server';

import { db } from '@/prisma/db';
import { revalidatePath } from 'next/cache';

export async function createRecipient(formData: FormData) {
  const name = formData.get('name') as string;
  const emailAddress = formData.get('emailAddress') as string;

  await db.orm.public.Recipient.create({
    name: name,
    emailAddress: emailAddress,
  });

  revalidatePath('/recipients');
}
