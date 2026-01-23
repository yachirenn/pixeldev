"use client";
import { useActionState, ViewTransition } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { type FormState, submitContactForm } from "./action";

const ContactForm = () => {
  const [currentState, formAction, isPending] = useActionState<
    FormState,
    FormData
  >(submitContactForm, {});
  return (
    <div className="space-y-4">
      <form action={formAction} className="space-y-4 w-full max-w-md">
        <div className="space-y-2">
          <Label htmlFor="email" className={undefined}>Name</Label>
          <Input
            id="name"
            name="name"
            type="name"
            placeholder="Your name ..."
            required
            className="h-12 text-base"
            disabled={isPending}
          />
          <Label htmlFor="email" className={undefined}>Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="h-12 text-base"
            disabled={isPending}
          />
          <Textarea
            id="message"
            name="message"
            placeholder="Your message ..."
            required
            className="h-32 text-base"
            disabled={isPending}
          />
        </div>
        <Button
          type="submit"
          className="w-full h-12 text-base"
          disabled={isPending}
        >
          {isPending ? "Submitting" : "Send message"}
        </Button>

        {currentState.success && currentState.message && (
          <ViewTransition>
            <p className="text-center text-sm text-green-600">
              ✓ {currentState.message}
            </p>
          </ViewTransition>
        )}

        {currentState.error && (
          <ViewTransition>
            <p className="text-center text-sm text-red-600">
              {currentState.error}
            </p>
          </ViewTransition>
        )}
      </form>

      <p className="text-center text-xs text-muted-foreground">
        {
          "Let's connect! Fill out the form and I'll get back to you as soon as possible."
        }
      </p>
    </div>
  );
};
export default ContactForm;