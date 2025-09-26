const url = "wss://ws.postman-echo.com/raw"; // change this to your chosen endpoint
const socket = new WebSocket(url);

socket.onopen = () => {
  console.log("Connected to", url);
  socket.send("Hello, WebSocket!");
};

socket.onmessage = (event) => {
  console.log("Received:", event.data);
};

socket.onerror = (err) => {
  console.error("WebSocket error:", err);
};

socket.onclose = (evt) => {
  console.log("Connection closed:", evt.code, evt.reason);
};
