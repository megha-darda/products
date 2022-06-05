import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiAcceptedResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Product_Schema } from '../model/productSwagger.schema';

import { User } from '../utils/user.decorator';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly appService: ProductService) {}

  @ApiOkResponse({ description: 'Success' ,type:Product_Schema })
  @ApiInternalServerErrorResponse({ description: 'Internal server error'})
  @ApiOperation({
    summary: 'Get All Product or from Seller', 
    description:'Add sellerId in Headers'
  }) 
  @Get()
  getallProduct(
    @User()sellerId
  ) {
    if(sellerId)
    {
      return this.appService.getProductBySellor(sellerId); 
    }
    return this.appService.getallProduct();  
  }


  @ApiOkResponse({ description: 'Success'  ,type:Product_Schema})
  @ApiInternalServerErrorResponse({ description: 'Internal server error'})
  @ApiOperation({
    summary: 'Get Product With Name', 
  }) 
  @Get('/productName/:name')
  getProductName(
    @Param('name')name,
  ) {
    return this.appService.getProductName(name);
  }

  @ApiOkResponse({ description: 'Success'  ,type:Product_Schema})
  @ApiInternalServerErrorResponse({ description: 'Internal server error'})
  @ApiOperation({
    summary: 'Get Product With category', 
  }) 
  @Get('/productCategory/:category')
  getProductCategory(
    @Param('category')category,
  ) {
    return this.appService.getProductCategory(category);
  }

  @ApiOkResponse({ description: 'Success'  ,type:Product_Schema})
  @ApiInternalServerErrorResponse({ description: 'Internal server error'})
  @ApiOperation({
    summary: 'Get Product With Type', 
  }) 
  @Get('/productType/:type')
  getProductType(
    @Param('type')type,
  ) {
    return this.appService.getProductType(type);
  }

  @ApiOkResponse({ description: 'Success' ,type:Product_Schema})
  @ApiInternalServerErrorResponse({ description: 'Internal server error'})
  @ApiOperation({
    summary: 'Get Product From Given Price Range', 
  }) 
  @ApiQuery({name:'maxPrice',required:true})
  @ApiQuery({name:'minPrice',required:true})
  @Get('/productPrice')
  getProductRange(
    @Query('maxPrice')max,
    @Query('minPrice')min,
  ) {
    return this.appService.getProductRange(min,max);
  }

  @ApiCreatedResponse({ description: 'Created'  ,type:Product_Schema})
  @ApiInternalServerErrorResponse({ description: 'Internal server error'})
  @ApiOperation({
    summary: 'Creates A Product only by seller', 
    description:'Add sellerId in Headers'
  }) 
  @Post()
  createProduct(
    @Body() payload,
    @User()sellerId
  ) {
    if(!sellerId)
    {
      throw new InternalServerErrorException("Customer cant create products");
    }
    return this.appService.createProduct(payload,sellerId);
  }
  
  @ApiAcceptedResponse({ description: 'Updated' ,type:Product_Schema })
  @ApiInternalServerErrorResponse({ description: 'Internal server error'})
  @ApiOperation({
    summary: 'Updates A Product only by seller', 
    description:'Add sellerId in Headers'
  }) 
  @Patch(':id')
  updateProduct(
    @Param('id')id,
    @Body() payload,
    @User()sellerId
  ) {
    if(!sellerId)
    {
      throw new InternalServerErrorException("Customer cant update products");
    }
    return this.appService.updateProduct(id,payload,sellerId);
  }

  @ApiOkResponse({ description: 'Deleted' ,type:Product_Schema })
  @ApiInternalServerErrorResponse({ description: 'Internal server error'})
  @ApiOperation({
    summary: 'Deletes A Product only by seller', 
    description:'Add sellerId in Headers'
  }) 
  @Delete(':id')
  deleteProduct(
    @Param('id')id,
    @User()sellerId
  ) {
    if(!sellerId)
    {
      throw new InternalServerErrorException("Customer cant delete products");
    }
    return this.appService.deleteProduct(id);
  }
}
