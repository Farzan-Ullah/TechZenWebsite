import { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  X,
  Send,
  Trash2,
  Sparkles,
  Bot,
  FileText,
  AlertCircle,
  RefreshCw,
  PhoneCall
} from "lucide-react";
import ChatMessage from "./ChatMessage";
import LeadFormModal from "./LeadFormModal";
import api from "../../Api/Axios";
import styles from "./Chatbot.module.css";

const QUICK_SUGGESTIONS = [
  "Our Services",
  "Website Development",
  "SaaS & ERP Solutions",
  "IT Training Programs",
  "Data Analytics Training",
  "Contact Our Team"
];

const INITIAL_WELCOME_MESSAGE = {
  id: "welcome-1",
  role: "assistant",
  content: `👋 **Welcome to TechZen IT & HR Services!**

I am **ZenAI**, your official virtual assistant. How can I help you today?

You can ask me about:
- **Software & Web Development** (MERN Stack, Next.js, Cloud, Mobile Apps)
- **Enterprise Solutions** (Custom ERP systems, SaaS platforms)
- **IT & Industrial Training** in Chhatarpur (Live projects, 3–6 months, university certificates)
- **Data Analytics Training** (Python, SQL, Business Intelligence)
- **Project Quotes & Enquiries**

Select a quick topic below or type your message to get started!`,
  timestamp: formatTime(new Date()),
  source: "techzen-welcome"
};

function formatTime(date) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    }).format(date);
  } catch {
    return "";
  }
}

