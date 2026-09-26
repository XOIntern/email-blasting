import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import EmailForm from './emailForm';

export default function Home() {
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
        <EmailForm />
      </div>
    </main>
  );
}
