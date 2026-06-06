import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, MoveUpRight, X } from "lucide-react";

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
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
            ZL
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">
              Zivika Labs
            </div>
            <div className="text-xs text-slate-500">India's Intelligent Health OS</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900",
                  isActive && "bg-slate-100 text-slate-950"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="outline" className="rounded-full border-slate-300">
            <a href="https://care.zivikalabs.com/" target="_blank" rel="noreferrer">
              Patient App
              <MoveUpRight className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild className="rounded-full bg-teal-600 text-white hover:bg-teal-700">
            <Link to="/contact">Talk to Zivika</Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900",
                    isActive && "bg-slate-100 text-slate-950"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Button asChild variant="outline" className="mt-2 rounded-2xl border-slate-300">
              <a href="https://care.zivikalabs.com/" target="_blank" rel="noreferrer">
                Patient App
                <MoveUpRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild className="rounded-2xl bg-teal-600 text-white hover:bg-teal-700">
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
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_0.8fr_0.8fr] lg:px-8">
        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-300">
            Zivika Labs
          </div>
          <h3 className="max-w-xl text-2xl font-semibold leading-tight text-white">
            Building clinical infrastructure that feels trustworthy, human, and ready for India at scale.
          </h3>
          <p className="max-w-2xl text-sm leading-7 text-slate-400">
            From AI clinical documentation to lifelong health records and patient copilots, Zivika connects doctors,
            patients, and national health rails through real clinical data.
          </p>
        </div>

        <div className="space-y-4">
          <div className="text-sm font-semibold text-white">Explore</div>
          <div className="flex flex-col gap-3 text-sm text-slate-400">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="transition-colors hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-sm font-semibold text-white">Contact</div>
          <div className="space-y-3 text-sm text-slate-400">
            <a href="mailto:vikas@zivikalabs.com" className="block transition-colors hover:text-white">
              vikas@zivikalabs.com
            </a>
            <a href="https://zivikalabs.com" target="_blank" rel="noreferrer" className="block transition-colors hover:text-white">
              zivikalabs.com
            </a>
            <div>Bangalore, Karnataka, India</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
