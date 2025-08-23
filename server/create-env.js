const fs = require("fs");

const envContent = `MONGODB_URI=mongodb://localhost:27017/myou-store
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
NEXT_PUBLIC_API_URL=http://localhost:5000`;

fs.writeFileSync(".env", envContent, "utf8");
console.log(".env file created successfully");
