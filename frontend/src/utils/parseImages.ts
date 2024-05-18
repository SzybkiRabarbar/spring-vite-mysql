import Product from "../interfaces/Product";


const parseImages = (product: Product): string[] => {
    let images: string[];

    if (product.images) {
        images = JSON.parse(product.images);
    } else {
        images = ["/no-image.jpg"];
    }
    return images
}

export default parseImages