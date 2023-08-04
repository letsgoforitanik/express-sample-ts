import { Schema, model } from "mongoose";
import { InferredDoc, InferredType, WithId } from "types";

const userSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    email: {
        type: Schema.Types.String,
        required: true,
    },
    cart: {
        type: {
            items: [
                {
                    productId: {
                        type: Schema.Types.ObjectId,
                        required: true,
                        ref: "Product",
                    },
                    quantity: {
                        type: Schema.Types.Number,
                        required: true,
                    },
                },
            ],
        },
        required: true,
    },
});

userSchema.methods.addToCart = function (productId: string) {};

export const User = model("User", userSchema);
export type UserDocument = InferredDoc<typeof User>;
export type UserCreationDto = InferredType<typeof User>;
export type UserDto = WithId<UserCreationDto>;
