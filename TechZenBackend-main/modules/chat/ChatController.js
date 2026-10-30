import { generateAiChatResponse } from "./openaiService.js";
import { checkRateLimit } from "./rateLimiter.js";
import InquiryModel from "../Inquiry/Models/InquiryModel.js";
import { TECHZEN_INFO } from "./techzenKnowledge.js";

/**
 * Handle incoming chat messages
 */
export async function handleChatMessage(req, res) {
  try {
    // 1. Check rate limits
    const rateCheck = checkRateLimit(req);
    if (!rateCheck.allowed) {
      return res.status(429).json({
        success: false,
        message: `Too many requests. Please wait ${rateCheck.retryAfter} seconds before asking again.`,
        error: "RATE_LIMIT_EXCEEDED"
      });
    }

    // 2. Validate input
    const { message, messages } = req.body || {};
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message text is required and cannot be empty.",
        error: "EMPTY_MESSAGE"
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Message is too long. Please keep under 2000 characters.",
        error: "MESSAGE_TOO_LONG"
      });
    }

    // 3. Process AI Response
    const result = await generateAiChatResponse({
      messages: Array.isArray(messages) ? messages : [],
      userQuery: message.trim()
    });

    return res.status(200).json({
      success: true,
      message: "AI response generated successfully",
      data: {
        reply: result.reply,
        source: result.source,
        model: result.model,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error("[ChatController] handleChatMessage error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to process chat message. Please try again.",
      error: error.message
    });
  }
}

/**
 * Handle lead collection from chatbot and store directly into existing InquiryModel (MongoDB)
 */
export async function handleLeadSubmission(req, res) {
  try {
    // 1. Check rate limits
    const rateCheck = checkRateLimit(req);
    if (!rateCheck.allowed) {
      return res.status(429).json({
        success: false,
        message: `Too many requests. Please wait ${rateCheck.retryAfter} seconds.`,
        error: "RATE_LIMIT_EXCEEDED"
      });
    }

    const { name, email, phone, service, message, company, contactMethod } = req.body || {};

    // 2. Validate Name
    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Full Name is required.",
        error: "NAME_REQUIRED"
      });
    }

    // 3. Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "A valid email address is required.",
        error: "INVALID_EMAIL"
      });
    }

    // 4. Validate Phone (extract digits, require exactly 10 digits as per InquiryModel schema)
    const digitsOnly = (phone ? String(phone) : "").replace(/\D/g, "");
    let cleanPhone = digitsOnly;
    if (digitsOnly.length === 12 && digitsOnly.startsWith("91")) {
      cleanPhone = digitsOnly.slice(2);
    }
    if (cleanPhone.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Mobile number must be a valid 10-digit number.",
        error: "INVALID_PHONE"
      });
    }

    // 5. Service & Message sanitization
    const cleanService = (service && typeof service === "string" && service.trim())
      ? service.trim()
      : "General Enquiry";

    let rawMsg = (message && typeof message === "string") ? message.trim() : "";
    if (!rawMsg) {
      rawMsg = `Enquiry for ${cleanService} via website AI chatbot.`;
    }
    // Ensure minlength 20 chars as enforced by InquiryModel schema
    if (rawMsg.length < 20) {
      rawMsg = `Enquiry via TechZen AI Chatbot: ${rawMsg} (interested in ${cleanService}).`;
    }

    // 6. Save directly into existing MongoDB InquiryModel
    const newInquiry = await InquiryModel.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: cleanPhone,
      company: (company && typeof company === "string" && company.trim()) ? company.trim() : "private",
      service: cleanService,
      contactMethod: (contactMethod && ["Email", "Phone", "WhatsApp", "Video call"].includes(contactMethod))
        ? contactMethod
        : "Email",
      message: rawMsg,
      status: "pending"
    });

    return res.status(201).json({
      success: true,
      message: "Your enquiry has been received successfully! Our TechZen team will connect with you shortly.",
      data: {
        id: newInquiry._id,
        name: newInquiry.name,
        service: newInquiry.service,
        status: newInquiry.status
      }
    });
  } catch (error) {
    console.error("[ChatController] handleLeadSubmission error:", error);
    return res.status(500).json({
      success: false,
      message: "Could not save your enquiry. Please reach out directly at techzen432@gmail.com.",
      error: error.message
    });
  }
}

/**
 * Health & Config check for Chatbot API
 */
export async function getChatStatus(req, res) {
  const hasKey = Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim());
  return res.status(200).json({
    success: true,
    data: {
      status: "online",
      aiProvider: hasKey ? "openai-responses-api" : "local-knowledge-engine",
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      company: TECHZEN_INFO.companyName,
      contact: {
        phone: TECHZEN_INFO.phone,
        email: TECHZEN_INFO.email,
        address: TECHZEN_INFO.address
      }
    }
  });
}
