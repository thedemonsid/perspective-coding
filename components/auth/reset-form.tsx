"use client";
import * as z from "zod";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { ResetPasswordSchema } from "@/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { useState, useTransition } from "react";
import { reset } from "@/actions/reset";
export const ResetForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = () => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const response = await reset(form.getValues());
      if (response.success) {
        setSuccess(response.message);
        form.reset();
      } else {
        setError(response.message);
      }
      console.log(response);
    });
  };
  return (
    <CardWrapper
      headerLabel="Forgot Password?"
      backButtonLabel="Back to Login ?"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit(() => {
            onSubmit();
          })}
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      disabled={isPending}
                      placeholder="siddhesh@gmail.com "
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
          </div>
          <FormError message={error}></FormError>
          <FormSuccess message={success}></FormSuccess>
          <Button type="submit" className="w-full" disabled={isPending}>
            Send Reset Link
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
