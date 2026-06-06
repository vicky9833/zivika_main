import { ArrowRight, Award, Building2, Globe2, HeartPulse, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

import Reveal from "@/components/site/Reveal";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const credentials = [
  "DPIIT Recognised",
  "STPI AIC Incubatee",
  "IIT Jodhpur TISC Incubatee",
  "EmTek CoE Selected",
  "IIT Bombay Eureka Top 500 of 43000",
  "Wadhwani Foundation",
  "Sarvam AI Partner",
  "AWS Activate",
  "ABDM Integrated",
];

const stats = [
  { value: "1:2000", label: "Doctor-to-patient ratio in India today" },
  { value: "800M", label: "Indians without specialist access" },
  { value: "22", label: "Indian languages designed into the platform" },
  { value: "100+", label: "Doctor and patient interviews conducted" },
];

const principles = [
  {
    icon: Stethoscope,
    title: "Built from clinical reality",
    description:
      "Zivika started with field interviews, not abstract product assumptions, so every workflow is grounded in how Indian clinics actually function.",
  },
  {
    icon: HeartPulse,
    title: "Designed for continuity of care",
    description:
      "Every consult, note, prescription, and report should strengthen the patient record over time instead of disappearing after a single visit.",
  },
  {
    icon: Globe2,
    title: "Ready for Bharat-scale access",
    description:
      "Multilingual experiences, low-friction onboarding, and national health compatibility matter if healthcare infrastructure is meant for everyone.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-accent/30 via-background to-background">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <Reveal className="max-w-4xl">
              <Badge variant="outline" className="mb-6 rounded-full border-primary/20 bg-background px-4 py-1 text-primary">
                About Zivika Labs
              </Badge>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Redefining Healthcare for 1.4 Billion Indians.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                We are building the intelligent infrastructure that connects every Indian doctor, every Indian patient,
                and India&apos;s national health system through real clinical data.
              </p>
              <p className="mt-8 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                Zivika Labs is a deep-tech healthcare startup building India&apos;s Intelligent Health OS, an AI-powered
                platform that automates clinical documentation for doctors, creates lifelong digital health records for
                patients, and builds the data foundation for an AI Doctor accessible to 800 million Indians who have no
                doctor access today.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="rounded-full gradient-medical px-7 text-white hover:opacity-90">
                  <Link to="/product">
                    Explore the products
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full border-primary/20 px-7 text-primary hover:bg-primary/5 hover:text-primary">
                  <Link to="/contact">Talk to the team</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <Reveal>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat, index) => (
                  <Card key={stat.label} className="rounded-3xl border-border bg-accent/20 shadow-none">
                    <CardContent className="p-6">
                      <div className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Stat {index + 1}</div>
                      <div className="mt-3 text-4xl font-semibold text-primary">{stat.value}</div>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-b border-border bg-accent/10">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
            <Reveal className="space-y-6">
              <Badge variant="outline" className="rounded-full border-primary/20 px-4 py-1 text-primary">
                Founder
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                A founder story rooted in listening before building.
              </h2>
              <p className="text-base leading-8 text-muted-foreground sm:text-lg">
                Vikas Vishwakarma approached healthcare as an infrastructure problem, not a superficial software one.
                Zivika was shaped through 100 plus doctor and patient interviews before a single line of code was
                written, ensuring the platform reflects the operational reality of Indian healthcare delivery.
              </p>
              <div className="grid gap-5 sm:grid-cols-3">
                {principles.map((item, index) => (
                  <Reveal key={item.title} delayMs={index * 80}>
                    <Card className="h-full rounded-3xl border-border bg-background shadow-none">
                      <CardContent className="p-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <item.icon className="h-6 w-6" />
                        </div>
                        <h3 className="mt-5 text-lg font-semibold text-foreground">{item.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal delayMs={120}>
              <Card className="rounded-[2rem] border-border bg-background shadow-none">
                <CardContent className="p-8">
                  <div className="flex items-center gap-5">
                    <div className="flex h-24 w-24 items-center justify-center rounded-[1.75rem] bg-accent/30">
                      <img src="/zivika-logo.svg" alt="Zivika Labs logo" className="h-16 w-16" />
                    </div>
                    <div>
                      <div className="text-2xl font-semibold text-foreground">Vikas Vishwakarma</div>
                      <div className="mt-1 text-sm uppercase tracking-[0.18em] text-primary">Founder and CEO</div>
                    </div>
                  </div>
                  <p className="mt-8 text-base leading-8 text-muted-foreground">
                    Entrepreneur, full-stack developer and AI engineer. Built Zivika from 100 plus doctor and patient
                    interviews before writing a single line of code. Top 25 out of 5000 at STPI AIoT. Building to
                    ensure every Indian gets access to intelligent healthcare regardless of where they live.
                  </p>
                  <div className="mt-8 rounded-3xl bg-primary/5 p-6">
                    <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">
                      <Award className="h-4 w-4" />
                      Builder credibility
                    </div>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      Recognized by national startup, incubation, and AI innovation ecosystems while staying focused on
                      one core outcome: infrastructure that makes high-quality healthcare more reachable.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </section>

        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <Reveal className="max-w-3xl">
              <Badge variant="outline" className="rounded-full border-primary/20 px-4 py-1 text-primary">
                Credentials and Ecosystem
              </Badge>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Supported by institutions that understand deep-tech healthcare execution.
              </h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
                Zivika is being built with the seriousness of a healthcare infrastructure company: clinically grounded,
                ecosystem-compatible, and aligned with the digital public rails shaping India&apos;s future.
              </p>
            </Reveal>

            <div className="mt-10 flex flex-wrap gap-3">
              {credentials.map((credential, index) => (
                <Reveal key={credential} delayMs={index * 40}>
                  <Badge className="rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10">
                    {credential}
                  </Badge>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-[hsl(var(--medical-dark))] via-primary to-[hsl(var(--medical-blue))] text-primary-foreground">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
            <Reveal>
              <Badge variant="outline" className="rounded-full border-white/20 px-4 py-1 text-white">
                Why Zivika Exists
              </Badge>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
                Healthcare transformation needs infrastructure, not just another interface.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                The long-term opportunity is not simply digitizing appointments or creating one more patient app. It is
                creating a trusted operating system for care delivery, one that reduces administrative burden for
                doctors, gives patients portable records for life, and compounds clinical data into intelligent support
                across the health system.
              </p>
            </Reveal>

            <Reveal delayMs={120}>
              <Card className="rounded-[2rem] border-white/10 bg-white/10 shadow-none backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-white">
                    <Building2 className="h-4 w-4" />
                    Long-term ambition
                  </div>
                  <p className="mt-5 text-sm leading-8 text-white/80">
                    Over time, Zivika aims to become the data and intelligence layer that powers better care
                    coordination, better doctor productivity, and eventually AI-native access for the hundreds of
                    millions of Indians currently left outside the system.
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default About;
