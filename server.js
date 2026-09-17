const { Server } = require("socket.io");
const io = new Server(process.env.PORT || 3000, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("join", (pairingCode) => {
    socket.join(pairingCode);
    socket.data.code = pairingCode;
  });

  socket.on("call-request", (code) => socket.to(code).emit("incoming-call"));
  socket.on("call-accept", (code) => socket.to(code).emit("call-accepted"));
  socket.on("call-decline", (code) => socket.to(code).emit("call-declined"));
  socket.on("webrtc-offer", ({ code, offer }) => socket.to(code).emit("webrtc-offer", offer));
  socket.on("webrtc-answer", ({ code, answer }) => socket.to(code).emit("webrtc-answer", answer));
  socket.on("ice-candidate", ({ code, candidate }) => socket.to(code).emit("ice-candidate", candidate));
  socket.on("end-call", (code) => socket.to(code).emit("call-ended"));
  socket.on("vibrate-ping", (code) => socket.to(code).emit("vibrate-ping"));
});

console.log("Signaling server running");
