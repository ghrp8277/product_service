import { Controller } from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { GrpcMethod } from '@nestjs/microservices';
import { PurchasePointsRequest } from '@/requests/purchase-points.request';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @GrpcMethod('ProductService', 'healthCheck')
  healthCheck() {
    return { status: 'OK' };
  }

  @GrpcMethod('ProductService', 'getAllPoints')
  async getAllPoints() {
    const result = await this.productsService.getAllPoints();
    return { result: JSON.stringify(result) };
  }

  @GrpcMethod('ProductService', 'purchasePoints')
  async purchasePoints(data: PurchasePointsRequest) {
    const result = await this.productsService.purchasePoints(data);
    return { result: JSON.stringify(result) };
  }
}
