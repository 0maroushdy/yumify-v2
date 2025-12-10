
import e from "express"; // Import Express framework
import dotenv from "dotenv"; // Import dotenv to manage environment variables
import cors from "cors";// Import CORS middleware
import path from "path"; // Import path module for handling file paths
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import foodRoutes from "./routes/food.route.js";
import cartRoutes from "./routes/cart.rotes.js";
import userRoutes from "./routes/user.route.js";
import orderRoutes from "./routes/order.route.js"
import reviewRoutes from "./routes/review.route.js"
import notifcationRoutes from "./routes/notification.route.js"
import staffRoutes from "./routes/staff.route.js"
import bookingRoutes from "./routes/booking.route.js"
import restaurantRoutes from './routes/restaurents.route.js'
import chatbotRoutes from "./routes/chatbot.route.js"
import { connectDB } from "./config/db.js";

dotenv.config(); // Load environment variables (.env file mongoDB connection, PORT, etc.)

const app = e();// Initialize Express app
app.use(cookieParser()); // Middleware to parse cookies

// CORS configuration - allow frontend URL from environment variable or default to localhost for development
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
// Support multiple origins (for Vercel preview deployments)
const allowedOrigins = frontendUrl.includes(',') 
  ? frontendUrl.split(',').map(url => url.trim())
  : [frontendUrl];

console.log('CORS Configuration:', {
  FRONTEND_URL: process.env.FRONTEND_URL,
  NODE_ENV: process.env.NODE_ENV,
  allowedOrigins: allowedOrigins
});

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log('CORS: Request with no origin, allowing');
      return callback(null, true);
    }
    
    console.log('CORS: Checking origin:', origin);
    
    // Check if origin is in allowed list
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      console.log('CORS: Origin allowed');
      callback(null, true);
    } else {
      // For development, allow localhost
      if (process.env.NODE_ENV !== 'production' && origin.includes('localhost')) {
        console.log('CORS: Localhost allowed in development');
        callback(null, true);
      } else {
        // Temporarily allow all origins in production for debugging - REMOVE IN PRODUCTION
        console.log('CORS: Origin not in allowed list, but allowing for now');
        callback(null, true);
        // Uncomment below to enforce CORS strictly:
        // callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
}));    // Enable CORS for cross-origin requests
app.use(e.json());  // Middleware to parse JSON request bodies
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(path.join(__dirname, '../uploads'));

// Mount API routers under /api prefix so client can use /api/foods 
app.use("/api/foods", foodRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/user", userRoutes);
app.use('/api/orders', orderRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/notifications', notifcationRoutes)
app.use('/api/restaurants', restaurantRoutes)
app.use('/api/staff', staffRoutes)
app.use('/api/booking', bookingRoutes)
app.use('/api/chatbot', chatbotRoutes)
app.use("/uploads", e.static(path.join(__dirname, "../uploads"))); // Serve static files from uploads directory

// Health check endpoint (for Render deployment health checks)
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

const PORT = process.env.PORT || 5000;

// Start server immediately, connect to DB in background
// This ensures Render health checks pass even if DB connection is slow
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check available at http://0.0.0.0:${PORT}/health`);
  
  // Connect to database in background
  connectDB().then(() => {
    console.log("Database connected successfully");
  }).catch(err => {
    console.error("Failed to connect to database:", err);
    // Don't exit - server can still run and retry connection
  });
});