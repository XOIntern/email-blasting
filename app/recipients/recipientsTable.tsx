'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

interface Recipient {
  id: number;
  name: string;
  emailAddress: string;
}

interface RecipientsTableProps {
  recipients: Recipient[];
}

export default function RecipientsTable({ recipients }: RecipientsTableProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = sessionStorage.getItem('selectedRecipientIds');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    sessionStorage.setItem('selectedRecipientIds', JSON.stringify(selectedIds));
  }, [selectedIds]);

  const toggleSelected = (id: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  return (
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
                  <Checkbox
                    checked={selectedIds.includes(recipient.id)}
                    onCheckedChange={(isChecked: boolean) =>
                      toggleSelected(recipient.id, isChecked)
                    }
                  />
                </TableCell>
                <TableCell className="font-medium">{recipient.name}</TableCell>
                <TableCell>{recipient.emailAddress}</TableCell>
                <TableCell>
                  <Button variant="destructive" type="button">
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
