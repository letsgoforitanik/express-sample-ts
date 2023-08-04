import express from "express";
import { orderRepo } from "@repositories";

const router = express.Router();

router.get("/create-order", async function (request, response) {
    await orderRepo.createOrder(request.user);
    return response.redirect("/order");
});

router.get("/orders", async function (request, response) {
    const orders = await orderRepo.getOrders(request.user);

    return response.render("orders/index", {
        pageTitle: "Orders",
        activeLink: "orders",
        orders,
    });
});

export { router };
