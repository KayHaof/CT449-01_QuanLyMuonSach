const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();
connectDB();

const app = express();

// --- Tạo HTTP server để gắn socket ---
const server = http.createServer(app);

// --- Khởi tạo socket.io ---
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});

// Lưu socket.io vào global để controller dùng được
global._io = io;

// Lắng nghe client kết nối
io.on("connection", (socket) => {
    console.log("⚡ Client connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("❌ Client disconnected:", socket.id);
    });
});

app.use(cors());
app.use(express.json());

// Static assets
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Routes
app.use("/", require("./routes/home"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/authors", require("./routes/authors"));
app.use("/api/books", require("./routes/books"));
app.use("/api/borrows", require("./routes/borrows"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/fines", require("./routes/fines"));
app.use("/api/publishers", require("./routes/publishers"));
app.use("/api/readers", require("./routes/readers"));
app.use("/api/staffs", require("./routes/staffs"));
app.use("/api/users", require("./routes/users"));

// --- Start server bằng server.listen ---
const PORT = process.env.PORT || 8080;
server.listen(PORT, () =>
    console.log(`=> Server running with SOCKET.IO on port ${PORT}`)
);
