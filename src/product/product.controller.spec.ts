import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let productController: ProductController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ ProductService],
    }).compile();

    productController = app.get<ProductController>(ProductController);
  });

  it('to de defined',() => {
          expect(productController).toBeDefined();
        });
});
