import HeroSection from "@/components/hero-section";
import WaitlistForm from "@/components/waitlist-form";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Code2, Brain, Rocket, Users2 } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <Code2 className="h-8 w-8 text-primary" />,
      title: "Industry-Relevant",
      desc: "Curriculum designed with industry experts",
    },
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "Learn by Doing",
      desc: "Hands-on projects and real-world applications",
    },
    {
      icon: <Users2 className="h-8 w-8 text-primary" />,
      title: "Community",
      desc: "Join a thriving community of learners",
    },
    {
      icon: <Rocket className="h-8 w-8 text-primary" />,
      title: "Career Growth",
      desc: "Get placement support and career guidance",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />

        <section className="py-16 sm:py-20 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Choose Our Platform
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {features.map((item, i) => (
                <Card key={i} className="hover:shadow-lg transition-all">
                  <CardContent className="pt-8 text-center">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <WaitlistForm />
        <Footer />
      </main>
    </div>
  );
}
