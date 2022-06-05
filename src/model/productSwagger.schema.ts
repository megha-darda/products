import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class Product_Schema {
    @ApiProperty()
    @ApiPropertyOptional()
    productFields?: string;

    @ApiProperty()
    productCategory: string;

    @ApiProperty()
    id: string;

    @ApiProperty()
    productName: string;

    @ApiProperty()
    productType: string;

    @ApiProperty()
    productPrice: string;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    createdAt: Date;
}


function IsOptional() {
    throw new Error('Function not implemented.');
}

