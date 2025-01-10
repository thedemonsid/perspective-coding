"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Header } from "./header";
import { Social } from "./social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = (props: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={props.headerLabel}></Header>
      </CardHeader>
      <CardContent>{props.children}</CardContent>
      {props.showSocial && (
        <CardFooter>
          <Social></Social>
        </CardFooter>
      )}
      <CardFooter>
        <BackButton
          label={props.backButtonLabel}
          href={props.backButtonHref}
        ></BackButton>
      </CardFooter>
    </Card>
  );
};

const BackButton = ({ label, href }: { label: string; href: string }) => {
  return (
    <Button variant="link" className="w-full">
      <Link href={href}>{label}</Link>
    </Button>
  );
};
