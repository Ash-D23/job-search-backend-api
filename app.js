const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose")
const http = require("http");
const socketIO = require("socket.io");

const jobRoutes = require('./routes/job');
const experienceRoutes = require('./routes/experience');
const authRoutes = require('./routes/auth');

const PORT = process.env.PORT || 4000;

const app = express();

const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

app.use('/auth', authRoutes);
app.use('/job', jobRoutes);
app.use('/experience', experienceRoutes);


app.use((error, req, res, next) => {

  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  console.log("error")

  res.status(status).json({ message: message, data: data });
});

io.on("connection", socket => {
  console.log("New client connected" + socket.id);

  socket.on("initial_job_data", () => {
    console.log("initial_job")
    io.sockets.emit("get_job_data");
      
  });

  socket.on("initial_experience_data", () => {
      
    io.sockets.emit("get_experience_data");
      
  });

  socket.on("created_job", ()=>{
    console.log("created job")
    io.sockets.emit("get_job_data")
  })

  socket.on("create_experience",()=>{
    io.sockets.emit("get_experience_data")
  })

  socket.on("disconnect", () => {
      console.log("user disconnected");
  });
})


mongoose.connect(process.env.mongo_uri, {useNewUrlParser: true})
.then(() =>{
  server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
})
