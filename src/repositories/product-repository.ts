import { Product, ProductCreationDto, ProductDto, UserDto } from "@models";

export async function addUserProduct(user: UserDto, info: ProductCreationDto) {
    const product = await Product.create({ ...info, userId: user });
    return product as ProductDto;
}

export async function getProducts() {
    const products = await Product.find();
    return products;
}

export async function getUserProducts(user: UserDto) {
    const products = await Product.find({ userId: user });
    return products as ProductDto[];
}

export async function getProduct(productId: string) {
    try {
        const product = await Product.findById(productId);
        return product;
    } catch {
        return null;
    }
}

export async function updateProduct(productId: string, data: Partial<ProductCreationDto>) {
    const changedProduct = await Product.findByIdAndUpdate(productId, data);
    return changedProduct as ProductDto;
}

export async function removeProduct(productId: string) {
    const response = await Product.findByIdAndRemove(productId);
    return response;
}
