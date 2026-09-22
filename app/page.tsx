import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4 md:p-8">
      <form className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Send Email</CardTitle>
            <CardDescription>
              Compose an email message to blast to your organization&apos;s recipient list.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="subject">Subject</FieldLabel>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Enter email subject"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="body">Body</FieldLabel>
                <Textarea
                  id="body"
                  name="body"
                  placeholder="Write your email content here..."
                  rows={8}
                  className="min-h-32 resize-y"
                />
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">
              <Send data-icon="inline-start" />
              Send Email
            </Button>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}
