import HomePage from "@/components/home-page";
import Market from "@/components/market-page";

export default async function Page() {
  const featuredCourses = [
    {
      id: "python-basics",
      title: "Python for Beginners",
      description: "Learn the fundamentals of Python programming",
      level: "Beginner",
      duration: "4 weeks",
      category: "Programming",
      startDate: "2025-01-15",
    },
    {
      id: "web-dev-fundamentals",
      title: "Web Development Fundamentals",
      description: "Build your first website using HTML, CSS, and JavaScript",
      level: "Beginner",
      duration: "6 weeks",
      category: "Web Development",
      startDate: "2025-01-22",
    },
    {
      id: "react-advanced",
      title: "Advanced React Development",
      description: "Master state management and hooks in React",
      level: "Advanced",
      duration: "8 weeks",
      category: "Web Development",
      startDate: "2025-01-29",
    },
    {
      id: "data-analysis-python",
      title: "Data Analysis with Python",
      description: "Analyze and visualize data using Python libraries",
      level: "Intermediate",
      duration: "5 weeks",
      category: "Data Science",
      startDate: "2025-02-05",
    },
    {
      id: "ai-intro",
      title: "Introduction to Artificial Intelligence",
      description: "Learn the basics of AI and machine learning",
      level: "Beginner",
      duration: "6 weeks",
      category: "AI/ML",
      startDate: "2025-02-12",
    },
    {
      id: "cybersecurity-basics",
      title: "Cybersecurity Essentials",
      description: "Protect systems and data from cyber threats",
      level: "Beginner",
      duration: "4 weeks",
      category: "Cybersecurity",
      startDate: "2025-02-19",
    },
  ];

  const upcomingCourses = [
    {
      id: "java-fundamentals",
      title: "Java Fundamentals",
      description: "Learn Java programming for building robust applications",
      level: "Beginner",
      duration: "5 weeks",
      category: "Programming",
      startDate: "2025-03-01",
    },
    {
      id: "cloud-computing-intro",
      title: "Introduction to Cloud Computing",
      description: "Explore cloud technologies like AWS and Azure",
      level: "Beginner",
      duration: "4 weeks",
      category: "Cloud Computing",
      startDate: "2025-03-08",
    },
    {
      id: "design-uiux",
      title: "UI/UX Design for Beginners",
      description: "Create user-friendly interfaces and experiences",
      level: "Beginner",
      duration: "6 weeks",
      category: "Design",
      startDate: "2025-03-15",
    },
    {
      id: "devops-basics",
      title: "DevOps Basics",
      description: "Learn the principles of DevOps and CI/CD pipelines",
      level: "Intermediate",
      duration: "7 weeks",
      category: "DevOps",
      startDate: "2025-03-22",
    },
    {
      id: "blockchain-intro",
      title: "Introduction to Blockchain",
      description: "Understand blockchain technology and its applications",
      level: "Beginner",
      duration: "5 weeks",
      category: "Blockchain",
      startDate: "2025-03-29",
    },
    {
      id: "machine-learning",
      title: "Machine Learning Basics",
      description: "Build your first machine learning models",
      level: "Intermediate",
      duration: "8 weeks",
      category: "AI/ML",
      startDate: "2025-04-05",
    },
  ];

  return <Market />;
}
