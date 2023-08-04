import { Schema, model } from "mongoose";
import { InferredType, WithId } from "types";

const productSchema = new Schema({
    title: {
        type: Schema.Types.String,
        required: true,
    },
    price: {
        type: Schema.Types.Number,
        required: true,
    },
    description: {
        type: Schema.Types.String,
        required: true,
    },
    imageUrl: {
        type: Schema.Types.String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
});

export const Product = model("Product", productSchema);
export type ProductCreationDto = Omit<InferredType<typeof Product>, "userId">;
export type ProductDto = WithId<ProductCreationDto>;
