import { redis } from "../config/redis.js";
import Product from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: { products } });
    } catch (error) {
        console.error("Server Error Get all products: ", error.message);
        res.status(500).json({ success: false, message: "Server Error Get all products: ", error });
    }
};

export const getFeaturedProducts = async (req, res) => {
    try {

        let featuredProducts = await redis.get("featured_products");

        // found in redis
        if (featuredProducts) {
            featuredProducts = JSON.parse(featuredProducts);
            return res.status(200).json({ success: true, data: { products: featuredProducts } });
        }

        // if not found in redis, fetch from mongoDB
        // .lean() mongoDB document => javascript object
        featuredProducts = await Product.find({ isFeatured: true }).lean();

        // store in redis for future quick access in redis from mongoDB
        if (!featuredProducts) {
            await redis.set("featured_products", JSON.stringify(featuredProducts));
            res.status(200).json({ success: true, data: { products: featuredProducts } });
        }

    } catch (error) {
        console.error("Server Error Get featured products: ", error.message);
        res.status(500).json({ success: false, message: "Server Error Get featured products: ", error });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, image, price, category } = req.body;

        let cloudinaryResponse = null

        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
        }

        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            category
        });

        res.status(201).json({ success: true, data: product });

    } catch (error) {
        console.error("Server Error Create product: ", error.message);
        res.status(500).json({ success: false, message: "Server Error Create product: ", error });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        if (product.image) {
            const publicId = product.image.split("/").pop().split(".")[0]; // image id
        }

        try {
            await cloudinary.uploader.destroy(`product/${publicId}`);
            console.log("deleted image from cloudinary")
        } catch (error) {
            console.error("Error Deleting image from cloudinary", error.message)
        }

        await Product.findByIdAndDelete(req.params.id)

    } catch (error) {
        console.error("Server Error Deleting Product: ", error.message);
        res.status(500).json({ success: false, message: `Server Error Deleting Product: ${error}` });
    }
}

export const getRecommendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $sample: { size: 3 }
            },
            {
                $product: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    image: 1,
                    price: 1
                }
            }
        ])

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error(`Server getRecommendationProducts Error : ${error.message}`);
        res.status(500).json({ success: false, message: `Server getRecommendationProducts Error : ${error}` });
    }
}

export const getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const products = await Product.find({ category });
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error(`Server getProductsByCategory Error: ${error.message}`);
        res.status(500).json({ success: false, message: `Server getProductsByCategory Error: ${error}` });
    }
}

export const toggleFeaturedProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            product.isFeatured = !product.isFeatured;
            const updatedProduct = await product.save();
            await updateFeaturedProductsCache();
            res.status(200).json({ success: true, data: updatedProduct });
        } else {
            res.status(404).json({ success: false, message: "Product not found" });
        }
    } catch (error) {
        console.error(`Server toggleFeaturedProduct Error: ${error.message}`);
        res.status(500).json({ success: false, message: `Server toggleFeaturedProduct Error: ${error}` });
    }
}

async function updateFeaturedProductsCache() {
    try {
        const featuredProducts = await Product.find({ isFeatured: true }).lean();
        await redis.set("featured_products", JSON.stringify(featuredProducts));
    } catch (error) {
        console.error("Error updating featured products cache: ", error.message);
    }
}