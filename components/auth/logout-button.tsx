"use client";
import { useRouter } from "next/navigation";
interface LogoutButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  children,
  mode = "redirect",
}) => {
  const router = useRouter();
  const onClick = async () => {
    router.push("/auth/logout");
  };
  if (mode === "modal") {
    return <span>Todo : Implement modal</span>;
  }
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
