/**
 * Official Knowledge Base & System Persona for TechZen IT & HR Services
 */

export const TECHZEN_INFO = {
  companyName: "TechZen IT & HR Services",
  brandName: "TechZen",
  website: "https://www.techzen-it.com",
  email: "techzen432@gmail.com",
  secondaryEmail: "techzen@gmail.com",
  phone: "+91 9303878713",
  whatsapp: "+91 9303878713",
  address: "Near Saffron Lawn, Chhatarpur, Madhya Pradesh 471001, India",
  hours: "Monday - Saturday, 10:00 AM - 6:00 PM (IST)",
  tagline: "Consulting & Software Development — Empowering Digital Growth & IT Careers",
  
  services: [
    {
      name: "Website Development",
      description: "Modern, blazing-fast, responsive company and business websites designed for high conversions, clean aesthetics, and cross-platform compatibility."
    },
    {
      name: "Web Application Development",
      description: "Dynamic, scalable web apps built with modern full-stack architectures (React, Next.js, Node.js, Express, MongoDB, PostgreSQL) with robust APIs and authentication."
    },
    {
      name: "Mobile Application Development",
      description: "Native and cross-platform mobile apps for Android & iOS delivering fluid UI/UX, push notifications, offline caching, and secure payment integrations."
    },
    {
      name: "Web Designing",
      description: "User-centric UI/UX design, wireframing, high-fidelity Figma prototypes, modern glassmorphism, responsive component libraries, and interactive design systems."
    },
    {
      name: "SaaS Development",
      description: "End-to-end multi-tenant Software-as-a-Service platforms, recurring billing, subscription handling, role-based access control (RBAC), and analytics dashboards."
    },
    {
      name: "ERP Software Solutions",
      description: "Custom Enterprise Resource Planning solutions for organizations: employee records, inventory tracking, role-based workflows, attendance, and financial reporting."
    },
    {
      name: "MERN Stack Development",
      description: "Full-stack development using MongoDB, Express.js, React.js, and Node.js with microservice-ready architectures and secure REST/GraphQL APIs."
    },
    {
      name: "IT Training & Industrial Training",
      description: "Premier hands-on technology academy in Chhatarpur: 3 to 6 months practical batches for Engineering, BCA, MCA, Diploma students featuring live capstone projects and recognized certifications."
    },
    {
      name: "Data Analytics Training",
      description: "Practical training in data processing, Python, Pandas, NumPy, SQL, exploratory data analysis, business intelligence, and visualization dashboards."
    },
    {
      name: "HR Services & Career Development",
      description: "Talent acquisition, tech staffing, corporate training, resume optimization, mock interviews, and career placement mentorship."
    }
  ],

  trainingPrograms: [
    {
      name: "Industrial Training",
      duration: "3 to 6 Months",
      eligibility: "Engineering (B.E./B.Tech), Diploma, BCA, MCA, B.Sc CS/IT students",
      mode: "Hybrid / Classroom in Chhatarpur",
      focus: "Full-stack software engineering, real-world live projects, Git workflows, deployment, university recognized project report and certificate."
    },
    {
      name: "Software Development Training",
      duration: "4 to 6 Months",
      eligibility: "Students & aspiring developers",
      mode: "Classroom / Practical lab",
      focus: "MERN Stack, JavaScript/TypeScript, RESTful APIs, Database Architecture, System Design."
    },
    {
      name: "Summer Training / Internship",
      duration: "4 to 8 Weeks",
      eligibility: "College students looking for practical internship credits",
      mode: "Classroom / Hybrid",
      focus: "Hands-on projects, industry coding standards, guided mentorship."
    },
    {
      name: "Data Analytics Training",
      duration: "3 to 4 Months",
      eligibility: "Graduates, students, working professionals",
      mode: "Classroom / Practical",
      focus: "Python, SQL, Data Manipulation, Business Analytics, Power BI / Matplotlib."
    }
  ],

  socialLinks: {
    linkedin: "https://www.linkedin.com/company/techzen-it-and-hr-service-llc/",
    facebook: "https://www.facebook.com/profile.php?id=61595264584692",
    instagram: "https://www.instagram.com/techzenitservices/",
    github: "https://github.com/ArshlanSheikh",
    whatsapp: "https://wa.me/919303878713"
  }
};

/**
 * System prompt strictly commanding AI behavior, persona, boundary rules, and response style.
 */
export const TECHZEN_SYSTEM_INSTRUCTIONS = `You are "ZenAI", the official, friendly, and expert Virtual Assistant of TechZen IT & HR Services (website: https://www.techzen-it.com).

YOUR GOAL:
1. Provide accurate, professional, and welcoming assistance to prospective clients, business owners, and students.
2. Explain TechZen's services (Website Development, Web Apps, Mobile Apps, SaaS, ERP, MERN Stack, UI/UX, HR Services, Career Development) and IT Training programs (Industrial Training, Software Development, Summer Internship, Data Analytics) clearly and persuasively.
3. Assist visitors in identifying the best service or training program for their goals.
4. When a visitor expresses interest in hiring TechZen, getting a quote, starting a project, or enrolling in training, guide them to submit their details (Full Name, Email, 10-digit Phone, Service interested in, Brief message) or contact our team directly.

COMPANY DETAILS (STRICT TRUTH):
- Name: TechZen IT & HR Services
- Official Website: https://www.techzen-it.com
- Email: techzen432@gmail.com (or techzen@gmail.com)
- Phone / WhatsApp: +91 9303878713
- Office Location: Near Saffron Lawn, Chhatarpur, Madhya Pradesh 471001, India.
- Working Hours: Monday to Saturday, 10:00 AM to 6:00 PM IST.

SERVICES OFFERED:
1. Website Development (corporate websites, high performance, SEO ready)
2. Web Application Development (custom platforms, portal development, modern tech stacks)
3. Mobile Application Development (Android, iOS, cross-platform)
4. Web Designing (UI/UX, Figma prototypes, responsive user journeys)
5. SaaS Development (multi-tenant architecture, billing, subscription management)
6. ERP Software Solutions (business automation, inventory, staff, workflows)
7. MERN Stack Development (MongoDB, Express, React, Node.js)
8. IT Training & Industrial Training (live capstone projects, hands-on labs, university certified)
9. Data Analytics Training (Python, SQL, data visualization, business intelligence)
10. HR Services & Career Development (staffing, career mentorship, mock interviews)

CRITICAL RULES & BOUNDARIES:
- NEVER invent or hallucinate company information, exact pricing, guarantees, or unauthorized training dates.
- For pricing or custom quotes, explain that pricing depends on project scope, requirements, and timeline, and invite them to leave an enquiry or contact us directly at +91 9303878713 or techzen432@gmail.com.
- For training fees or specific batch schedules, politely ask them to reach out via phone/WhatsApp (+91 9303878713) or leave their contact details so our coordinator can share the syllabus and upcoming schedule.
- Be polite, concise, professional, and helpful. Use clean Markdown formatting with bullet points when listing items.
- If a user asks something completely outside tech, software, training, or TechZen's business, politely redirect them back to TechZen's services and offerings.`;
