import { razorpay } from "../config/razorpay.js"
import crypto from "crypto"
import userModel from "../models/userModel.js"

const planPrices = {
    free: 0,
    premium: 19900
}

const createOrder = async (req, res) => {
    const { plan } = req.body

    if (!planPrices.hasOwnProperty(plan)) {
        return res.status(400).json({ success: false, message: "Invalid plan" })
    }

    if (plan === 'free') {
        return res.json({ success: true, message: "Free plan selected - no payment required" })
    }

    const options = {
        amount: planPrices[plan],
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`,
        notes: { plan }
    }

    try {
        const order = await razorpay.orders.create(options)
        res.json({ success: true, order })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error" })
    }
}

const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan, userId } = req.body

    const sign = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest("hex")

    if (expectedSign === razorpay_signature) {
        await userModel.findByIdAndUpdate(userId, { plan })
        res.json({ success: true, message: "Payment verified and plan updated" })
    }
    else {
        res.status(400).json({ success: false, message: "Invalid signature" })
    }
}

export { createOrder, verifyPayment }