

import mongoose from 'mongoose'

const cartSchema = mongoose.Schema(
	{
		cart: [{ type: Object, required: true }],
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		}
	},
	{
		timestamps: true,
	}
)

const Cart = mongoose.model('Cart', cartSchema)

export default Cart