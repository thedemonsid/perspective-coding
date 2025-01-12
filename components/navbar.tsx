"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./toggle-button";
import { LogoutButton } from "./auth/logout-button";
import { LoginButton } from "./auth/login-button";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const navItems = [{ name: "Courses", href: "/courses" }];

const UserMenu = ({ session }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
        <Avatar className="h-8 w-8">
          <AvatarImage src={session?.Avatar} alt={session?.user?.name} />
          <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-40" align="end" forceMount>
      <DropdownMenuItem className="text-red-600">
        <LogOut className="mr-2 h-4 w-4" />
        <LogoutButton>Logout</LogoutButton>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const Navbar = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-foreground hover:text-foreground/80 transition-colors"
            >
              <Image
                src="/images/logo.jpeg"
                alt="Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-lg font-semibold tracking-tight">
                Perspective Coding
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
            {session ? (
              <UserMenu session={session} />
            ) : (
              <LoginButton>
                <Button>Log In</Button>
              </LoginButton>
            )}
            <ModeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <ModeToggle />
            {session && <UserMenu session={session} />}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-2 p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {!session && (
                <LoginButton>
                  <Button className="w-full">Log In</Button>
                </LoginButton>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
