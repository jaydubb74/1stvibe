# Legal Pages

> Updated: 2026-03-01

## Overview

Two static legal pages — Privacy Policy and Terms of Service — accessible from the footer and the About page.

| Page | URL | File |
|------|-----|------|
| Privacy Policy | `/privacy` | `app/privacy/page.tsx` |
| Terms of Service | `/terms` | `app/terms/page.tsx` |

Both are fully static (`○`) — pre-rendered at build time.

## Privacy Policy (`/privacy`)

**Last updated:** February 26, 2026

### Sections covered

1. Who we are
2. What information we collect
3. How we use your information
4. Cookies and tracking
5. Referral and affiliate links
6. Third-party services
7. Data retention
8. Your rights (GDPR / CCPA/CPRA)
9. Children's privacy
10. Changes to this policy
11. Contact

### Key disclosures
- No advertising networks
- Email collected only via magic link auth (NextAuth + Resend)
- Analytics via Vercel (anonymized)
- Third-party services: OpenAI, Neon, Pixabay
- Contact: `hello@1stvibe.ai`

## Terms of Service (`/terms`)

**Last updated:** February 26, 2026

### Sections covered

1. Acceptance of terms
2. Eligibility
3. Magic link authentication
4. Educational disclaimer
5. User conduct
6. Intellectual property
7. Demo sites (generated content)
8. Third-party links and services
9. Disclaimers
10. Limitation of liability (cap: $50)
11. Indemnification
12. Changes to terms
13. Governing law (California)
14. Contact

### Key terms
- Liability cap: **$50**
- Governing law: **California**
- No warranty on AI-generated content
- Generated demo sites expire; users responsible for their prompts

## Footer Links

Both pages are linked from `components/Footer.tsx`:

```tsx
<Link href="/privacy">Privacy</Link>
<Link href="/terms">Terms</Link>
```

Also referenced from `app/about/page.tsx` with prose links.

## Related Docs

- [Auth and Email](./auth-and-email.md) — How user data is collected (magic links)
- [Architecture Overview](../architecture/overview.md) — Third-party services disclosed in privacy policy
