/**
 *
 * Author: Jenish Girish Patel
 * Banner ID: B00897765
 * Email: jenish.patel@dal.ca
 */
import { IsAuthGuard } from './../is-auth.guard';
import { AuthRequest } from './../types/AuthRequest';
import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';

@Controller('payment')
@ApiTags('Payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create() {
    return this.paymentService.create();
  }

  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @Post('/success/:id')
  success(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.paymentService.success(id, req.user);
  }
}
