import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Define API routes
  app.get("/api/messages", async (req, res) => {
    try {
      const messages = await storage.getAllMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve messages" });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const { spell, title, content } = req.body;
      
      if (!spell || !content) {
        return res.status(400).json({ message: "Spell and content are required" });
      }
      
      const message = await storage.createMessage({
        spell,
        title: title || `Message for ${spell}`,
        content
      });
      
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ message: "Failed to create message" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
