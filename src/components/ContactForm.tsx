"use client";

import { useState, useCallback, useRef, useEffect } from "react";

const API_URL = "https://blacksentinel-api.mathews-.workers.dev/contact";

const PRODUCTS = [
  { value: "", label: "Select a product..." },
  { value: "sentinel-siem", label: "Sentinel SIEM" },
  { value: "sentinel-soar", label: "Sentinel SOAR" },
  { value: "sentinel-xdr", label: "Sentinel XDR" },
  { value: "sentinel-edr", label: "Sentinel EDR" },
  { value: "sentinel-cti", label: "Sentinel CTI" },
  { value: "sentinel-vuln", label: "Sentinel VulnManager" },
  { value: "sentinel-cloud", label: "Sentinel CloudShield" },
  { value: "sentinel-automate", label: "Sentinel Automate" },
  { value: "custom", label: "Custom Solution" },
  { value: "other", label: "Other" },
];

const ROLES = [
  { value: "", label: "Select your role..." },
  { value: "ciso", label: "CISO / Security Director" },
  { value: "it-manager", label: "IT Manager" },
  { value: "security-analyst", label: "Security Analyst" },
  { value: "developer", label: "Developer / Engineer" },
  { value: "devops", label: "DevOps / SRE" },
  { value: "consultant", label: "Consultant" },
  { value: "student", label: "Student / Researcher" },
  { value: "other", label: "Other" },
];

function sanitize(input: string): string {
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim();
}

function validateEmail(email: string): boolean {
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email);
}

