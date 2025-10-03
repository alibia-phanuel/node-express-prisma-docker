//the address of  this server connect to the network is : http://localhost:3000/
//URL -> http://localhost:3000
//URL -> http://127.0.0.1:3000
//IP -> 127.0.0.1
//PORT -> 3000
import express from "express";
import dotenv from "dotenv";
dotenv.config();

//Middleware
app.use(express.json());
const app = express();
const PORT = process.env.PORT;
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/dashboard", (req, res) => {
  res.send("dashboard");
  res.sendStus(201);
});

app.listen(PORT, () => {
  console.log({ "Le server tourne sur le port": PORT });
});
