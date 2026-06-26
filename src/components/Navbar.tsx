"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/research", label: "Research" },
  { href: "/projects", label: "Projects" },
  { href: "/open-source", label: "Open Source" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="BlackSentinel Home">
            <Image
              src="/logo.png"
              alt="BlackSentinel"
              width={40}
              height={40}
              className="h-8 w-8 object-contain"
              priority
            />
            <span className="text-lg font-bold tracking-tight">
              <span className="text-white">BLACK</span>
              <span className="text-primary">SENTINEL</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://github.com/BlackSentinel-Cibersecurity"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors"
              aria-label="GitHub"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <Link
              href="/contact"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-primary-dim"
            >
              Get in Touch
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-border-subtle bg-background/95 backdrop-blur-xl animate-fade-in">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border-subtle">
              <a
                href="https://github.com/BlackSentinel-Cibersecurity"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-md px-3 py-2 text-base font-medium text-text-secondary hover:text-text-primary"
              >
                GitHub
              </a>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block rounded-md bg-primary px-3 py-2 text-center text-base font-medium text-background"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
