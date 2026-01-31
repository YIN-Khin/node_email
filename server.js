// // console.log('🚀 Starting Inventory Management System Server...');

// const express = require("express");
// // console.log('✅ Express loaded');

// const cors = require("cors");
// // console.log('✅ CORS loaded');

// const http = require("http");
// // console.log('✅ HTTP loaded');

// const socketIo = require("socket.io");
// // console.log('✅ Socket.IO loaded');

// // Import routes
// // console.log('📁 Loading routes...');
// const customerRoute = require("./src/routes/customerRoute");
// // console.log('✅ Customer route loaded');

// const categoryRoute = require("./src/routes/categoryRoute");
// // console.log('✅ Category route loaded');

// const brandRoute = require("./src/routes/brandRoute");
// // console.log('✅ Brand route loaded');

// const productRoute = require("./src/routes/productRoute");
// // console.log('✅ Product route loaded');

// const SupplierRoute = require("./src/routes/SupplierRoute");
// // console.log('✅ Supplier route loaded');

// const PurchaseRoute = require("./src/routes/PurchaseRoute");
// // console.log('✅ Purchase route loaded');

// const PurchaseItem = require("./src/routes/PurchaseItemRoute");
// // console.log('✅ Purchase Item route loaded');

// const Sales = require("./src/routes/SaleRoute");
// // console.log('✅ Sales route loaded');

// const PaymentRoutes = require("./src/routes/PaymentRoute");
// // console.log('✅ Payment route loaded');

// const User = require("./src/routes/UserRoute");
// // console.log('✅ User route loaded');

// const Role = require("./src/routes/RoleRoute");
// // console.log('✅ Role route loaded');

// const notificationRoutes = require("./src/routes/notificationRoutes");
// // console.log('✅ Notification routes loaded');

// const reportRoutes = require("./src/routes/reportRoutes");
// // console.log('✅ Report routes loaded');

// const setupRoutes = require("./src/routes/SetupRoute");
// // console.log('✅ Setup routes loaded');

// const settingsRoutes = require("./src/routes/settingsRoute");
// // console.log('✅ Settings routes loaded');

// const dashboardRoute = require("./src/routes/dashboardRoute");
// // console.log('✅ Dashboard route loaded');

// const stockRoutes = require("./src/routes/stockRoutes");
// // console.log('✅ Stock routes loaded');

// const StaffRoutes = require("./src/routes/StaffRoute");
// // console.log('✅ Staff routes loaded');

// const db = require("./src/models");
// const sequelize = db.sequelize;
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     // origin: "*",
//     methods: ["GET", "POST"],
//     origin: "*.railway.app",
//     credentials: true,
//   },
// });
// // console.log('✅ Server components created');

// // Middleware
// // console.log('⚙️  Setting up middleware...');
// app.use(cors());
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// // Make io accessible in routes
// app.set("io", io);
// // console.log('✅ Middleware configured');

// // Routes
// // console.log('🛣️  Setting up routes...');
// app.use("/api", reportRoutes);
// app.use("/api", dashboardRoute);
// // console.log('✅ Report routes registered');
// // console.log('✅ Dashboard routes registered');

// notificationRoutes(app);
// // console.log('✅ Notification routes registered');

// setupRoutes(app);
// // console.log('✅ Setup routes registered');

// settingsRoutes(app);
// // console.log('✅ Settings routes registered');

// customerRoute(app);
// // console.log('✅ Customer routes registered');

// categoryRoute(app);
// // console.log('✅ Category routes registered');

// brandRoute(app);
// // console.log('✅ Brand routes registered');

// productRoute(app);
// // console.log('✅ Product routes registered');

// SupplierRoute(app);
// // console.log('✅ Supplier routes registered');

// PurchaseRoute(app);
// // console.log('✅ Purchase routes registered');

// PurchaseItem(app);
// // console.log('✅ Purchase Item routes registered');

// Sales(app);
// // console.log('✅ Sales routes registered');

// PaymentRoutes(app);
// // console.log('✅ Payment routes registered');

// User(app);
// // console.log('✅ User routes registered');

// Role(app);
// // console.log('✅ Role routes registered');

// stockRoutes(app);
// // console.log('✅ Stock routes registered');

// StaffRoutes(app);
// // console.log('✅ Staff routes registered');

// // console.log('✅ All routes configured');

// // console.log('🔧 Defining database sync function...');
// const syncDatabase = async () => {
//   try {
//     // console.log('Attempting database connection...');
//     await sequelize.authenticate();
//     // console.log('✅ Database connection established successfully.');

//     // IMPORTANT: Don't use alter:true in production as it can cause data loss
//     // Use migrations instead for schema changes
//     // await sequelize.sync({ alter: true });

//     // Only sync without altering existing tables
//     await sequelize.sync({ alter: false });
//     // console.log("✅ Database synchronized.");
//   } catch (error) {
//     const errorMsg = error.message || error.toString();
//     const errorCode = error.code || error.parent?.code || "UNKNOWN";

