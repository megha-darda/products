import { Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../model/product.schema';
import * as mongodb from 'mongodb'

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

  async getallProduct() {
    const product :Product[]= await this.productModel.find().exec();
    return product;
  }

  async getProductName(name) {
    const product :Product[]= await this.productModel.find({productName:{ $eq: name }}).exec();
    return product;
  }

  async getProductType(type) {
    const product :Product[]= await this.productModel.find({productType:{ $eq: type }}).exec();
    return product;
  }

  async getProductCategory(category) {
    const product :Product[]= await this.productModel.find({productCategory      :{ $eq: category }}).exec();
    return product;
  }

  async getProductBySellor(sellerId) {
    const product :Product[]= await this.productModel.find({sellerId:{ $eq: sellerId }}).exec();
    return product;
  }

  async getProductRange(min,max) {
    const product :Product[]= await this.productModel.find({productPrice:{ $gte: min,$lte:max }}).exec();
    return product;
  }


  async updateProduct(id,updatePayload,sellerId) {
    const newDate = new Date();
    newDate.toUTCString();

    const updateData:Product = {
      ...updatePayload,
        updatedAt: newDate,
    };
    const product = await this.productModel
    .findOneAndUpdate({ id: id ,sellerId:sellerId}, updateData, {
        new: true,
    })
    .exec();
    if (!product) {
      throw new NotFoundException('Product not found');
  }
    return product;
  }

  async createProduct(payload,sellerId) {
    payload['id']=new mongodb.ObjectId().toString()
    payload['sellerId']=sellerId;
    let product = new this.productModel(payload);
  try {
      product = await product.save();
  } catch (error) {
      throw new InternalServerErrorException(error);
  }

  return product;
  }

  async deleteProduct(id) {
  
  const result=await this.productModel.findOneAndDelete({id:id}).exec();
  if(!result){
    throw new NotAcceptableException("Product does not exist");
  }
  return result;
  }
}
