import { LucideAlertTriangle } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) {
    return null;
  }
  return (
    <div className="flex py-3 px-2 text-sm items-center gap-x-2 bg-destructive/15 rounded-md text-destructive">
      <LucideAlertTriangle size={24} />
      <p>{message}</p>
    </div>
  );
};
