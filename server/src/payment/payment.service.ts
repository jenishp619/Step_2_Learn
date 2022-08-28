/**
 *
 * Author: Jenish Girish Patel
 * Banner ID: B00897765
 * Email: jenish.patel@dal.ca
 */
import { User } from './../users/entities/user.entity';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import stripe from 'src/config/Stripe';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create() {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: '1 Year Subscription',
              },
              unit_amount: 2499,
            },
            quantity: 1,
          },
        ],
        // success_url: 'http://localhost:3000/payment/success',
        // cancel_url: 'http://localhost:3000/payment/cancel',
        success_url: 'https://group-18.netlify.app/payment/success',
        cancel_url: 'https://group-18.netlify.app/payment/cancel',
      });

      return { url: session.url, id: session.id };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async success(id: string, user: User) {
    const session = await stripe.checkout.sessions.retrieve(id);
    if (session.status === 'complete') {
      user.isPaidUser = true;
      return this.userRepo.save(user);
    } else {
      throw new BadRequestException('payment status is not completed');
    }
  }
}
