import { FormEvent, useState } from "react";
import { Linkedin, Mail, MapPin, Phone, Send, Sparkles } from "lucide-react";

import Reveal from "@/components/site/Reveal";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const audienceOptions = ["Doctor", "Investor", "Researcher", "Institution", "Other"];

const Contact = () => {
  const { toast } = useToast();
  const [interest, setInterest] = useState("");
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    toast({
      title: "Message drafted",
      description: "Thanks for reaching out. Your note is ready for the Zivika team to follow up.",
    });

    setFormValues({
      fullName: "",
      email: "",
      phone: "",
      message: "",
    });
    setInterest("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main>
        <section className="border-b border-border bg-gradient-to-br from-accent/30 via-background to-background">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <Reveal className="max-w-4xl">
              <Badge variant="outline" className="rounded-full border-primary/20 bg-background px-4 py-1 text-primary">
                Contact
              </Badge>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Let&apos;s Build This Together.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                Whether you are a doctor wanting to try Zivika, an investor who believes in this vision, a researcher
                who wants to collaborate, or an institution that wants to partner, we want to hear from you.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="border-b border-border bg-background">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <Reveal>
              <Card className="rounded-[2rem] border-border shadow-none">
                <CardContent className="p-8 sm:p-10">
                  <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">
                    <Sparkles className="h-4 w-4" />
                    Start the conversation
                  </div>
                  <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground" htmlFor="fullName">
                          Full Name
                        </label>
                        <Input
                          id="fullName"
                          value={formValues.fullName}
                          onChange={(event) => setFormValues((current) => ({ ...current, fullName: event.target.value }))}
                          placeholder="Your full name"
                          required
                          className="h-12 rounded-2xl border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground" htmlFor="email">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formValues.email}
                          onChange={(event) => setFormValues((current) => ({ ...current, email: event.target.value }))}
                          placeholder="you@example.com"
                          required
                          className="h-12 rounded-2xl border-border"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground" htmlFor="phone">
                          Phone (optional)
                        </label>
                        <Input
                          id="phone"
                          value={formValues.phone}
                          onChange={(event) => setFormValues((current) => ({ ...current, phone: event.target.value }))}
                          placeholder="+91"
                          className="h-12 rounded-2xl border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">I am a</label>
                        <Select value={interest} onValueChange={setInterest}>
                          <SelectTrigger className="h-12 rounded-2xl border-border">
                            <SelectValue placeholder="Choose one" />
                          </SelectTrigger>
                          <SelectContent>
                            {audienceOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground" htmlFor="message">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        value={formValues.message}
                        onChange={(event) => setFormValues((current) => ({ ...current, message: event.target.value }))}
                        placeholder="Tell us what you are looking to explore with Zivika."
                        required
                        className="min-h-[180px] rounded-3xl border-border p-4"
                      />
                    </div>

                    <Button type="submit" size="lg" className="rounded-full gradient-medical px-7 text-white hover:opacity-90">
                      Send Message
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Reveal>

            <div className="space-y-6">
              <Reveal delayMs={80}>
                <Card className="rounded-[2rem] border-border bg-accent/15 shadow-none">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3">
                      <img src="/zivika-logo.svg" alt="Zivika Labs logo" className="h-12 w-12" />
                      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Contact details</div>
                    </div>
                    <div className="mt-6 space-y-5">
                      <a href="mailto:vikas@zivikalabs.com" className="flex items-start gap-4 text-muted-foreground transition-colors hover:text-foreground">
                        <Mail className="mt-1 h-5 w-5 text-primary" />
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">Email</div>
                          <div className="mt-1 text-base font-medium text-foreground">vikas@zivikalabs.com</div>
                        </div>
                      </a>
                      <a href="https://zivikalabs.com" target="_blank" rel="noreferrer" className="flex items-start gap-4 text-muted-foreground transition-colors hover:text-foreground">
                        <Phone className="mt-1 h-5 w-5 text-primary" />
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">Website</div>
                          <div className="mt-1 text-base font-medium text-foreground">zivikalabs.com</div>
                        </div>
                      </a>
                      <div className="flex items-start gap-4 text-muted-foreground">
                        <MapPin className="mt-1 h-5 w-5 text-primary" />
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">Location</div>
                          <div className="mt-1 text-base font-medium text-foreground">Bangalore, Karnataka, India</div>
                        </div>
                      </div>
                    </div>

                    <Button asChild variant="outline" className="mt-8 rounded-full border-primary/20 text-primary hover:bg-primary/5 hover:text-primary">
                      <a href="https://www.linkedin.com/company/zivikalabs" target="_blank" rel="noreferrer">
                        LinkedIn
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </Reveal>

              <Reveal delayMs={140}>
                <Card className="rounded-[2rem] border-border gradient-medical text-white shadow-none">
                  <CardContent className="p-8">
                    <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/90">What to expect</div>
                    <p className="mt-4 text-sm leading-8 text-white/90">
                      We are especially interested in conversations with frontline doctors, hospital networks, digital
                      health partners, investors aligned with deep-tech healthcare, and researchers exploring clinical AI
                      in India.
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="bg-background">
          <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <Reveal>
              <p className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                &quot;India&apos;s healthcare problem is not going to be solved by better apps. It is going to be solved by
                building the right infrastructure and having the right people believe in it early enough to shape
                it.&quot;
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Contact;
