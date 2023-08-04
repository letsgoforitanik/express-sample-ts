import express from "express";

const router = express.Router();

router.use("/", function (_, response) {
    response.status(404).render("errors/404", {
        pageTitle: "Page Not Found",
        activeLink: null,
    });
});

export { router };