//     // console.error('❌ Unable to sync database:', errorMsg);
//     // console.error('   Error Code:', errorCode);

//     // Connection errors - don't try force sync (it will fail with same error)
//     const isConnectionError =
//       errorCode === "ECONNREFUSED" ||
//       errorCode === "ETIMEDOUT" ||
//       errorCode === "ENOTFOUND";

//     if (errorCode === "ECONNREFUSED") {
//       // console.warn('⚠️  Warning: Cannot connect to MySQL server.');
//       // console.warn('   → Please start MySQL service in XAMPP/WAMP Control Panel');
//       // console.warn('   → Make sure MySQL is running on port 3306');
//     } else if (
//       errorCode === "ER_ACCESS_DENIED_ERROR" ||
//       errorCode === "ER_BAD_DB_ERROR"
//     ) {
//       // console.warn('⚠️  Warning: Database authentication or database name error.');
//       // console.warn('   → Check database credentials in config/config.json');
//       // console.warn('   → Make sure database exists or will be created');
//     } else {
//       // console.warn('⚠️  Warning: Database connection failed.');
//     }

//     // console.warn('⚠️  Server will continue running, but database operations will fail.');

//     if (process.env.NODE_ENV !== "production" && !isConnectionError) {
//       console.log("   Trying with force sync...");
//       try {
//         await sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { raw: true });
//         await sequelize.sync({ force: true });
//         await sequelize.query("SET FOREIGN_KEY_CHECKS = 1", { raw: true });
//         // console.log('✅ Database synchronized with force.');
//       } catch (forceError) {
//         const forceErrorMsg = forceError.message || forceError.toString();
//         // console.error('❌ Force sync failed:', forceErrorMsg);
//       }
//     } else if (isConnectionError) {
//       // console.log('   ⏭️  Skipping force sync (connection error - MySQL not running)');
//     }

//     return false;
//   }
//   return true;
// };

// console.log("🚀 Starting server...");
// const PORT = process.env.PORT || 3001;

// // Import stock level checker
// const stockLevelChecker = require("./src/jobs/stockLevelChecker");
// const expirationChecker = require("./src/jobs/expirationChecker");

// console.log(`📡 Attempting to listen on port ${PORT}...`);
// server
//   .listen(PORT, function () {
//     console.log(`✅ Server is running on http://localhost:${PORT}`);

//     syncDatabase()
//       .then((success) => {
//         if (success) {
//           // Start stock level checker after successful database sync
//           console.log("🔄 Starting stock level monitoring...");
//           try {
//             stockLevelChecker.start();
//             console.log("✅ Stock level checker started successfully");
//           } catch (error) {
//             console.error("❌ Failed to start stock level checker:", error);
//           }

//           // Start expiration checker
//           console.log("📅 Starting expiration monitoring...");
//           try {
//             expirationChecker.start();
//             console.log("✅ Expiration checker started successfully");
//           } catch (error) {
//             console.error("❌ Failed to start expiration checker:", error);
//           }
//         }
//       })
//       .catch((err) => {
//         console.error("❌ Database sync error (non-fatal):", err.message);
//       });
//   })
//   .on("error", (err) => {
//     console.error("❌ Server startup error:", err.message);
//     if (err.code === "EADDRINUSE") {
//       console.error(`❌ Error: Port ${PORT} is already in use.`);
//       process.exit(1);
//     } else {
//       console.error("❌ Server error:", err.message);
//       process.exit(1);
//     }
//   });

// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

console.log("🚀 Starting Inventory Management System Server...");
console.log("Environment:", process.env.NODE_ENV || "development");

// Import routes
const customerRoute = require("./src/routes/customerRoute");
const categoryRoute = require("./src/routes/categoryRoute");
const brandRoute = require("./src/routes/brandRoute");
const productRoute = require("./src/routes/productRoute");
const SupplierRoute = require("./src/routes/SupplierRoute");
const PurchaseRoute = require("./src/routes/PurchaseRoute");
const PurchaseItem = require("./src/routes/PurchaseItemRoute");
const Sales = require("./src/routes/SaleRoute");
const PaymentRoutes = require("./src/routes/PaymentRoute");
const User = require("./src/routes/UserRoute");
const Role = require("./src/routes/RoleRoute");
const notificationRoutes = require("./src/routes/notificationRoutes");
const reportRoutes = require("./src/routes/reportRoutes");
const setupRoutes = require("./src/routes/SetupRoute");
const settingsRoutes = require("./src/routes/settingsRoute");
const dashboardRoute = require("./src/routes/dashboardRoute");
const stockRoutes = require("./src/routes/stockRoutes");
const StaffRoutes = require("./src/routes/StaffRoute");

const db = require("./src/models");
const sequelize = db.sequelize;

const app = express();
const server = http.createServer(app);

// CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
  : ["http://localhost:3000"];

