// src/routes/settingsRoute.js
const { getSettings, updateSettings, getSetting, initializeSettings } = require("../controllers/settingsController");
const auth = require("../middlewares/auth.middleware");

const settingsRoutes = (app) => {
  // Get all settings
  app.get("/api/settings", auth.validate_token(), getSettings);
  
  // Update settings
  app.put("/api/settings", auth.validate_token(), updateSettings);
  
  // Get single setting
  app.get("/api/settings/:key", auth.validate_token(), getSetting);
  
  // Initialize default settings
  app.post("/api/settings/init", auth.validate_token(), initializeSettings);
  
  // Add missing endpoints for frontend compatibility
  app.patch("/api/settings/:key", auth.validate_token(), updateSettings); // Update single setting
  app.post("/api/settings/reset", auth.validate_token(), initializeSettings); // Reset settings
  app.get("/api/settings/export", auth.validate_token(), getSettings); // Export settings
  app.post("/api/settings/import", auth.validate_token(), updateSettings); // Import settings
};

module.exports = settingsRoutes;