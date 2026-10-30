import express from "express";
import {
  handleChatMessage,
  handleLeadSubmission,
  getChatStatus
} from "./ChatController.js";

const ChatRoutes = express.Router();

// Public routes for website chatbot
ChatRoutes.post("/message", handleChatMessage);
ChatRoutes.post("/lead", handleLeadSubmission);
ChatRoutes.get("/status", getChatStatus);

export default ChatRoutes;
