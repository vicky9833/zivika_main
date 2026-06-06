import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, MoveUpRight, X } from "lucide-react";

import BrandLogo from "@/components/site/BrandLogo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/product", label: "Product" },
  { to: "/contact", label: "Contact" },
];

export const SiteHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div onClick={() => setIsOpen(false)}>
          <BrandLogo />
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground",
                  isActive && "bg-primary/10 text-primary"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="outline" className="rounded-full border-primary/25 text-primary hover:bg-primary/5 hover:text-primary">
            <a href="https://care.zivikalabs.com/" target="_blank" rel="noreferrer">
              Patient App
              <MoveUpRight className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild className="rounded-full gradient-medical text-white hover:opacity-90">
            <Link to="/contact">Talk to Zivika</Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-border bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground",
                    isActive && "bg-primary/10 text-primary"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Button asChild variant="outline" className="mt-2 rounded-2xl border-primary/25 text-primary hover:bg-primary/5 hover:text-primary">
              <a href="https://care.zivikalabs.com/" target="_blank" rel="noreferrer">
                Patient App
                <MoveUpRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild className="rounded-2xl gradient-medical text-white hover:opacity-90">
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                Talk to Zivika
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export const SiteFooter = () => {
  return (
    <footer className="border-t border-border bg-white text-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_0.8fr_0.8fr] lg:px-8">
        <div className="space-y-4">
          <BrandLogo compact />
          <h3 className="max-w-xl text-2xl font-semibold leading-tight text-foreground">
            Building clinical infrastructure that feels trustworthy, human, and ready for India at scale.
          </h3>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            From AI clinical documentation to lifelong health records and patient copilots, Zivika connects doctors,
            patients, and national health rails through real clinical data.
          </p>
        </div>

        <div className="space-y-4">
          <div className="text-sm font-semibold text-foreground">Explore</div>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="transition-colors hover:text-primary">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-sm font-semibold text-foreground">Contact</div>
          <div className="space-y-3 text-sm text-muted-foreground">
            <a href="mailto:vikas@zivikalabs.com" className="block transition-colors hover:text-primary">
              vikas@zivikalabs.com
            </a>
            <a href="https://zivikalabs.com" target="_blank" rel="noreferrer" className="block transition-colors hover:text-primary">
              zivikalabs.com
            </a>
            <div>Bangalore, Karnataka, India</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