async function generateCSRFToken(): Promise<string> {
  const timestamp = Date.now();
  const data = `${timestamp}`;
  const encoder = new TextEncoder();
  const keyData = encoder.encode("blacksentinel-csrf");
  const dataBuffer = encoder.encode(data);

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, dataBuffer);
  const arr = new Uint8Array(sig);
  const hash = Array.from(arr)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${timestamp}:${hash}`;
}

interface FormData {
  fullName: string;
  email: string;
  company: string;
  product: string;
  phone: string;
  message: string;
  role: string;
  honeypot: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  company?: string;
  product?: string;
  phone?: string;
  message?: string;
  role?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    company: "",
    product: "",
    phone: "",
    message: "",
    role: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const startTimeRef = useRef<number>(0);
  const csrfTokenRef = useRef<string>("");

  useEffect(() => {
    startTimeRef.current = Date.now();
    generateCSRFToken().then((token) => {
      csrfTokenRef.current = token;
    });
  }, []);

  const validate = useCallback((): FormErrors => {
    const e: FormErrors = {};

    if (!formData.fullName || formData.fullName.length < 2) {
      e.fullName = "Name is required (min 2 characters)";
    } else if (formData.fullName.length > 100) {
      e.fullName = "Name is too long (max 100 characters)";
    }

    if (!formData.email) {
      e.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      e.email = "Invalid email format";
    } else if (formData.email.length > 254) {
      e.email = "Email is too long";
    }

    if (!formData.company) {
      e.company = "Company is required";
    } else if (formData.company.length > 200) {
      e.company = "Company name is too long";
    }

    if (!formData.product) {
      e.product = "Please select a product";
    }

    if (formData.phone && !/^[+]?[\d\s\-()]{7,20}$/.test(formData.phone)) {
      e.phone = "Invalid phone number";
    }

    if (!formData.message) {
      e.message = "Message is required";
    } else if (formData.message.length < 10) {
      e.message = "Message must be at least 10 characters";
    } else if (formData.message.length > 2000) {
      e.message = "Message is too long (max 2000 characters)";
    }

    if (!formData.role) {
      e.role = "Please select your role";
    }

    return e;
  }, [formData]);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: sanitize(value) }));
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setStatus("submitting");
      setErrorMsg("");

      try {
        const csrfToken = csrfTokenRef.current;
        if (!csrfToken) {
          setErrorMsg("Security token not ready. Please refresh.");
          setStatus("error");
          return;
        }

        const payload = {
          ...formData,
          csrfToken,
          timestamp: startTimeRef.current,
        };

        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Submission failed");
        }

        setStatus("success");
        setFormData({
          fullName: "",
          email: "",
          company: "",
          product: "",
          phone: "",
          message: "",
          role: "",
          honeypot: "",
        });
        startTimeRef.current = Date.now();
        generateCSRFToken().then((token) => {
          csrfTokenRef.current = token;
        });
      } catch (err) {
        setStatus("error");
        setErrorMsg(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      }
    },
    [formData, validate]
  );

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
          <svg
            className="h-8 w-8 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-bold text-text-primary">
          Inquiry Received
        </h3>
        <p className="text-text-secondary">
          Thank you for your interest. Our team will review your inquiry and
          contact you within 24-48 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-lg border border-primary/30 px-6 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot - hidden from humans, visible to bots */}
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          opacity: 0,
          height: 0,
          width: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
        tabIndex={-1}
        aria-hidden="true"
      >
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="mb-2 block text-sm font-medium text-text-primary"
          >
            Full Name <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            maxLength={100}
            autoComplete="name"
            className={`w-full rounded-lg border bg-transparent px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              errors.fullName
                ? "border-red-500/50"
                : "border-border-subtle hover:border-primary/30"
            }`}
            placeholder="John Doe"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-text-primary"
          >
            Email <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            maxLength={254}
            autoComplete="email"
            className={`w-full rounded-lg border bg-transparent px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              errors.email
                ? "border-red-500/50"
                : "border-border-subtle hover:border-primary/30"
            }`}
            placeholder="john@company.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email}</p>
          )}
        </div>

        {/* Company */}
        <div>
          <label
            htmlFor="company"
            className="mb-2 block text-sm font-medium text-text-primary"
          >
            Company <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            maxLength={200}
            autoComplete="organization"
            className={`w-full rounded-lg border bg-transparent px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              errors.company
                ? "border-red-500/50"
                : "border-border-subtle hover:border-primary/30"
            }`}
            placeholder="Acme Corp"
          />
          {errors.company && (
            <p className="mt-1 text-sm text-red-400">{errors.company}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-text-primary"
          >
            Phone{" "}
            <span className="text-text-secondary text-xs">(optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            maxLength={20}
            autoComplete="tel"
            className={`w-full rounded-lg border bg-transparent px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              errors.phone
                ? "border-red-500/50"
                : "border-border-subtle hover:border-primary/30"
            }`}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
          )}
        </div>

        {/* Product */}
        <div>
          <label
            htmlFor="product"
            className="mb-2 block text-sm font-medium text-text-primary"
          >
            Product of Interest <span className="text-primary">*</span>
          </label>
          <select
            id="product"
            name="product"
            value={formData.product}
            onChange={handleChange}
            required
            className={`w-full rounded-lg border bg-transparent px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              errors.product
                ? "border-red-500/50"
                : "border-border-subtle hover:border-primary/30"
            } ${!formData.product ? "text-text-secondary/50" : ""}`}
          >
            {PRODUCTS.map((p) => (
              <option key={p.value} value={p.value} className="bg-background">
                {p.label}
              </option>
            ))}
          </select>
          {errors.product && (
            <p className="mt-1 text-sm text-red-400">{errors.product}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label
            htmlFor="role"
            className="mb-2 block text-sm font-medium text-text-primary"
          >
            Role <span className="text-primary">*</span>
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className={`w-full rounded-lg border bg-transparent px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              errors.role
                ? "border-red-500/50"
                : "border-border-subtle hover:border-primary/30"
            } ${!formData.role ? "text-text-secondary/50" : ""}`}
          >
            {ROLES.map((r) => (
              <option key={r.value} value={r.value} className="bg-background">
                {r.label}
              </option>
            ))}
          </select>
          {errors.role && (
            <p className="mt-1 text-sm text-red-400">{errors.role}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          Message <span className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          maxLength={2000}
          className={`w-full resize-none rounded-lg border bg-transparent px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
            errors.message
              ? "border-red-500/50"
              : "border-border-subtle hover:border-primary/30"
          }`}
          placeholder="Tell us about your security needs and how we can help..."
        />
        <div className="mt-1 flex items-center justify-between">
          {errors.message ? (
            <p className="text-sm text-red-400">{errors.message}</p>
          ) : (
            <span />
          )}
          <span className="text-xs text-text-secondary">
            {formData.message.length}/2000
          </span>
        </div>
      </div>

      {/* Error message */}
      {status === "error" && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <p className="text-sm text-red-400">{errorMsg}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-background transition-all hover:bg-primary-dim hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
      >
        {status === "submitting" ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Submitting...
          </span>
        ) : (
          "Submit Inquiry"
        )}
      </button>

      <p className="text-center text-xs text-text-secondary">
        By submitting this form, you agree to our data handling practices.
        Your information will be used solely to respond to your inquiry.
      </p>
    </form>
  );
}
