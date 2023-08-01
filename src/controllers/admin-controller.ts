import express from "express";

const router = express.Router();
const adminRouter = express.Router();

router.use("/admin", adminRouter);

adminRouter.get("/add-product", function (_, response) {
    return response.render("admin/add-product", {
        pageTitle: "Add Product",
        activeLink: "add-product",
    });
});

export { router };
