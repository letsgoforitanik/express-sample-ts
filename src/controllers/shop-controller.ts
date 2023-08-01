import express from "express";

const router = express.Router();

router.get("/", function (_, response) {
    console.log("came in home");
    return response.send("Hi! welcome to our shop");
});

export { router };