console.log("✅ Allowed Origins:", allowedOrigins);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes("*")) {
      callback(null, true);
    } else {
      console.warn("⚠️  CORS blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 600, // 10 minutes
};

app.use(cors(corsOptions));

// Socket.IO Configuration
const io = socketIo(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

console.log("✅ Socket.IO configured");

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.set("io", io);

console.log("✅ Middleware configured");

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({
      status: "OK",
      database: "connected",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      database: "disconnected",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// API info endpoint
app.get("/api", (req, res) => {
  res.json({
    name: "Inventory Management API",
    version: "1.0.0",
    status: "running",
    endpoints: {
      health: "/health",
      dashboard: "/api/dashboard",
      products: "/api/products",
      customers: "/api/customers",
      sales: "/api/sales",
      // Add more endpoints as needed
    },
  });
});

// Routes
console.log("🛣️  Configuring routes...");

app.use("/api", reportRoutes);
app.use("/api", dashboardRoute);
notificationRoutes(app);
setupRoutes(app);
settingsRoutes(app);
customerRoute(app);
categoryRoute(app);
brandRoute(app);
productRoute(app);
SupplierRoute(app);
PurchaseRoute(app);
PurchaseItem(app);
Sales(app);
PaymentRoutes(app);
User(app);
Role(app);
stockRoutes(app);
StaffRoutes(app);

console.log("✅ All routes configured");

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status || 500,
      ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: "Route not found",
      path: req.path,
      method: req.method,
    },
  });
});

// Database sync function
const syncDatabase = async () => {
  try {
    console.log("🔄 Attempting database connection...");
    console.log("Database:", process.env.DB_NAME);
    console.log("Host:", process.env.DB_HOST);
    console.log("Port:", process.env.DB_PORT);

    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");

    // Sync database
    if (process.env.NODE_ENV === "production") {
      await sequelize.sync({ alter: false });
      console.log("✅ Database synchronized (production mode - no alter).");
    } else {
      await sequelize.sync({ alter: true });
      console.log("✅ Database synchronized (development mode - with alter).");
    }

    // Test query
    const [results] = await sequelize.query(
      "SELECT DATABASE() as db, VERSION() as version",
    );
    console.log("📊 Database Info:");
    console.log("  Current DB:", results[0].db);
    console.log("  MySQL Version:", results[0].version);

    return true;
  } catch (error) {
    console.error("❌ Database connection failed!");
    console.error("Error:", error.message);
    console.error("Code:", error.code);

    if (error.code === "ECONNREFUSED") {
      console.error("💡 MySQL server is not running or unreachable");
    } else if (error.code === "ER_ACCESS_DENIED_ERROR") {
      console.error("💡 Database credentials are incorrect");
    } else if (error.code === "ENOTFOUND") {
      console.error("💡 Database host not found");
    } else if (error.code === "ETIMEDOUT") {
      console.error("💡 Connection timeout - check firewall/network");
    }

    return false;
  }
};

const PORT = process.env.PORT || 3001;

// Import background jobs
const stockLevelChecker = require("./src/jobs/stockLevelChecker");
const expirationChecker = require("./src/jobs/expirationChecker");

console.log(`📡 Starting server on port ${PORT}...`);

server
  .listen(PORT, "0.0.0.0", function () {
    console.log(`✅ Server is running on port ${PORT}`);
    console.log(
      `🌐 API URL: ${
        process.env.NODE_ENV === "production"
          ? `https://backend-production-8eb72.up.railway.app`
          : `http://localhost:${PORT}`
      }`,
    );

    syncDatabase()
      .then((success) => {
        if (success) {
          console.log("🔄 Starting background jobs...");

          try {
            stockLevelChecker.start();
            console.log("✅ Stock level checker started");
          } catch (error) {
            console.error(
              "❌ Failed to start stock level checker:",
              error.message,
            );
          }

          try {
            expirationChecker.start();
            console.log("✅ Expiration checker started");
          } catch (error) {
            console.error(
              "❌ Failed to start expiration checker:",
              error.message,
            );
          }
        } else {
          console.warn("⚠️  Server running but database connection failed");
          console.warn(
            "⚠️  API endpoints will return errors until database is connected",
          );
        }
      })
      .catch((err) => {
        console.error("❌ Unexpected database sync error:", err.message);
      });
  })
  .on("error", (err) => {
    console.error("❌ Server startup error:", err.message);
    if (err.code === "EADDRINUSE") {
      console.error(`❌ Port ${PORT} is already in use.`);
      console.error("💡 Try: kill -9 $(lsof -ti:${PORT})");
      process.exit(1);
    } else {
      console.error("❌ Unexpected server error");
      process.exit(1);
    }
  });

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("🔌 New socket connection:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔌 Socket disconnected:", socket.id);
  });
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("📴 SIGTERM signal received: closing HTTP server");
  server.close(async () => {
    console.log("🔌 HTTP server closed");
    await sequelize.close();
    console.log("🔌 Database connection closed");
    process.exit(0);
  });
});

process.on("SIGINT", async () => {
  console.log("\n📴 SIGINT signal received: closing HTTP server");
  server.close(async () => {
    console.log("🔌 HTTP server closed");
    await sequelize.close();
    console.log("🔌 Database connection closed");
    process.exit(0);
  });
});
