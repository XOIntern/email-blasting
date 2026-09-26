'use client';

import { useState } from 'react';
import { createRecipient } from './actions';
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
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function CreateRecipientForm() {
  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [open, setOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    await createRecipient(formData);
    setOpen(false);
    setName('');
    setEmailAddress('');
  }

  return (
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

        <form action={handleSubmit} className="flex flex-col gap-4">
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
              <FieldLabel htmlFor="emailAddress">Email Address</FieldLabel>
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
  );
}
