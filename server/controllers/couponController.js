import Coupon from "../models/couponModel.js";

export const getCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findOne({ userId: req.user._id, isActive: true });
        res.status(200).json({ success: true, data: coupon });
    } catch (error) {
        console.error(`Server getCoupon Error: ${error.message}`)
        res.status(500).json({ success: false, message: `Server getCoupon Error: ${error}` });
    }
}

export const validateCoupon = async (req, res) => {
    try {
        const { code } = req.body;
        const coupon = await Coupon.findOne({ code: code, userId: req.user._id, isActive: true });

        if (!coupon) {
            return res.status(404).json({ success: false, message: "Coupon not found" });
        }

        if (coupon.expirationDate < new Date()) {
            coupon.isActive = false;
            await coupon.save();
            return res.status(404).json({ success: false, message: "Coupon expired" });
        }

        res.status(200).json({ success: true, message: "Valid Coupon Found!", code: coupon.code, discountPercentage: coupon.discountPercentage });

    } catch (error) {
        console.error(`Server validateCoupon Error: ${error.message}`)
        res.status(500).json({ success: false, message: `Server validateCoupon Error: ${error}` });
    }
}