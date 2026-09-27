'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { deleteRecipient } from './actions';

interface DeleteRecipientButtonProps {
  recipientId: number;
  onSuccess?: () => void;
}

export default function DeleteRecipientButton({
  recipientId,
  onSuccess,
}: DeleteRecipientButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteRecipient(recipientId);
        onSuccess?.();
        toast.success('Recipient deleted successfully');
      } catch {
        toast.error('Something went wrong. Please try again.');
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
      onClick={handleDelete}
      disabled={isPending}
      aria-label="Delete recipient"
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  );
}
