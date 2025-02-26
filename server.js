const express = require("express");
const app = express();
require('dotenv').config();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

if (process.env.NODE_ENV == "local") {
  app.use(
    cors({
      origin: "http://localhost:5173/",
      credentials: true,
    })
  );
} else {
  app.use(
    cors({
      credentials: true,
    })
  );
}
const db_connect = async () => {
  if (process.env.NODE_ENV == "local") {
    await mongoose
      .connect(process.env.MONGODB_URL_LOCAL)
      .then(() => {
        console.log("Database connected successfully...");
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (process.env.NODE_ENV == "production") {
    await mongoose
      .connect(process.env.MONGODB_URL_PRODUCTION)
      .then(() => {
        console.log("Database connected successfully... atlas");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
db_connect();
if(process.env.NODE_ENV == 'production'){
    app.use(express.static(path.join(__dirname,'./frontend/dist')))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'./','frontend','dist','index.html'))
    })
}
const PORT=process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running....");
});
