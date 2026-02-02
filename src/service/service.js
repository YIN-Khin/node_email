// Error logging service
const logError = (module, error, res) => {
  console.error(`❌ ${module} Error:`, error.message);
  
  if (res) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
      module: module
    });
  }
};

module.exports = logError;