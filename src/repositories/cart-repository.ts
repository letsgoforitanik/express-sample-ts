import { Types } from "mongoose";
import { UserDto, UserDocument, ProductDto } from "@models";

export async function addToCart(user: UserDto, productId: string) {
    const userDocument = user as UserDocument;
    const item = userDocument.cart.items.find((item) => item.productId.toString() === productId);

    if (item) item.quantity++;
    else {
        const newItem = { productId: new Types.ObjectId(productId), quantity: 1 };
        userDocument.cart.items.push(newItem);
    }

    return await userDocument.save();
}

export async function deleteFromCart(user: UserDto, productId: string) {
    const userDocument = user as UserDocument;
    const cartItems = user.cart.items.filter((item) => item.productId.toString() !== productId);
    userDocument.cart.items = cartItems;
    return await userDocument.save();
}

export async function getCartItems(user: UserDto) {
    let userDocument = user as UserDocument;
    userDocument = await userDocument.populate("cart.items.productId");

    const items = userDocument.cart.items.map((item: any) => ({
        product: item.productId as ProductDto,
        quantity: item.quantity,
    }));

    return items;
}

export async function clearCart(user: UserDto) {
    const userDocument = user as UserDocument;
    userDocument.cart.items = [];
    return await userDocument.save();
}
