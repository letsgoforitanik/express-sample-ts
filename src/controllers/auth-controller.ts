import express from "express";
import { userRepo } from "@repositories";

const router = express.Router();

router.use("/", async function (request, _, next) {
    const userCount = await userRepo.getUserCount();

    if (userCount === 0) {
        request.user = await userRepo.addUser({
            name: "Anik Banerjee",
            email: "letsgoforitanik@gmail.com",
            cart: {
                items: [],
            },
        });
    }
    //
    else {
        const users = await userRepo.getUsers();
        request.user = users[0];
    }

    next();
});

export { router };