const STORAGE_KEY = "techzen_chatbot_messages_v1";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return [INITIAL_WELCOME_MESSAGE];
  });

  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [errorBanner, setErrorBanner] = useState("");
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadService, setLeadService] = useState("");
  const [showTooltip, setShowTooltip] = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatBodyRef = useRef(null);
  const chatWindowRef = useRef(null);
  const triggerBtnRef = useRef(null);

  // Close when user clicks or taps outside the chat window on mobile/desktop
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e) => {
      if (
        chatWindowRef.current &&
        !chatWindowRef.current.contains(e.target) &&
        !triggerBtnRef.current?.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isOpen]);

  // Auto-scroll to bottom of messages inside the chat container
  const scrollToBottom = (behavior = "smooth") => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior
      });
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior, block: "nearest" });
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom("auto");
      const focusTimer = setTimeout(() => {
        inputRef.current?.focus();
      }, 250);
      return () => clearTimeout(focusTimer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom("smooth");
    }
  }, [messages, isTyping]);

  // Save to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // Hide tooltip after 8 seconds
  useEffect(() => {
    const t = setTimeout(() => setShowTooltip(false), 8000);
    return () => clearTimeout(t);
  }, []);

  // Listen for Escape key to close chat
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && !showLeadModal) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, showLeadModal]);

  const handleSend = async (customText = null) => {
    const textToSend = typeof customText === "string" ? customText.trim() : inputMessage.trim();
    if (!textToSend || isTyping) return;

    setErrorBanner("");

    // Detect if user is asking for contact/quote directly
    const lower = textToSend.toLowerCase();
    if (
      lower === "contact our team" ||
      lower.includes("enquire") ||
      lower.includes("get a quote") ||
      lower.includes("request quote")
    ) {
      setLeadService("General Enquiry");
    }

    const userMsg = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: formatTime(new Date())
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputMessage("");
    setIsTyping(true);

    try {
      // Send conversation history for context (up to last 6 messages)
      const contextMessages = newMessages
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await api.post("/v1/chat/message", {
        message: textToSend,
        messages: contextMessages
      });

      if (response.data && response.data.success && response.data.data) {
        const aiData = response.data.data;
        const botMsg = {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content: aiData.reply,
          timestamp: formatTime(new Date()),
          source: aiData.source
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error(response.data?.message || "Invalid server response");
      }
    } catch (err) {
      console.error("[TechZen AI] Chat error:", err);
      const errorMsg =
        err.response?.data?.message ||
        "I experienced a temporary network issue. Please ask again or contact our team directly.";
      setErrorBanner(errorMsg);

      const fallbackMsg = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: `⚠️ ${errorMsg}

You can also reach our team directly at:
- **Phone / WhatsApp**: [+91 9303878713](tel:+919303878713)
- **Email**: [techzen432@gmail.com](mailto:techzen432@gmail.com)`,
        timestamp: formatTime(new Date()),
        source: "error-fallback"
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear your chat history?")) {
      const reset = [INITIAL_WELCOME_MESSAGE];
      setMessages(reset);
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(reset));
      } catch {
        // ignore
      }
      setErrorBanner("");
    }
  };

  const handleOpenLeadModal = (serviceName = "") => {
    setLeadService(serviceName || "General Enquiry");
    setShowLeadModal(true);
  };

  const handleLeadSuccess = ({ name, service, phone }) => {
    setShowLeadModal(false);
    const confirmMsg = {
      id: `lead-confirm-${Date.now()}`,
      role: "system",
      content: `✅ **Enquiry Submitted Successfully!**
Thank you **${name}**, our team has received your enquiry for **${service}**. We will call/WhatsApp you at **+91 ${phone}** shortly!`,
      timestamp: formatTime(new Date())
    };
    setMessages((prev) => [...prev, confirmMsg]);
  };

  return (
    <div className={styles.chatbotRoot}>
      {/* 1. Floating Trigger Button */}
      {!isOpen && (
        <div className={styles.triggerWrapper}>
          {showTooltip && (
            <div className={styles.tooltipCard}>
              <div className={styles.tooltipContent}>
                <span className={styles.tooltipBadge}>ZenAI</span>
                <p>Need help with projects or IT training? Chat with us!</p>
              </div>
              <button
                type="button"
                className={styles.closeTooltip}
                onClick={() => setShowTooltip(false)}
                aria-label="Close tooltip"
              >
                <X size={12} />
              </button>
            </div>
          )}

          <button
            ref={triggerBtnRef}
            type="button"
            className={styles.floatingTriggerBtn}
            onClick={() => {
              setIsOpen(true);
              setShowTooltip(false);
            }}
            aria-label="Open TechZen AI Chatbot"
            title="Chat with TechZen AI"
          >
            <div className={styles.pulseAura} />
            <div className={styles.triggerIconContainer}>
              <Bot size={24} className={styles.botIconMain} />
              <Sparkles size={13} className={styles.sparkleIcon} />
            </div>
            <span className={styles.onlineBadge} />
          </button>
        </div>
      )}

      {/* 2. Glassmorphic Chat Window */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className={`${styles.chatWindow} lenis-prevent`}
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={styles.chatHeader}>
            <div
              className={styles.mobileGrabBar}
              onClick={() => setIsOpen(false)}
              title="Minimize chat"
              role="button"
              tabIndex={0}
              aria-label="Minimize chat"
            />
            <div className={styles.headerContent}>
              <div className={styles.headerLeft}>
                <div className={styles.headerAvatarContainer}>
                  <Bot size={20} className={styles.headerBotIcon} />
                  <span className={styles.liveStatusDot} />
                </div>
                <div className={styles.headerTitleBlock}>
                  <div className={styles.headerTitleRow}>
                    <h3 className={styles.headerTitle}>ZenAI Assistant</h3>
                    <span className={styles.aiBadge}>AI</span>
                  </div>
                  <p className={styles.headerSubtitle}>TechZen IT & HR Services • Online</p>
                </div>
              </div>

              <div className={styles.headerActions}>
                <button
                  type="button"
                  className={styles.headerActionBtn}
                  onClick={() => handleOpenLeadModal()}
                  title="Enquire / Request Quote"
                  aria-label="Enquire / Request Quote"
                >
                  <FileText size={16} />
                </button>

                <button
                  type="button"
                  className={styles.headerActionBtn}
                  onClick={handleClearChat}
                  title="Clear conversation"
                  aria-label="Clear conversation"
                >
                  <Trash2 size={16} />
                </button>

                <button
                  type="button"
                  className={styles.closeChatBtn}
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  aria-label="Close chat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Body */}
          <div
            ref={chatBodyRef}
            className={`${styles.chatBody} lenis-prevent`}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                onActionClick={(action) => {
                  if (action.type === "lead") {
                    handleOpenLeadModal(action.service);
                  } else if (action.text) {
                    handleSend(action.text);
                  }
                }}
              />
            ))}

            {isTyping && (
              <div className={styles.typingIndicatorRow}>
                <div className={styles.botAvatar}>
                  <Bot size={16} />
                </div>
                <div className={styles.typingIndicatorBubble}>
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Strip */}
          <div
            className={`${styles.quickSuggestionsContainer} lenis-prevent`}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            onWheel={(e) => e.stopPropagation()}
          >
            <div className={styles.quickSuggestionsTrack}>
              {QUICK_SUGGESTIONS.map((suggestion, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={styles.suggestionChip}
                  onClick={() => handleSend(suggestion)}
                  disabled={isTyping}
                >
                  {suggestion}
                </button>
              ))}
              <button
                type="button"
                className={`${styles.suggestionChip} ${styles.suggestionEnquire}`}
                onClick={() => handleOpenLeadModal()}
              >
                ⚡ Request a Quote
              </button>
            </div>
          </div>

          {/* Error Banner if any */}
          {errorBanner && (
            <div className={styles.chatErrorBanner}>
              <AlertCircle size={14} />
              <span>{errorBanner}</span>
              <button
                type="button"
                onClick={() => handleSend(messages[messages.length - 1]?.content)}
                className={styles.retryBtn}
              >
                <RefreshCw size={12} /> Retry
              </button>
            </div>
          )}

          {/* Input Footer */}
          <div className={styles.chatFooter}>
            <div className={styles.inputContainer}>
              <input
                ref={inputRef}
                type="text"
                className={styles.chatInput}
                placeholder="Ask about services, training, quotes..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
                maxLength={1000}
              />
              <button
                type="button"
                className={styles.sendBtn}
                onClick={() => handleSend()}
                disabled={!inputMessage.trim() || isTyping}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>

            <div className={styles.footerBrandNote}>
              <span>Powered by TechZen AI & OpenAI</span>
              <a
                href="tel:+919303878713"
                className={styles.callShortcut}
                title="Call TechZen"
              >
                <PhoneCall size={11} /> +91 9303878713
              </a>
            </div>
          </div>

          {/* 3. In-Chat Lead Enquiry Modal */}
          {showLeadModal && (
            <LeadFormModal
              onClose={() => setShowLeadModal(false)}
              onSuccess={handleLeadSuccess}
              initialService={leadService}
            />
          )}
        </div>
      )}
    </div>
  );
}

