import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./toggle-button";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blogs" },
  { name: "About", href: "/about" },
];

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="mr-8 flex items-center gap-2 text-foreground hover:text-foreground/80 transition-colors"
            >
              <Image
                src="/images/logo.jpeg"
                alt="Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-lg font-semibold tracking-tight">
                vdsidously
              </span>
            </Link>

            <nav className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center">
            <button className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-all">
              <Search size={18} />
            </button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
