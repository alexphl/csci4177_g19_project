"use strict";
import { Router } from "express";
const router = Router();

// Unused route, redirects the user back to the website.
// Redirects can be used instead of EJS views now that everything is under the same domain.
router.get("/", function (_req, res) {
  res.redirect("/");
});

export default router;
