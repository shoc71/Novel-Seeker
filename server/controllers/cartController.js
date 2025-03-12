import Product from "../models/productModel.js"

export const getCartProducts = async (req, res) => {
    try {
        const products = await Product.find({ _id: { $in: req.user.cartItems } });

        const cartItems = products.map(product => {
            const item = req.user.cartItems.find(cartItem => cartItem.id === product.id);
            return { ...product.toJSON(), quantity: item.quantity }
        })

        res.status(200).json({ success: true, data: cartItems });

    } catch (error) {
        console.error("Server getCartProducts Error: ", error.message)
        res.status(500).json({ success: false, message: `Server getCartProducts Error: ${error}` })
    }
}

export const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        const existingItem = await cartItems.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cartItems.push(productId);
        }

        await user.save();
        res.status(200).json({ success: true, data: cartItems });
    } catch (error) {
        console.error("Server addToCart Error: ", error.message)
        res.status(500).json({ success: false, message: `Server addToCart Error: ${error}` })
    }
}

export const removeAllFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        if (!productId) {
            user.cartItems = [];
        } else {
            user.cartItems = user.cartItems.filter((item) => item.id !== productId);
        }

        await user.save();
        res.status(200).json({ success: true, message: user.cartItems });
    } catch (error) {
        console.error("Server reomveAllFromCart Error: ", error.message);
        res.status(500).json({ success: false, message: `Server reomveAllFromCart Error: ${error}` });
    }
}

export const updateQuantity = async (req, res) => {
    try {
        const { id: productId } = req.params;
        const { quantity } = req.body;
        const user = req.user;
        const existingItem = user.cartItems.find((item) => item.id === productId);

        if (existingItem) {
            if (quantity === 0) {
                user.cartItems = user.cartItems.filter((item) => item.id !== productId);
            }

            existingItem.quantity = quantity;
            await user.save();
            res.status(200).json({ success: true, data: user.cartItems });
        } else {
            res.status(404).json({ success: false, message: "Product not found" });
        }


    } catch (error) {
        console.error("Server updateQuantity Error: ", error.message);
        res.status(500).json({ success: false, message: `Server updateQuantity Error: ${error}` });
    }
}