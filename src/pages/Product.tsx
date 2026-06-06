import {
  Brain,
  ChevronRight,
  Database,
  Ear,
  LockKeyhole,
  MessageSquareText,
  Mic,
  Pill,
  ScrollText,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { Link } from "react-router-dom";

import Reveal from "@/components/site/Reveal";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const products = [
  {
    name: "Zivika AI Clinical Scribe",
    icon: Mic,
    color: "from-teal-500 to-cyan-500",
    accent: "text-teal-700",
    bg: "bg-teal-50",
    description:
      "Listens to live doctor-patient conversations in all 22 Indian languages. Auto-generates complete SOAP clinical notes, prescriptions and visit summaries without the doctor typing a single word. Saves to ABDM health locker. Sends summary to patient on WhatsApp instantly. Built for the Indian clinic, works offline, works on any device, works in any language.",
    highlights: [
      "Ambient listening built for multilingual Indian consultations",
      "SOAP notes, prescriptions, and summaries created automatically",
      "Designed for low-friction clinic workflows and offline resilience",
    ],
  },
  {
    name: "Zivika Health Locker",
    icon: ShieldCheck,
    color: "from-slate-900 to-slate-700",
    accent: "text-slate-900",
    bg: "bg-slate-100",
    description:
      "India's DigiLocker for health, a lifelong digital health record linked to ABDM and ABHA. Every consultation, prescription, lab report and diagnosis stored permanently and portably. The patient carries their complete medical history to every doctor they ever visit, for the rest of their life.",
    highlights: [
      "Portable records linked to ABDM and ABHA rails",
      "A durable timeline of care across clinics, labs, and diagnoses",
      "Structured health data patients can take anywhere for life",
    ],
  },
  {
    name: "Zivika AI Health Copilot",
    icon: Brain,
    color: "from-[#27AE60] to-emerald-500",
    accent: "text-[#1F8A4B]",
    bg: "bg-emerald-50",
    description:
      "An AI assistant that answers patient questions about their diagnosis, medicines, dosage and lifestyle in their own language. Medicine reminders. Report explanations. Health guidance. Available on WhatsApp and the patient app with zero onboarding friction.",
    highlights: [
      "Answers follow-up questions in the patient's own language",
      "Supports adherence with reminders, dosage clarity, and report explanations",
      "Accessible through WhatsApp and the patient app without onboarding friction",
    ],
  },
];

const workflow = [
  {
    title: "Patient Arrives",
    description: "A consultation starts naturally inside the clinic or over a remote care interaction.",
    icon: Smartphone,
  },
  {
    title: "AI Listens",
    description: "Ambient AI captures the consultation without interrupting the doctor-patient relationship.",
    icon: Ear,
  },
  {
    title: "SOAP Note Generated",
    description: "Clinical documentation, prescription context, and visit summary are structured automatically.",
    icon: ScrollText,
  },
  {
    title: "Sent to Patient",
    description: "The patient receives care instructions and records instantly via WhatsApp and the health locker.",
    icon: MessageSquareText,
  },
  {
    title: "Data Flywheel",
    description: "Each visit strengthens the lifelong record and the intelligence layer powering future care.",
    icon: Database,
  },
];

const technologies = [
  "Ambient AI",
  "Multilingual NLP",
  "Large Language Models",
  "Vision AI",
  "Real-time Speech Recognition",
  "Clinical AI",
  "Fine-tuned Domain Models",
  "FHIR R4",
  "React.js",
  "React Native",
  "Node.js",
  "PostgreSQL",
  "Redis",
  "WebRTC",
  "AWS",
  "WhatsApp Business API",
  "ABDM Integration",
];

const Product = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />

      <main>
        <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.12),_transparent_24%),linear-gradient(180deg,#f8fffe_0%,#ffffff_72%)]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <Reveal className="max-w-4xl">
              <Badge variant="outline" className="rounded-full border-teal-200 px-4 py-1 text-teal-700">
                Product Description
              </Badge>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Three Products. One Connected Ecosystem.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
                Zivika is not a collection of disconnected features. It is a coordinated product stack that reduces
                documentation burden for doctors, creates durable records for patients, and compounds clinical data into
                intelligence over time.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="rounded-full bg-teal-600 px-7 text-white hover:bg-teal-700">
                  <Link to="/contact">Request a demo</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full border-slate-300 px-7">
                  <Link to="/about">Why we are building this</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {products.map((product, index) => (
                <Reveal key={product.name} delayMs={index * 90}>
                  <Card className="h-full rounded-[2rem] border-slate-200 shadow-none">
                    <CardContent className="p-8">
                      <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${product.color} text-white`}>
                        <product.icon className="h-7 w-7" />
                      </div>
                      <h2 className={`mt-6 text-2xl font-semibold ${product.accent}`}>{product.name}</h2>
                      <p className="mt-5 text-sm leading-8 text-slate-600">{product.description}</p>

                      <div className={`mt-8 rounded-3xl ${product.bg} p-5`}>
                        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">
                          Why it matters
                        </div>
                        <div className="mt-4 space-y-3">
                          {product.highlights.map((highlight) => (
                            <div key={highlight} className="flex gap-3 text-sm leading-7 text-slate-700">
                              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-slate-500" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-slate-50/70">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <Reveal className="max-w-3xl">
              <Badge variant="outline" className="rounded-full border-slate-300 px-4 py-1 text-slate-700">
                How It Works
              </Badge>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                A simple flow that turns routine consultations into durable intelligence.
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-6 xl:grid-cols-5">
              {workflow.map((step, index) => (
                <Reveal key={step.title} delayMs={index * 70}>
                  <div className="relative h-full rounded-[2rem] border border-slate-200 bg-white p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                        {index + 1}
                      </div>
                      <step.icon className="h-6 w-6 text-teal-700" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-slate-950">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
                    {index < workflow.length - 1 && (
                      <div className="pointer-events-none absolute -right-4 top-10 hidden xl:block">
                        <ChevronRight className="h-8 w-8 text-slate-300" />
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:px-8">
            <Reveal>
              <Badge variant="outline" className="rounded-full border-slate-300 px-4 py-1 text-slate-700">
                Technology
              </Badge>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Modern clinical intelligence, grounded in interoperable health infrastructure.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                The platform is designed around real-time speech, multilingual understanding, structured clinical data,
                and healthcare-grade interoperability. That combination is what turns isolated workflows into a true
                operating system for care.
              </p>
            </Reveal>

            <Reveal delayMs={120} className="mt-10 lg:mt-0">
              <div className="flex flex-wrap gap-3">
                {technologies.map((technology) => (
                  <div
                    key={technology}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
                  >
                    {technology}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-slate-950 text-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <Reveal className="rounded-[2rem] border border-white/10 bg-white/5 p-8 sm:p-12">
              <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-teal-300">
                <LockKeyhole className="h-4 w-4" />
                Product philosophy
              </div>
              <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Every product should make care feel more continuous, not more fragmented.
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                That is why the scribe, locker, and copilot are designed to strengthen each other. The doctor does less
                admin, the patient receives better follow-through, and the health system gains better-quality data over
                time.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="rounded-full bg-teal-600 px-7 text-white hover:bg-teal-700">
                  <Link to="/contact">
                    Start a conversation
                    <Pill className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Product;
