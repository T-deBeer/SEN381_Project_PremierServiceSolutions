const express = require("express");
const sequelize = require("./config");
const cors = require("cors"); // Require the CORS middleware

const app = express();
const port = 3000;
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST"], // Specify the allowed methods
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Enable CORS for all routes. You can customize the options as needed.
app.use(cors());

app.use("/api/get/", require("./routes/GetRoutes"));

io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });

  socket.on("join-room", (roomID) => {
    socket.join(roomID);
    console.log("A client joined room: " + roomID);
  });

  socket.on("send-message", (messageData) => {
    socket.to(messageData.room).emit("recieve-message",messageData);
  });
});

http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
