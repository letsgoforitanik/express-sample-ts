import http from "node:http";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import ejsLayouts from "express-ejs-layouts";

import { shopController, adminController } from "@controllers";
import { getAbsPath } from "@utils";

dotenv.config();

const app = express();

app.set("view engine", "ejs");
app.set("views", getAbsPath("views"));
app.set("layout", getAbsPath("views/layout/main"));

app.use(ejsLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(shopController.router);
app.use(adminController.router);

const server = http.createServer(app);
const port = process.env.PORT;

server.listen(port, () => console.log(`Server is up and running on port ${port}`));
