import { UserDocument, UserDto, Order, OrderDto } from "@models";
import { cartRepo } from "@repositories";

export async function createOrder(user: UserDto) {
    const userDocument = user as UserDocument;
    const cartItems = await cartRepo.getCartItems(user);

    const orderProducts = cartItems.map((item) => ({
        id: item.product.id,
        price: item.product.price,
        title: item.product.title,
        quantity: item.quantity,
    }));

    const order = await Order.create({ products: orderProducts, userId: userDocument });
    await cartRepo.clearCart(user);
    return order;
}

export async function getOrders(user: UserDto) {
    const userDocument = user as UserDocument;
    const orders = await Order.find({ userId: userDocument });
    return orders as OrderDto[];
}
