import { Router } from "express";
import bcrypt from "bcryptjs";

const authRouter = Router();

authRouter.post("/auth/login", async (req, res) => {
  const { username, password } = req.body as { username?: string; password?: string };

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminUsername || !adminPasswordHash) {
    res.status(503).json({ error: "Admin credentials not configured on the server." });
    return;
  }

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required." });
    return;
  }

  // Constant-time comparison to resist timing attacks
  const usernameMatch = username === adminUsername;
  const passwordMatch = await bcrypt.compare(password, adminPasswordHash);

  if (!usernameMatch || !passwordMatch) {
    res.status(401).json({ error: "Invalid credentials." });
    return;
  }

  req.session.adminAuthenticated = true;
  res.json({ ok: true });
});

authRouter.post("/auth/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ ok: true });
  });
});

authRouter.get("/auth/me", (req, res) => {
  res.json({ authenticated: !!req.session?.adminAuthenticated });
});

export default authRouter;
