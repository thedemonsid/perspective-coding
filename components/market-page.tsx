import { Button } from "./ui/button";
import ProgressBar from "./progress-bar";
import PaymentCard from "./payment/payment-card";
import PaymentComponent from "./payment/big-card";
import { numberOfUsers } from "@/lib/db/user";
import { Mail, Github, Twitter, MessageSquare } from "lucide-react";
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "./ui/accordion";
import Link from "next/link";

type Subject = {
  id: string;
  title: string;
  icon: string;
  description: string;
};

type Feature = {
  title: string;
  description: string;
  icon: string;
};

const subjects: Subject[] = [
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

const features: Feature[] = [
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
    description: "Age-appropriate content in a secure digital learning space",
    icon: "🛡️",
  },
  {
    title: "Peer Learning",
    description: "Connect with other learners and share your learning journey",
    icon: "👥",
  },
];
const faqItems = [
  {
    value: "item-1",
    question: "What age group is this platform suitable for?",
    answer:
      "Perspective Learning is specifically designed for students aged 14-16 years (Classes 8-10). The content and teaching methodology are tailored to match their learning needs and curriculum requirements.",
  },
  {
    value: "item-2",
    question: "What subjects are covered?",
    answer:
      "We cover core subjects including Mathematics, Computer Science, Artificial Intelligence, and more. Each subject features interactive tutorials, practice exercises, and real-world applications.",
  },
  {
    value: "item-3",
    question: "How much does it cost?",
    answer:
      "The subscription starts at ₹199 per month for our first 100 users, giving you full access to all subjects and features. We also offer a 7-day money-back guarantee if you're not satisfied.",
  },
  {
    value: "item-4",
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time. There are no long-term commitments, and we provide a hassle-free cancellation process.",
  },
];
const footerData = {
  copyright: {
    year: new Date().getFullYear(),
    authors: ["CodeToTech"],
    text: "Building the future of education with Next.js and AI",
  },
  social: [
    {
      username: "Email",
      url: "mailto:siddheshshrirame@gmail.com",
      icon: Mail,
    },
    {
      username: "GitHub",
      url: "https://github.com/thedemonsid/perspective-coding",
      icon: Github,
    },
    {
      username: "Twitter",
      url: "https://x.com/the_demon_sid",
      icon: Twitter,
    },
    {
      username: "WhatsApp",
      url: "https://wa.me/+919834533147",
      icon: MessageSquare, // Import MessageSquare from lucide-react
    },
  ],
  contact: {
    title: "Let's Connect",
    email: "siddheshshrirame@gmail.com",
    description: "Have questions about our courses? Reach out to us directly!",
    whatsapp: "+91 98345 33147",
  },
};

export default async function Market() {
  const numOfUsers = await numberOfUsers();
  const displayUsers = numOfUsers < 297 ? 297 : numOfUsers;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <ProgressBar />

      <section className="min-h-[90vh] bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background/5 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center pt-32 lg:pt-20 h-full pb-16">
            <div className="max-w-2xl">
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
                  className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-lg font-semibold text-base shadow-lg shadow-primary/20 transition-all"
                  size="lg"
                >
                  <Link href={"/blogs"}> Start Learning Now</Link>
                </Button>
                <Button
                  variant="outline"
                  className="inline-flex items-center justify-center border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 rounded-lg font-semibold text-base transition-all"
                  size="lg"
                >
                  <Link href={"/blogs"}> Try Now !!</Link>
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
                  <span className="font-semibold text-foreground">
                    {displayUsers}+
                  </span>{" "}
                  students already learning
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-2xl" />
              <div className="relative bg-card border border-border shadow-2xl rounded-2xl p-8">
                <div className="grid gap-6">
                  {subjects.map((subject) => (
                    <div
                      key={subject.id}
                      className="bg-muted/50 backdrop-blur-sm p-6 rounded-xl border border-border/50"
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
              <span className="text-sm font-semibold">Why Choose Us</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose Perspective Learning?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the features that make learning engaging and effective
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-card border border-border p-8 rounded-xl hover:shadow-lg transition-all duration-300"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
              <span className="text-sm font-semibold">Simple Pricing</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Start Your Learning Journey Today
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Affordable pricing with no hidden fees
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-full grid gap-8 md:grid-cols-3">
              <PaymentCard paymentAmount={199} />
              <PaymentCard paymentAmount={499} />
              <PaymentCard paymentAmount={799} />
            </div>
          </div>

          <div className="mt-12 text-center">
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
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
              <span className="text-sm font-semibold">FAQ</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about Perspective Learning
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
              <PaymentComponent paymentAmount={499} />
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

      {/* Footer Section */}
      <footer className="font-bold bg-background text-xl font-wotfard w-full border-t border-border/40">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              {footerData.contact.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {footerData.contact.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`mailto:${footerData.contact.email}`}
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <Mail size={16} />
                {footerData.contact.email}
              </a>
              <a
                href="https://wa.me/+919834533147"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare size={16} />
                {footerData.contact.whatsapp}
              </a>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 w-full">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                © {footerData.copyright.year}{" "}
                {footerData.copyright.authors.join(" & ")}
              </p>
              <p className="text-xs text-muted-foreground/80">
                {footerData.copyright.text}
              </p>
            </div>

            <div className="space-y-4 md:text-right">
              <div className="flex flex-wrap gap-6 md:justify-end">
                {footerData.social.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.username}
                      href={social.url}
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="group-hover:underline">
                        {social.username}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
