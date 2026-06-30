export interface Env {
  DB: D1Database;
  RATE_LIMIT_KV: KVNamespace;
  CSRF_SECRET: string;
  ALLOWED_ORIGINS: string;
}

interface ContactFormData {
  fullName: string;
  email: string;
  company: string;
  product: string;
  phone: string;
  message: string;
  role: string;
  honeypot: string;
  csrfToken: string;
  timestamp: number;
}

const ALLOWED_PRODUCTS = [
  "nexus",
  "sentinel",
  "strike",
  "pulse",
  "guardian",
  "vault",
  "vision",
  "forge",
  "command",
  "ai",
  "custom",
  "other",
];

const ALLOWED_ROLES = [
  "ciso",
  "it-manager",
  "security-analyst",
  "developer",
  "devops",
  "consultant",
  "student",
  "other",
];

function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .replace(/data:/gi, "")
    .replace(/vbscript:/gi, "")
    .trim()
    .slice(0, 500);
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
}

function generateCSRFToken(secret: string, timestamp: number): string {
  const data = `${secret}:${timestamp}`;
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const dataBuffer = encoder.encode(data);

  return crypto.subtle
    .importKey("raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, [
      "sign",
    ])
    .then((key) => crypto.subtle.sign("HMAC", key, dataBuffer))
    .then((sig) => {
      const arr = new Uint8Array(sig);
      return Array.from(arr)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    });
}

async function verifyCSRFToken(
  token: string,
  secret: string
): Promise<boolean> {
  try {
    const parts = token.split(":");
    if (parts.length !== 2) return false;

    const timestamp = parseInt(parts[0], 10);
    const providedToken = parts[1];

    if (Date.now() - timestamp > 3600000) return false;

    const expectedToken = await generateCSRFToken(secret, timestamp);
    return providedToken === expectedToken;
  } catch {
    return false;
  }
}

async function checkRateLimit(
  kv: KVNamespace,
  ip: string
): Promise<{ allowed: boolean; remaining: number }> {
  const key = `rate:${ip}`;
  const now = Date.now();
  const windowMs = 60000;
  const maxRequests = 5;

  const data = await kv.get(key);
  if (!data) {
    await kv.put(key, JSON.stringify({ count: 1, resetAt: now + windowMs }), {
      expirationTtl: 120,
    });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  const { count, resetAt } = JSON.parse(data);
  if (now > resetAt) {
    await kv.put(key, JSON.stringify({ count: 1, resetAt: now + windowMs }), {
      expirationTtl: 120,
    });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  await kv.put(
    key,
    JSON.stringify({ count: count + 1, resetAt }),
    { expirationTtl: 120 }
  );
  return { allowed: true, remaining: maxRequests - count - 1 };
}

function jsonResponse(
  data: Record<string, unknown>,
  status: number,
  headers: Record<string, string> = {}
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      ...headers,
    },
  });
}

const worker: { fetch: (request: Request, env: Env) => Promise<Response> } = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") || "";
    const allowedOrigins = env.ALLOWED_ORIGINS?.split(",") || [
      "https://blacksentinel.tech",
      "https://website-73m.pages.dev",
    ];

    if (!allowedOrigins.includes(origin)) {
      return jsonResponse({ error: "Origin not allowed" }, 403);
    }

    const corsHeaders = {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-CSRF-Token",
      "Access-Control-Max-Age": "86400",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405, corsHeaders);
    }

    const ip =
      request.headers.get("CF-Connecting-IP") ||
      request.headers.get("X-Forwarded-For") ||
      "unknown";

    const rateLimit = await checkRateLimit(env.RATE_LIMIT_KV, ip);
    if (!rateLimit.allowed) {
      return jsonResponse(
        { error: "Too many requests. Please try again later." },
        429,
        { ...corsHeaders, "Retry-After": "60" }
      );
    }

    let body: ContactFormData;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON" }, 400, corsHeaders);
    }

    if (body.honeypot && body.honeypot.length > 0) {
      return jsonResponse({ success: true }, 200, corsHeaders);
    }

    if (!body.timestamp || Date.now() - body.timestamp > 300000) {
      return jsonResponse(
        { error: "Form expired. Please refresh and try again." },
        400,
        corsHeaders
      );
    }

    if (!body.csrfToken || !(await verifyCSRFToken(body.csrfToken, env.CSRF_SECRET))) {
      return jsonResponse({ error: "Invalid security token" }, 403, corsHeaders);
    }

    const errors: string[] = [];

    if (!body.fullName || body.fullName.length < 2 || body.fullName.length > 100) {
      errors.push("Name must be 2-100 characters");
    }

    if (!body.email || !validateEmail(body.email)) {
      errors.push("Valid email is required");
    }

    if (!body.company || body.company.length < 1 || body.company.length > 200) {
      errors.push("Company name is required");
    }

    if (!body.product || !ALLOWED_PRODUCTS.includes(body.product)) {
      errors.push("Invalid product selection");
    }

    if (body.phone && !/^[+]?[\d\s\-()]{7,20}$/.test(body.phone)) {
      errors.push("Invalid phone number format");
    }

    if (!body.message || body.message.length < 10 || body.message.length > 2000) {
      errors.push("Message must be 10-2000 characters");
    }

    if (!body.role || !ALLOWED_ROLES.includes(body.role)) {
      errors.push("Invalid role selection");
    }

    if (errors.length > 0) {
      return jsonResponse({ error: "Validation failed", errors }, 400, corsHeaders);
    }

    try {
      await env.DB.prepare(
        `INSERT INTO contact_submissions (
          full_name, email, company, product, phone, message, role, ip_address, user_agent, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`
      )
        .bind(
          sanitizeInput(body.fullName),
          sanitizeInput(body.email).toLowerCase(),
          sanitizeInput(body.company),
          body.product,
          body.phone ? sanitizeInput(body.phone) : null,
          sanitizeInput(body.message),
          body.role,
          ip,
          (request.headers.get("User-Agent") || "").slice(0, 200)
        )
        .run();

      return jsonResponse(
        {
          success: true,
          message: "Your inquiry has been received. We will contact you shortly.",
        },
        200,
        corsHeaders
      );
    } catch (error) {
      console.error("Database error:", error);
      return jsonResponse(
        { error: "Internal server error" },
        500,
        corsHeaders
      );
    }
  },
};

export default worker;
