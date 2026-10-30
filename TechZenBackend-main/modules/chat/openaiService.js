import OpenAI from "openai";
import { TECHZEN_INFO, TECHZEN_SYSTEM_INSTRUCTIONS } from "./techzenKnowledge.js";

/**
 * Lazy initializer for OpenAI client instance.
 * Ensures backend starts seamlessly even if OPENAI_API_KEY is not yet added in .env.
 */
let openaiClient = null;

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey.trim() === "" || apiKey === "your_openai_api_key_here") {
    return null;
  }
  if (!openaiClient || openaiClient.apiKey !== apiKey) {
    openaiClient = new OpenAI({ apiKey: apiKey.trim() });
  }
  return openaiClient;
}

/**
 * Intelligent local fallback knowledge responder.
 * Guarantees zero downtime and instant accurate answers regarding TechZen services,
 * training programs, contact info, and lead capture.
 */
function generateFallbackKnowledgeResponse(userQuery = "") {
  const q = userQuery.toLowerCase().trim();

  // 1. Contact / Phone / Email / Address / Location
  if (
    q.includes("contact") ||
    q.includes("phone") ||
    q.includes("email") ||
    q.includes("address") ||
    q.includes("location") ||
    q.includes("where are you") ||
    q.includes("office") ||
    q.includes("call")
  ) {
    return `### 📞 TechZen IT & HR Services Contact Details

Feel free to connect with our team directly:

- **Phone / WhatsApp**: [${TECHZEN_INFO.phone}](tel:+919303878713)
- **Email**: [${TECHZEN_INFO.email}](mailto:${TECHZEN_INFO.email})
- **Office Location**: ${TECHZEN_INFO.address}
- **Website**: [${TECHZEN_INFO.website}](${TECHZEN_INFO.website})
- **Working Hours**: ${TECHZEN_INFO.hours}

Would you like to request a quote or have our team call you back? Click **"Contact Our Team"** or leave your details below!`;
  }

  // 2. Training / Industrial / Internship / Courses / College
  if (
    q.includes("training") ||
    q.includes("internship") ||
    q.includes("industrial") ||
    q.includes("summer") ||
    q.includes("bca") ||
    q.includes("mca") ||
    q.includes("b.tech") ||
    q.includes("course") ||
    q.includes("syllabus") ||
    q.includes("learn")
  ) {
    return `### 🎓 Industry-Leading IT Training Programs at TechZen

TechZen is the premier technical training institute in Chhatarpur, MP offering practical, project-based IT academies:

1. **Industrial Training (3 to 6 Months)**: Enterprise MERN stack, real-world live projects, Git workflows, and university-recognized certification. Ideal for Engineering, BCA, MCA, and Diploma students.
2. **Software Development Training**: Full-stack engineering, REST APIs, database architecture, and production deployments.
3. **Summer Training & Internship (4 to 8 Weeks)**: Fast-paced hands-on training to build portfolio projects.
4. **Data Analytics Training (3 to 4 Months)**: Python, Pandas, NumPy, SQL, data visualization, and business intelligence.

✨ **Key Benefits**:
- Real client projects (no dummy theory)
- Live mentor guidance & code reviews
- Official University project submission report & certificate
- 100% placement and career mentorship support

Would you like to enroll or view batch timings? Leave your name and number, or call us at **${TECHZEN_INFO.phone}**!`;
  }

  // 3. Data Analytics specific
  if (q.includes("data analytics") || q.includes("python") || q.includes("sql") || q.includes("data science")) {
    return `### 📊 Data Analytics Training at TechZen

Master the in-demand world of data and business intelligence with our comprehensive curriculum:
- **Core Languages**: Python, SQL, Advanced Excel
- **Data Libraries**: Pandas, NumPy, Matplotlib, Seaborn
- **Business Intelligence**: Dashboards, KPI tracking, exploratory data analysis
- **Real-World Case Studies**: E-commerce sales, financial reporting, and customer insights

Eligible for graduates, college students, and professionals looking to transition into data analytics. Would you like our counselor to contact you with the complete syllabus?`;
  }

  // 4. Website / Web App Development / MERN
  if (
    q.includes("website") ||
    q.includes("web app") ||
    q.includes("web development") ||
    q.includes("mern") ||
    q.includes("react") ||
    q.includes("node")
  ) {
    return `### 🌐 Professional Website & Web App Development

TechZen engineers modern, high-performance web applications tailored to your business goals:
- **Custom Corporate Websites**: Fast, SEO-optimized, mobile-responsive, modern aesthetics.
- **Dynamic Web Apps**: Built with React, Next.js, Node.js, Express, and MongoDB/PostgreSQL.
- **E-Commerce & Portals**: Payment gateway integration, cart, order workflows, and admin dashboards.
- **Security & Scale**: JWT authentication, role-based access, and SSL encryption.

Tell us about your project vision or required features, and we can discuss architecture, timeline, and an estimate!`;
  }

  // 5. SaaS & ERP Solutions
  if (q.includes("erp") || q.includes("saas") || q.includes("crm") || q.includes("software")) {
    return `### ⚙️ SaaS & Custom ERP Software Solutions

Streamline business operations and scale your venture with TechZen's enterprise software:
- **Custom ERP Systems**: Inventory control, employee attendance, billing, vendor records, and custom reporting.
- **SaaS Platforms**: Multi-tenant architectures, subscription billing, automated onboarding, and analytics dashboards.
- **Workflow Automation**: Eliminate manual paperwork and accelerate internal business processes.

Would you like a live demo or a customized consultation for your business? Click **"Contact Our Team"** to get started!`;
  }

  // 6. Mobile Application Development
  if (q.includes("mobile") || q.includes("app") || q.includes("android") || q.includes("ios") || q.includes("flutter") || q.includes("react native")) {
    return `### 📱 Mobile Application Development

We develop fluid, intuitive mobile experiences for Android and iOS:
- **Cross-Platform Engineering**: Reach both Android and iPhone users with optimal speed and performance.
- **Features**: User authentication, push notifications, offline storage, API integration, and payment gateways.
- **UI/UX First**: Designed with sleek, intuitive interfaces for maximum user engagement.

Have an app idea? Let us know what you are looking to build!`;
  }

  // 7. General Services overview
  if (q.includes("services") || q.includes("what do you do") || q.includes("offer") || q.includes("work")) {
    return `### 🚀 TechZen IT & HR Services

We provide end-to-end technology solutions and professional training:

1. **Website & Web App Development** (React, Node.js, MERN, Next.js)
2. **Mobile Application Development** (Android & iOS)
3. **Custom ERP Software & Business Automation**
4. **SaaS Platforms & Cloud Solutions**
5. **UI/UX & Web Designing** (Figma prototypes, modern design systems)
6. **Industrial & Software Development Training** in Chhatarpur
7. **Data Analytics Training**
8. **HR Services & Talent Solutions**

Which service can we help you with today?`;
  }

  // 8. Pricing / Cost / Quote
  if (q.includes("price") || q.includes("cost") || q.includes("quote") || q.includes("fees") || q.includes("charge")) {
    return `### 💼 Transparent Project Estimates & Training Fees

At TechZen, our pricing is customized based on:
- Scope of work and feature set
- Technology stack and design requirements
- Timeline and delivery milestones

For accurate pricing and current training fee structures, our team will be glad to share an official proposal. Please provide your **Name**, **Email**, and **Phone Number**, or call our lead consultant directly at **${TECHZEN_INFO.phone}**!`;
  }

  // 9. Default greeting / assistance
  return `### 👋 Welcome to TechZen IT & HR Services!

I am **ZenAI**, your official assistant. I can help you with:
- Exploring our **Software, Web & Mobile App Development** services
- Learning about **Industrial Training & Data Analytics Training** in Chhatarpur
- Building custom **ERP & SaaS Solutions** for your business
- Submitting an inquiry for a free project consultation

How may I assist you today? Feel free to ask a question or select one of the quick options below!`;
}

