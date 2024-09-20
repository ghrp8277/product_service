import { InvalidPointAmountException } from '@/exceptions';
import { PrismaService } from '@/prisma/prisma.service';
import { PurchasePointsRequest } from '@/requests/purchase-points.request';
import { getAllowedAmounts } from '@/utils/points.util';
import { Injectable } from '@nestjs/common';
import { TransactionType } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  private validateAmount(amount: number) {
    const allowedAmounts = getAllowedAmounts();
    if (!allowedAmounts.includes(amount)) {
      throw new InvalidPointAmountException();
    }
  }

  async getAllPoints() {
    const points = await this.prisma.point.findMany();
    return { points };
  }

  private async recordPurchaseTransaction(userId: number, amount: number) {
    return await this.prisma.pointTransaction.create({
      data: {
        userId,
        amount,
        type: TransactionType.PURCHASE,
        description: `User ${userId} purchased ${amount} points.`,
      },
    });
  }

  async purchasePoints(data: PurchasePointsRequest) {
    this.validateAmount(data.amount);
    const transaction = await this.recordPurchaseTransaction(data.userId, data.amount);
    return { amount: transaction.amount };
  }
}
