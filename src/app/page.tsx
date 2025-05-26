import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Target, FileText, Edit3, DownloadCloud, DollarSign, ChevronRight, Zap, Brain, FilePlus } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  const features = [
    {
      icon: <Zap className="h-10 w-10 text-primary mb-4" />,
      title: "AI Resume Tailoring",
      description: "Optimize your resume for each specific job, highlighting your most relevant skills and experience, powered by cutting-edge AI.",
    },
    {
      icon: <Brain className="h-10 w-10 text-primary mb-4" />,
      title: "Automated Cover Letters",
      description: "Get a professionally written cover letter based on your tailored resume and the job requirements, saving you hours of work.",
    },
    {
      icon: <Edit3 className="h-10 w-10 text-primary mb-4" />,
      title: "Editable Content",
      description: "Full control to refine and personalize your AI-generated documents. Make them truly yours before submission.",
    },
    {
      icon: <DownloadCloud className="h-10 w-10 text-primary mb-4" />,
      title: "Downloadable Documents",
      description: "Easily download your polished resume and cover letter in .txt format, ready to impress recruiters.",
    },
  ];

  const howItWorksSteps = [
    {
      icon: <FilePlus className="h-8 w-8 text-accent" />,
      title: "Upload & Describe",
      description: "Securely upload your current resume and paste the job description you're targeting.",
    },
    {
      icon: <Rocket className="h-8 w-8 text-accent" />,
      title: "AI Magic Happens",
      description: "Our AI analyzes your documents, tailors your resume, and crafts a compelling cover letter in seconds.",
    },
    {
      icon: <DownloadCloud className="h-8 w-8 text-accent" />,
      title: "Edit & Download",
      description: "Review, make any desired edits, and download your new, application-ready documents.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 text-center bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto px-6">
            <Rocket className="h-20 w-20 text-primary mx-auto mb-6 animate-bounce" />
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6">
              Propel Your Career with <span className="text-primary">ResumeRocket</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              AI-powered resume tailoring and cover letter generation. Transform your job applications from tedious to triumphant in minutes.
            </p>
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform">
              <Link href="/app">
                Start Tailoring Now <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
             <div className="mt-12">
              <Image
                src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxtZWV0aW5nfGVufDB8fHx8MTc0ODI5NDIzN3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="ResumeRocket dashboard preview"
                width={1200}
                height={600}
                className="rounded-lg shadow-2xl mx-auto"
                data-ai-hint="resume dashboard interface"
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
              Simple Steps to Your <span className="text-primary">Dream Job</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {howItWorksSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow bg-background">
                  <div className="p-4 bg-accent/10 rounded-full mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
              Why Choose <span className="text-primary">ResumeRocket?</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-center">{feature.icon}</div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-6 text-center">
            <DollarSign className="h-16 w-16 text-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Transparent & Simple Pricing
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
              No subscriptions, no hidden fees. Just straightforward pay-per-use.
            </p>
            <Card className="max-w-md mx-auto shadow-xl bg-card">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Per Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold text-foreground mb-4">$1.50</p>
                <p className="text-muted-foreground mb-6">
                  For one tailored resume and its accompanying cover letter.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 md:py-28 text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Launch Your Career to the Next Level?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Stop spending hours on applications. Let ResumeRocket give you the edge.
            </p>
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform">
              <Link href="/app">
                Tailor Your Resume Now <Rocket className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
