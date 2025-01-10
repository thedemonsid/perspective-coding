import { LucideCheckCircle } from "lucide-react";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) {
    return null;
  }
  return (
    <div className="flex py-3 px-2 text-sm items-center gap-x-2 bg-emerald-500/15 rounded-md text-emerald-500">
      <LucideCheckCircle size={24} />
      <p>{message}</p>
    </div>
  );
};
