"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProgressBar from "./progress-bar";
import PaymentCard from "./payment/payment-card";
import PaymentComponent from "./payment/big-card";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function Market() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("mathematics");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const subjects = [
    {
      id: "mathematics",
      title: "Mathematics",
      icon: "➗",
      description:
        "Master algebra, geometry, and calculus through interactive problem-solving",
    },
    {
      id: "computerScience",
      title: "Computer Science",
      icon: "💻",
      description:
        "Learn programming and computational thinking with hands-on coding",
    },
    {
      id: "artificialIntelligence",
      title: "Artificial Intelligence",
      icon: "🤖",
      description: "Explore the fundamentals of AI and machine learning",
    },
  ];

  const faqItems = [
    {
      question: "What age group is this platform suitable for?",
      answer:
        "Perspective Learning is specifically designed for students aged 14-16 years (Classes 8-10). The content and teaching methodology are tailored to match their learning needs and curriculum requirements.",
    },
    {
      question: "What subjects are covered?",
      answer:
        "We cover core subjects including Mathematics, Computer Science, Artificial Intelligence, and more. Each subject features interactive tutorials, practice exercises, and real-world applications.",
    },
    {
      question: "How much does it cost?",
      answer:
        "The subscription is priced at ₹199 per month, giving you full access to all subjects and features. We also offer a 7-day money-back guarantee if you're not satisfied.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription at any time. There are no long-term commitments, and we provide a hassle-free cancellation process.",
    },
  ];
  const router = useRouter();
  const handleStartLearning = () => {
    router.push("/courses");
  };
  const handleFreeTrial = () => {
    router.push("/signup"); // Assuming you have a signup page for free trial
  };

  return (
    <main
      className={`min-h-screen bg-background text-foreground ${
        isLoaded ? "animate-fadeIn" : "opacity-0"
      }`}
    >
      <ProgressBar></ProgressBar>

      {/* Hero Section - Improved spacing and alignment */}
      <section className="min-h-[90vh] bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background/5 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center pt-32 lg:pt-20 h-full pb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
                <span className="text-sm font-semibold">
                  New: AI-Powered Learning Path
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground tracking-tight mb-6">
                Learning Made <span className="text-primary">Interactive</span>
                {" & Fun"}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg">
                Discover a new way of learning core subjects through interactive
                tutorials designed specifically for students aged 14-16.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleStartLearning}
                  className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-lg font-semibold text-base shadow-lg shadow-primary/20 transition-all"
                  size="lg"
                >
                  Start Learning Now
                </Button>
                <Button
                  onClick={handleFreeTrial}
                  variant="outline"
                  className="inline-flex items-center justify-center border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 rounded-lg font-semibold text-base transition-all"
                  size="lg"
                >
                  Try Free Trial
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-background bg-muted"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">2,000+</span>{" "}
                  students already learning
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-2xl" />
              <div className="relative bg-card border border-border shadow-2xl rounded-2xl p-8">
                <div className="grid gap-6">
                  {subjects.map((subject, index) => (
                    <motion.div
                      key={subject.id}
                      className="bg-muted/50 backdrop-blur-sm p-6 rounded-xl border border-border/50"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">
                          {subject.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-card-foreground mb-2">
                            {subject.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {subject.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
              <span className="text-sm font-semibold">Why Choose Us</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose Perspective Learning?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the features that make learning engaging and effective
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Interactive Learning",
                description:
                  "Engage with dynamic content that makes complex concepts simple and fun to understand",
                icon: "🔍",
              },
              {
                title: "Comprehensive Curriculum",
                description:
                  "Cover all major subjects including Mathematics, CS, and AI with structured learning paths",
                icon: "📚",
              },
              {
                title: "Quick Progress",
                description:
                  "Learn at your own pace with bite-sized lessons and instant feedback",
                icon: "🚀",
              },
              {
                title: "Self-Paced Learning",
                description:
                  "Study whenever you want with 24/7 access to all learning materials",
                icon: "⏱️",
              },
              {
                title: "Safe Learning Environment",
                description:
                  "Age-appropriate content in a secure digital learning space",
                icon: "🛡️",
              },
              {
                title: "Peer Learning",
                description:
                  "Connect with other learners and share your learning journey",
                icon: "👥",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-card border border-border p-8 rounded-xl hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
              <span className="text-sm font-semibold">Our Subjects</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Explore Our Subjects
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Dive into a world of interactive learning across various
              disciplines
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {subjects.map((subject) => (
              <motion.button
                key={subject.id}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === subject.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab(subject.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {subject.title}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl">
                    {subjects.find((s) => s.id === activeTab)?.icon}
                  </span>
                  {subjects.find((s) => s.id === activeTab)?.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {subjects.find((s) => s.id === activeTab)?.description}
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Interactive Lessons
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Practice Exercises
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Real-world Applications
                  </li>
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
              <span className="text-sm font-semibold">Simple Pricing</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Start Your Learning Journey Today
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Affordable pricing with no hidden fees
            </p>
          </motion.div>

          <div className="flex justify-center">
            <motion.div
              className="w-full max-w-full grid gap-8 md:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <PaymentCard paymentAmount={149} />
              <PaymentCard paymentAmount={249} />
              <PaymentCard paymentAmount={599} />
            </motion.div>
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>7-day money-back guarantee</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
              <span className="text-sm font-semibold">FAQ</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about Perspective Learning
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                className="bg-card border border-border rounded-lg hover:border-primary/50 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  className="w-full px-6 py-4 text-left focus:outline-none"
                  onClick={() =>
                    setActiveFaq(activeFaq === index ? null : index)
                  }
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-foreground">
                      {item.question}
                    </span>
                    <svg
                      className={`w-6 h-6 text-primary transform transition-transform duration-300 ${
                        activeFaq === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-4"
                    >
                      <p className="text-muted-foreground">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-primary/10 rounded-3xl blur-2xl" />
            <div className="relative bg-card border border-border rounded-2xl p-8 md:p-16 overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full -translate-x-16 -translate-y-16" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10 rounded-full translate-x-16 translate-y-16" />
              <PaymentComponent />
              {/* 199 plan benefits card */}
              <div className="text-center mt-8">
                <p className="text-muted-foreground">
                  No credit card required • Cancel anytime
                </p>
                <p className="text-muted-foreground">
                  Secure payment with Razorpay
                </p>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">SSL</span>{" "}
                  secured transaction
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
