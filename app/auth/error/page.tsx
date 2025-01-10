import { CardWrapper } from "@/components/auth/card-wrapper";

export default function AuthError() {
  return (
    <CardWrapper
      headerLabel="Error"
      backButtonLabel="Click here to return to the login page"
      backButtonHref="/auth/login"
    >
    <p className="text-center text-destructive">
      An error occurred. Please try again.
    </p>
    <p className="text-center mt-4">
      We apologize for the inconvenience. If the problem persists, please contact support.
    </p>
    <div className="flex justify-center mt-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-destructive"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
        />
      </svg>
    </div>
    </CardWrapper>
  );
}
