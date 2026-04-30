import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_FILE = path.resolve(process.cwd(), "orders.json");
const MSG_DB_FILE = path.resolve(process.cwd(), "messages.json");
const ADMIN_FILE = path.resolve(process.cwd(), "admin.json");

async function initDB() {
  try {
    await fs.access(DB_FILE);
  } catch {
    await fs.writeFile(DB_FILE, JSON.stringify([]));
  }
  try {
    await fs.access(MSG_DB_FILE);
  } catch {
    await fs.writeFile(MSG_DB_FILE, JSON.stringify([]));
  }
  try {
    await fs.access(ADMIN_FILE);
  } catch {
    await fs.writeFile(ADMIN_FILE, JSON.stringify({ password: "muha1212@" }));
  }
}

async function startServer() {
  await initDB();
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Simple auth middleware
  const authMiddleware = (req: any, res: any, next: any) => {
    const token = req.headers.authorization;
    if (token === "Bearer sahal-admin-token") {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  };

  app.post("/api/login", async (req, res) => {
    const { password } = req.body;
    try {
      const adminData = JSON.parse(await fs.readFile(ADMIN_FILE, "utf-8"));
      if (password === adminData.password) {
        res.json({ success: true, token: "sahal-admin-token" });
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    } catch (e) {
      res.status(500).json({ error: "Server error" });
    }
  });

  app.post("/api/forgot-password", async (req, res) => {
    try {
      // Generate a new random password
      const newPassword = Math.random().toString(36).slice(-8);
      
      // Save it to the admin file
      await fs.writeFile(ADMIN_FILE, JSON.stringify({ password: newPassword }));
      
      const emailUser = process.env.EMAIL_USER || "sahalmarketplace@gmail.com";
      const emailPass = process.env.EMAIL_PASS || ""; // Requires App Password
      
      if (emailPass) {
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: emailUser,
            pass: emailPass
          }
        });

        await transporter.sendMail({
          from: emailUser,
          to: "sahalmarketplace@gmail.com",
          subject: "Sahal Admin - Password Reset",
          text: `Waa kan password-kaaga cusub: ${newPassword}\n\nKusoo gal dashboard-ka adiga oo isticmaalaya.`
        });
      }
      
      console.log(`\n\n=== PASSWORD RESET ===\nAn email would be sent to sahalmarketplace@gmail.com.\nNew Password is: ${newPassword}\n======================\n\n`);
      
      res.json({ 
        success: true, 
        message: "Email sent with new password"
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to reset password" });
    }
  });

  // API Routes
  app.get("/api/orders", authMiddleware, async (req, res) => {
    try {
      const data = await fs.readFile(DB_FILE, "utf-8");
      res.json(JSON.parse(data));
    } catch (e) {
      res.status(500).json({ error: "Failed to read orders" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const newOrder = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        status: "pending",
        ...req.body,
      };
      const data = await fs.readFile(DB_FILE, "utf-8");
      const orders = JSON.parse(data);
      orders.unshift(newOrder); // Add to the beginning
      await fs.writeFile(DB_FILE, JSON.stringify(orders, null, 2));
      res.status(201).json(newOrder);
    } catch (e) {
      res.status(500).json({ error: "Failed to save order" });
    }
  });

  app.patch("/api/orders/:id", authMiddleware, async (req, res) => {
    try {
      const data = await fs.readFile(DB_FILE, "utf-8");
      let orders = JSON.parse(data);
      const idx = orders.findIndex((o: any) => o.id === req.params.id);
      if (idx !== -1) {
        orders[idx] = { ...orders[idx], ...req.body };
        await fs.writeFile(DB_FILE, JSON.stringify(orders, null, 2));
        res.json(orders[idx]);
      } else {
        res.status(404).json({ error: "Order not found" });
      }
    } catch (e) {
      res.status(500).json({ error: "Failed to update order" });
    }
  });

  app.delete("/api/orders/:id", authMiddleware, async (req, res) => {
    try {
      const data = await fs.readFile(DB_FILE, "utf-8");
      let orders = JSON.parse(data);
      orders = orders.filter((o: any) => o.id !== req.params.id);
      await fs.writeFile(DB_FILE, JSON.stringify(orders, null, 2));
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: "Failed to delete order" });
    }
  });

  // Messages API
  app.get("/api/messages", authMiddleware, async (req, res) => {
    try {
      const data = await fs.readFile(MSG_DB_FILE, "utf-8");
      res.json(JSON.parse(data));
    } catch (e) {
      res.status(500).json({ error: "Failed to read messages" });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const newMessage = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        status: "unread",
        ...req.body,
      };
      const data = await fs.readFile(MSG_DB_FILE, "utf-8");
      const messages = JSON.parse(data);
      messages.unshift(newMessage);
      await fs.writeFile(MSG_DB_FILE, JSON.stringify(messages, null, 2));
      res.status(201).json(newMessage);
    } catch (e) {
      res.status(500).json({ error: "Failed to save message" });
    }
  });

  app.patch("/api/messages/:id", authMiddleware, async (req, res) => {
    try {
      const data = await fs.readFile(MSG_DB_FILE, "utf-8");
      let messages = JSON.parse(data);
      const idx = messages.findIndex((m: any) => m.id === req.params.id);
      if (idx !== -1) {
        messages[idx] = { ...messages[idx], ...req.body };
        await fs.writeFile(MSG_DB_FILE, JSON.stringify(messages, null, 2));
        res.json(messages[idx]);
      } else {
        res.status(404).json({ error: "Message not found" });
      }
    } catch (e) {
      res.status(500).json({ error: "Failed to update message" });
    }
  });

  app.delete("/api/messages/:id", authMiddleware, async (req, res) => {
    try {
      const data = await fs.readFile(MSG_DB_FILE, "utf-8");
      let messages = JSON.parse(data);
      messages = messages.filter((m: any) => m.id !== req.params.id);
      await fs.writeFile(MSG_DB_FILE, JSON.stringify(messages, null, 2));
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: "Failed to delete message" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