/**
 * Main AI Chat generation function
 * Uses OpenAI Responses API (client.responses.create) with gpt-4o-mini,
 * with automatic fallback to Chat Completions or local TechZen Knowledge Base.
 */
export async function generateAiChatResponse({ messages = [], userQuery = "" }) {
  const client = getOpenAIClient();
  const modelName = process.env.OPENAI_MODEL || "gpt-4o-mini";

  // Sanitize user query
  const cleanQuery = (userQuery || "").trim().slice(0, 1500);

  // If no API client available, immediately use robust local knowledge base
  if (!client) {
    return {
      reply: generateFallbackKnowledgeResponse(cleanQuery),
      source: "knowledge-base",
      model: "techzen-knowledge-engine"
    };
  }

  // Prepare conversation context for OpenAI
  // Limit context to the last 10 messages to avoid token blowups
  const recentHistory = (Array.isArray(messages) ? messages : [])
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-8)
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, 1000)
    }));

  // Ensure current user message is included
  if (
    cleanQuery &&
    (!recentHistory.length || recentHistory[recentHistory.length - 1].content !== cleanQuery)
  ) {
    recentHistory.push({ role: "user", content: cleanQuery });
  }

  // 1. Try official OpenAI Responses API
  try {
    const inputContent = recentHistory.map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`).join("\n\n");

    const response = await client.responses.create({
      model: modelName,
      instructions: TECHZEN_SYSTEM_INSTRUCTIONS,
      input: inputContent || cleanQuery,
      temperature: 0.6,
      max_output_tokens: 800
    });

    const outputText =
      response.output_text ||
      response.output?.[0]?.content?.[0]?.text ||
      (Array.isArray(response.output) ? JSON.stringify(response.output) : null);

    if (outputText && typeof outputText === "string" && outputText.trim()) {
      return {
        reply: outputText.trim(),
        source: "openai-responses-api",
        model: modelName
      };
    }
  } catch (responsesErr) {
    console.warn("[TechZen AI] Responses API failed, trying Chat Completions fallback:", responsesErr.message);

    // 2. Fallback to standard Chat Completions API
    try {
      const chatMessages = [
        { role: "system", content: TECHZEN_SYSTEM_INSTRUCTIONS },
        ...recentHistory
      ];

      const completion = await client.chat.completions.create({
        model: modelName,
        messages: chatMessages,
        temperature: 0.6,
        max_tokens: 800
      });

      const reply = completion.choices?.[0]?.message?.content;
      if (reply && reply.trim()) {
        return {
          reply: reply.trim(),
          source: "openai-chat-completions",
          model: modelName
        };
      }
    } catch (chatErr) {
      console.error("[TechZen AI] Both OpenAI API endpoints failed:", chatErr.message);
    }
  }

  // 3. Graceful fallback if OpenAI request failed (e.g. invalid key or network issue)
  return {
    reply: generateFallbackKnowledgeResponse(cleanQuery),
    source: "knowledge-base-fallback",
    model: "techzen-knowledge-engine"
  };
}
