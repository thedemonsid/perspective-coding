"use client";
import * as z from "zod";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/zod-schema";
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
export const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = () => {
    const formValues = form.getValues();
    console.log(formValues);
  };
  return (
    <CardWrapper
      headerLabel="Welcome back!"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
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
                      placeholder="siddhesh@gmail.com "
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="*******"
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
          </div>
          <FormError message=""></FormError>
          <FormSuccess message=""></FormSuccess>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
