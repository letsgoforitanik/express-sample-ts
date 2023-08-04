import http from "node:http";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import ejsLayouts from "express-ejs-layouts";
import mongoose from "mongoose";

import { productController, adminController, cartController } from "@controllers";
import { errorController, authController, orderController } from "@controllers";
import { getAbsPath } from "@utils";

function configurePipeline(app: express.Express) {
    app.use(ejsLayouts);
    app.use(express.static("public"));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(authController.router);
    app.use(productController.router);
    app.use(cartController.router);
    app.use(orderController.router);
    app.use(adminController.router);
    app.use(errorController.router);
}

function configureSettings(app: express.Express) {
    app.set("view engine", "ejs");
    app.set("views", getAbsPath("views"));
    app.set("layout", getAbsPath("views/layout/main"));
}

async function main() {
    dotenv.config();

    const app = express();

    configureSettings(app);
    configurePipeline(app);

    const port = process.env.PORT;
    const dbConnectionString = process.env.DB_CONNECTION_STRING;

    await mongoose.connect(dbConnectionString);

    console.log(`Database connection successfully made`);

    const server = http.createServer(app);
    server.listen(port, () => console.log(`Server is up and running on port ${port}`));
}

main();
