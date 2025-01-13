import React from "react";
import { Lock, ChevronRight, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CourseCard = ({ course }: { course: any }) => {
  const router = useRouter();
  const isLocked = course.status === "locked";
  const toast = useToast();
  const handleCourseAccess = async (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (isLocked) {
      toast.toast({
        title: "Course Locked",
        description: "Complete the previous level to unlock this course.",
        variant: "destructive",
      });
      return;
    }

    router.push(`/courses/${course.slug}`);
  };
  const handleMarkAsCompleted = async (
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await fetch(`/api/courses/${course.id}/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to mark course as completed");
      }

      const data = await response.json();

      toast.toast({
        title: "Success!",
        description: "Course marked as completed successfully.",
        className: "bg-green-200",
      });

      // Optionally redirect to the next course if available
      if (data.nextCourseSlug) {
        router.push(`/courses/${data.nextCourseSlug}`);
      }
    } catch (error) {
      console.log(error);

      toast.toast({
        title: "Error",
        description: "Failed to mark course as completed. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      onClick={handleCourseAccess}
      className={`
        relative group overflow-hidden
        rounded-xl border border-border/50
        bg-gradient-to-br ${course.color}
        transition-all duration-300 cursor-pointer
        ${isLocked ? "opacity-75" : "hover:shadow-lg hover:border-primary/20"}
      `}
    >
      {/* Card Content */}
      <div className="p-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-12 h-12 rounded-lg bg-background/50
            flex items-center justify-center"
          >
            {course.icon}
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-sm font-medium text-muted-foreground">
              Level {course.level}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground">{course.description}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {isLocked ? (
            <div className="flex items-center text-muted-foreground">
              <Lock className="w-4 h-4 mr-2" />
              <span className="text-sm">Complete previous level to unlock</span>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div
                className="flex items-center space-x-2 px-4 py-2
                rounded-lg bg-primary/10 text-primary
                hover:bg-primary/20 transition-colors duration-300"
              >
                <span>Start Learning</span>
                <ChevronRight className="w-4 h-4" />
              </div>

              {course.progress < 100 && (
                <Button
                  onClick={handleMarkAsCompleted}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark Complete
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Progress Indicator */}
      {!isLocked && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-background/50">
          <div
            className="h-full bg-primary/30 transition-all duration-300"
            style={{ width: `${course.progress}%` }}
          />
        </div>
      )}

      {/* Hover Effect */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/5
        to-transparent opacity-0 group-hover:opacity-100
        transition-opacity duration-300"
      />
    </div>
  );
};

export default CourseCard;
