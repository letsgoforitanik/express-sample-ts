import { Schema, model } from "mongoose";
import { InferredDoc, InferredType, WithId } from "types";

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    products: [
        {
            id: Schema.Types.ObjectId,
            price: Schema.Types.Number,
            title: Schema.Types.String,
            quantity: Schema.Types.Number,
        },
    ],
});

export const Order = model("Order", orderSchema);
export type OrderDocument = InferredDoc<typeof Order>;
export type OrderCreationDto = InferredType<typeof Order>;
export type OrderDto = WithId<OrderCreationDto>;
