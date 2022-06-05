import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';


@Schema()
export class Product extends Document {
    @Prop({ type: String })
    productCategory: string;

    @Prop({ type: String })
    id: string;

    @Prop({ type: String })
    productName: string;

    @Prop({ type: String })
    productType: string;

    @Prop({ type: String })
    productPrice: string;

    @Prop({ type: String })
    productFields: string;

    @Prop({  type: String})
    sellerId: any;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product).set('toJSON',{
    transform:function(doc,ret){
        delete ret._id;
        delete ret.__v;
        delete ret.sellerId;
    }
});
