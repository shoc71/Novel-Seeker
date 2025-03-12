import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
    },
    image: {
        type: String,
        required: [true, "Please add a image"],
    },
    price: {
        type: Number,
        min: 0,
        required: [true, "Please add a price"],
    },
    category: {
        type: String,
        required: [true, "Please add a category"],
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    // rating: {
    //     type: Number,
    //     default: 0,
    // },
    // numReviews: {
    //     type: Number,
    //     default: 0,
    // },
    // countInStock: {
    //     type: Number,
    //     required: [true, "Please add a countInStock"],
    // },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
}, {
    timestamps: true,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
