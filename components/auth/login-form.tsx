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
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
// import { login } from "@/actions/login";
// import { useState, useTransition } from "react";
// import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";

export const LoginForm = () => {
  // const searchParams = useSearchParams();
  // const urlError =
  //   searchParams.get("error") === "OAuthAccountNotLinked"
  //     ? "Account Already Exists with this email"
  //     : "";
  // const [isPending, startTransition] = useTransition();
  // const [error, setError] = useState("");
  // const [success, setSuccess] = useState("");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // const onSubmit = () => {
  //   setError("");
  //   setSuccess("");
  //   const formValues = form.getValues();

  //   startTransition(async () => {
  //     const response = await login(formValues);
  //     if (response.success) {
  //       setSuccess(response.message);
  //       form.reset();
  //     } else {
  //       setError(response.message);
  //     }
  //     console.log(response);
  //   });
  // };
  return (
    <CardWrapper
      headerLabel="Welcome back!"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <div className="space-y-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Quick login with
            </span>
          </div>
        </div>

        <div className="grid gap-4">
          <Button
            variant="outline"
            className="relative group overflow-hidden hover:border-primary/50"
            onClick={() => signIn("google")}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center justify-center gap-2">
              <FaGoogle />
              <span>Continue with Google</span>
            </div>
          </Button>

          <Button
            variant="outline"
            className="relative group overflow-hidden hover:border-primary/50"
            onClick={() => signIn("github")}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center justify-center gap-2">
              <FaGithub className="w-5 h-5" />
              <span>Continue with GitHub</span>
            </div>
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </div>

        <div className="rounded-lg border border-muted p-4 bg-muted/5">
          <div className="text-sm text-muted-foreground text-center space-y-2">
            <p>Email/Password login is currently disabled</p>
            <p>Please use Google or GitHub to sign in</p>
            <div className="text-xs mt-2 text-primary/80">
              This helps us provide a more secure and streamlined experience
            </div>
          </div>
        </div>

        <Form {...form}>
          <form className="space-y-4 opacity-50 pointer-events-none">
            {/* Existing form fields but disabled */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={true}
                      placeholder="Currently disabled"
                      className="bg-muted/5"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={true}
                      type="password"
                      placeholder="Currently disabled"
                      className="bg-muted/5"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </CardWrapper>
  );
};
