import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <div className="w-full my-20 mx-96  space-y-6">
      {/* Title skeleton */}
      <Skeleton className="h-16 w-3/4" />

      {/* Date skeleton */}
      <Skeleton className="h-4 w-32" />

      {/* Summary skeleton */}
      <Skeleton className="h-20 w-full" />

      {/* Content skeletons - multiple lines */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
