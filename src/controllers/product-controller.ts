import express from "express";
import { productRepo, cartRepo } from "@repositories";

const router = express.Router();

router.get("/", async function (_, response) {
    const products = await productRepo.getProducts();

    return response.render("product/index", {
        pageTitle: "Home",
        activeLink: "products",
        products,
    });
});

const productRouter = express.Router();

router.use("/product", productRouter);

productRouter.get("/:productId/details", async function (request, response) {
    const { productId } = request.params;
    const product = await productRepo.getProduct(productId);

    if (!product) {
        return response.render("errors/404", {
            pageTitle: "Resource Not Found",
            activeLink: null,
        });
    }

    return response.render("product/details", {
        pageTitle: "Product Details",
        activeLink: "products",
        product,
    });
});

productRouter.get("/:productId/add-to-cart", async function (request, response) {
    const { productId } = request.params;
    await cartRepo.addToCart(request.user, productId);
    return response.redirect("/");
});

export { router };
