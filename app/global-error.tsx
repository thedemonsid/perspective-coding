"use client";
import Link from "next/link";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">Oops!</h1>
        <p className="text-gray-700 mb-6">
          Something went wrong. Please try again later.
        </p>
        <Link
          href="/"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
