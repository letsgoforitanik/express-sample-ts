import express from "express";
import { cartRepo, orderRepo } from "@repositories";

const router = express.Router();
const cartRouter = express.Router();

router.use("/cart", cartRouter);

cartRouter.get("/", async function (request, response) {
    const cartItems = await cartRepo.getCartItems(request.user);

    return response.render("cart/index", {
        pageTitle: "Cart",
        activeLink: "cart",
        cartItems,
    });
});

cartRouter.get("/delete-item/:productId", async function (request, response) {
    const { productId } = request.params;
    await cartRepo.deleteFromCart(request.user, productId);
    return response.redirect("/cart");
});

cartRouter.get("/create-order", async function (request, response) {
    await orderRepo.createOrder(request.user);
    return response.redirect("/order");
});

export { router };
