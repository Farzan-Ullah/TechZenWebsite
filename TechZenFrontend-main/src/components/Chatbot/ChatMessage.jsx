import React from "react";
import { Bot, User, Check, Copy } from "lucide-react";
import styles from "./Chatbot.module.css";

/**
 * Format markdown-like text safely into structured HTML elements:
 * Supports ### Headers, **bold**, *italic*, [link](url), and - lists.
 */
function renderFormattedContent(text = "") {
  if (!text) return null;

  const lines = text.split("\n");
  const elements = [];
  let currentList = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className={styles.msgList}>
          {currentList.map((item, idx) => (
            <li key={idx}>{parseInlineFormatting(item)}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, lineIdx) => {
    const trimmed = line.trim();

    // Headers (### or ## or #)
    if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h4 key={`h4-${lineIdx}`} className={styles.msgHeading}>
          {parseInlineFormatting(trimmed.replace(/^###\s+/, ""))}
        </h4>
      );
      return;
    }
    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h3 key={`h3-${lineIdx}`} className={styles.msgHeading}>
          {parseInlineFormatting(trimmed.replace(/^##\s+/, ""))}
        </h3>
      );
      return;
    }

    // Bullet lists (- or * or numbered 1. 2.)
    if (/^[-*]\s+/.test(trimmed)) {
      currentList.push(trimmed.replace(/^[-*]\s+/, ""));
      return;
    }
    if (/^\d+\.\s+/.test(trimmed)) {
      currentList.push(trimmed.replace(/^\d+\.\s+/, ""));
      return;
    }

    flushList();

    if (trimmed === "") {
      // Empty line spacing
      elements.push(<div key={`sp-${lineIdx}`} className={styles.msgSpacer} />);
    } else {
      elements.push(
        <p key={`p-${lineIdx}`} className={styles.msgParagraph}>
          {parseInlineFormatting(trimmed)}
        </p>
      );
    }
  });

  flushList();
  return elements;
}

/**
 * Parse inline **bold**, [link](url), and `code`
 */
function parseInlineFormatting(str = "") {
  // Split tokens by links, bold, code
  const parts = [];
  const regex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|`.*?`)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(str)) !== null) {
    if (match.index > lastIndex) {
      parts.push(str.substring(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("[") && token.includes("](") && token.endsWith(")")) {
      const linkMatch = token.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        const linkText = linkMatch[1];
        const linkUrl = linkMatch[2];
        const isExternal = linkUrl.startsWith("http") || linkUrl.startsWith("mailto:") || linkUrl.startsWith("tel:");
        parts.push(
          <a
            key={`a-${match.index}`}
            href={linkUrl}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className={styles.msgLink}
          >
            {linkText}
          </a>
        );
      }
    } else if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(<strong key={`b-${match.index}`}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("`") && token.endsWith("`")) {
      parts.push(<code key={`c-${match.index}`} className={styles.inlineCode}>{token.slice(1, -1)}</code>);
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < str.length) {
    parts.push(str.substring(lastIndex));
  }

  return parts;
}

export default function ChatMessage({ message, onActionClick }) {
  const isUser = message.role === "user";
  const isSystem = message.role === "system";
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (!message.content) return;
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`${styles.messageRow} ${
        isUser ? styles.userRow : isSystem ? styles.systemRow : styles.assistantRow
      }`}
    >
      {!isUser && !isSystem && (
        <div className={styles.botAvatar}>
          <Bot size={16} />
        </div>
      )}

      <div className={styles.messageBubbleContainer}>
        <div
          className={`${styles.messageBubble} ${
            isUser ? styles.userBubble : isSystem ? styles.systemBubble : styles.assistantBubble
          }`}
        >
          {isUser ? (
            <p className={styles.userText}>{message.content}</p>
          ) : (
            <div className={styles.formattedContent}>
              {renderFormattedContent(message.content)}
            </div>
          )}

          {message.actions && Array.isArray(message.actions) && message.actions.length > 0 && (
            <div className={styles.inMessageActions}>
              {message.actions.map((act, i) => (
                <button
                  key={i}
                  type="button"
                  className={styles.inMessageActionBtn}
                  onClick={() => onActionClick && onActionClick(act)}
                >
                  {act.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.messageMeta}>
          <span className={styles.timestamp}>{message.timestamp}</span>
          {!isUser && !isSystem && (
            <button
              type="button"
              className={styles.copyBtn}
              onClick={handleCopy}
              title="Copy message"
              aria-label="Copy message"
            >
              {copied ? <Check size={12} className={styles.copiedIcon} /> : <Copy size={12} />}
            </button>
          )}
        </div>
      </div>

      {isUser && (
        <div className={styles.userAvatar}>
          <User size={16} />
        </div>
      )}
    </div>
  );
}
