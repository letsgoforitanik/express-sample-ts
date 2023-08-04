import express from "express";
import { productRepo } from "@repositories";

const router = express.Router();
const adminRouter = express.Router();

router.use("/admin", adminRouter);

adminRouter.get("/add-product", function (_, response) {
    return response.render("admin/add-product", {
        pageTitle: "Add Product",
        activeLink: "add-product",
        product: null,
    });
});

adminRouter.post("/add-product", async function (request, response) {
    const { title, price, description, imageUrl } = request.body;
    const productInfo = { title, price: Number(price), description, imageUrl };
    await productRepo.addUserProduct(request.user, productInfo);
    return response.redirect("/");
});

adminRouter.get("/edit-product/:productId", async function (request, response) {
    const { productId } = request.params;
    const product = await productRepo.getProduct(productId);

    if (!product) {
        return response.render("error/404", {
            pageTitle: "Not Found",
            activeLink: null,
        });
    }

    return response.render("admin/edit-product", {
        pageTitle: `Edit ${product.title}`,
        activeLink: null,
        product,
    });
});

adminRouter.post("/edit-product", async function (request, response) {
    const { productId, title, imageUrl, price, description } = request.body;
    await productRepo.updateProduct(productId, { title, imageUrl, price: Number(price), description });
    return response.redirect("/");
});

adminRouter.get("/delete-product/:productId", async function (request, response) {
    const { productId } = request.params;
    await productRepo.removeProduct(productId);
    return response.redirect("/");
});

adminRouter.get("/products", async function (request, response) {
    const user = request.user;
    const products = await productRepo.getUserProducts(user);

    return response.render("admin/products", {
        pageTitle: "Admin products",
        activeLink: "admin-products",
        products,
    });
});

export { router };
