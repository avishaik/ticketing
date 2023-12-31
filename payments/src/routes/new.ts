import { BadRequestError, NotAuthorizedError, NotFoundError, OrderStatus, requireAuth, validateRequest } from '@avishaitickets/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher';
import { Order } from '../models/order';
import { Payment } from '../models/payments';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post('/api/payments', 
requireAuth,
[
    body('token')
    .not()
    .isEmpty(),
    body('orderId')
    .not()
    .isEmpty()
] ,
validateRequest,
    async (req: Request, res: Response) => {
        const { token, orderId } = req.body;

        const order = await Order.findById(orderId);

        if (!order) {
            throw new NotFoundError();
        }

        if (order.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }
        if (order.status === OrderStatus.Cancelled) {
            throw new BadRequestError('Cannot pay for an cancelled order');
        }

        //API to create payment (in course using Stripe)
        // const charge = await stripe.charges.create({
        //     currency: 'usd',
        //     amount: order.price * 100,
        //     source: token,
        //   });

        const payment = Payment.build({
            orderId,
            stripeId: ""
        });
        await payment.save();
        new PaymentCreatedPublisher(natsWrapper.client).publish({
            id: payment.id,
            orderId: payment.orderId,
            stripeId: payment.stripeId
        });

        res.status(201).send({ id: payment.id });
});

export { router as createChargeRouter };

