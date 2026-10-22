# TechZen Consulting — React

Premium consultancy agency website built with:

- React 18
- Vite
- Component-based architecture
- Vanilla CSS
- `lucide-react` icons
- No Tailwind
- No Bootstrap
- No backend bundled into the project

## Start

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Structure

```text
src/
├── components/
│   ├── About.jsx
│   ├── BackToTop.jsx
│   ├── CaseStudies.jsx
│   ├── Contact.jsx
│   ├── FAQ.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── Industries.jsx
│   ├── Navbar.jsx
│   ├── Process.jsx
│   ├── Reveal.jsx
│   ├── SectionHeading.jsx
│   ├── Services.jsx
│   ├── Stats.jsx
│   ├── Testimonials.jsx
│   ├── TrustLogos.jsx
│   └── WhyUs.jsx
├── data/
│   └── siteData.js
├── hooks/
│   ├── useCountUp.js
│   └── useReveal.js
├── styles/
│   └── global.css
├── App.jsx
└── main.jsx
```

## Customize

Most business content is centralized in:

`src/data/siteData.js`

Update:

- Company name
- Email
- Phone
- Location
- Services
- Industries
- Testimonials
- FAQs
- Case studies

Update design tokens at the top of:

`src/styles/global.css`

## Contact form

Create `.env` from `.env.example`:

```bash
VITE_CONTACT_ENDPOINT=https://api.yourdomain.com/contact
```

The React form sends JSON with:

```json
{
  "name": "...",
  "email": "...",
  "phone": "...",
  "company": "...",
  "service": "...",
  "budget": "...",
  "contactMethod": "...",
  "message": "...",
  "consent": true,
  "submittedAt": "..."
}
```

If no endpoint is configured, the form operates in demo mode and displays a success message without sending data anywhere.

For production, your API should perform independent validation, rate limiting, bot protection, sanitization, CORS configuration, and secure email/database handling.

Never put SMTP passwords, private API keys, database credentials, or other secrets in React frontend code.

## SEO

Replace the placeholder domain and business metadata in `index.html`.

Add a real:

- Canonical URL
- Open Graph image
- Business information
- Privacy Policy
- Terms
- Social profiles

## Deployment

Run `npm run build` and deploy the generated `dist/` directory to your static hosting provider.

If using a contact API, deploy that separately and configure `VITE_CONTACT_ENDPOINT`.

## Important

The case studies, testimonials, statistics, client logos, and performance figures included in this template are illustrative placeholders. Replace them with verified information before publishing.
