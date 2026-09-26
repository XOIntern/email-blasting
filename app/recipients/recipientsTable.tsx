'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

interface Recipient {
  id: number;
  name: string;
  emailAddress: string;
}

interface RecipientsTableProps {
  recipients: Recipient[];
}

export default function RecipientsTable({ recipients }: RecipientsTableProps) {
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
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium">{recipient.name}</TableCell>
                <TableCell>{recipient.emailAddress}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
