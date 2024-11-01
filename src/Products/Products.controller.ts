import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  UsePipes,
  UseGuards,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './Products.service';
import { CloudinaryService } from '../common/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinSizeValidatorPipe } from '../common/minSizeValidator.pipes';
import { AuthGuard } from '../Auth/guards/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../role.enum';
import { RolesGuard } from '../Auth/guards/roles.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductDto } from './productDto/products.dto';
import { UpdateProductDto } from './productDto/updateProducts.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @HttpCode(201)
  @Post('/files/uploadImage/:id')
  @ApiOperation({
    summary: 'Upload the image of a product found by Id.',
    description:
      'Expects the product Id and the image to upload. Returns the modified Product object.',
  })
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(MinSizeValidatorPipe)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      required: ['image'],
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          default: null,
        },
      },
    },
  })
  async uploadProductImg(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|gif|webp|svg)/,
          }),
          new MaxFileSizeValidator({
            maxSize: 100000,
            message: 'Arcivo supera los 100kb',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const cloudObj = await this.cloudinaryService.uploadImage(file);
    const imgUrl = cloudObj.secure_url;
    console.log(imgUrl);
    return this.productsService.uploadProductImg(imgUrl, id);
  }

  @HttpCode(200)
  @Get()
  @ApiOperation({
    summary: 'Get all products',
    description:
      'Doesn`t expect any parameters. Returns an array of Product objects.',
  })
  @ApiBearerAuth()
  //@UseGuards(AuthGuard)
  @ApiQuery({ name: 'page', description: 'Página a mostrar', required: false })
  @ApiQuery({
    name: 'limit',
    description: 'Límite de resultados por página',
    required: false,
  })
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    const pageNumber = page ? Number(page) : 1;
    const limitNumber = limit ? Number(limit) : 20;
    return this.productsService.getProducts(pageNumber, limitNumber);
  }

  @HttpCode(200)
  @Get(':id')
  @ApiOperation({
    summary: 'Get a single product by Id',
    description:
      'Expects an UUID through Params. Returns a single Product object.',
  })
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    if (!id) throw new BadRequestException('Faltan datos');
    return this.productsService.getProduct(id);
  }

  @HttpCode(201)
  @Post()
  @ApiOperation({
    summary: 'Creates a new product',
    description:
      'Expects the name, description, price, stock, category name and optional image through the Body. Returns the created Product object.',
  })
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  addProduct(@Body() product: CreateProductDto) {
    if (!product || Object.keys(product).length === 0)
      throw new BadRequestException('Faltan datos');
    const { categoryName, ...productToSave } = product;
    return this.productsService.addProduct(productToSave, categoryName);
  }

  @HttpCode(200)
  @Put(':id')
  @ApiOperation({
    summary: 'Updates a product´s properties.',
    description:
      'Expects the UUID of the product to modify through Params and the properties to change through the Body. Returns the modified Product object.',
  })
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: UpdateProductDto,
  ) {
    if (!product || !id || Object.keys(product).length === 0)
      throw new BadRequestException('Faltan datos');
    return this.productsService.updateProduct(id, product);
  }

  @HttpCode(200)
  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes a Product.',
    description:
      'Expects the UUID of the Product to delete through Params. Returns a succes or failure message.',
  })
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }

  /*   
  @HttpCode(200)
  @Get('seeder')
  @ApiOperation({
    summary: 'Seed Products',
    description:
      'Doesn´t expect any parameters. Returns a success message, an error message or an already seeded message.',
  })
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  addProducts() {
    return this.productsService.addProducts();
  }
  
@HttpCode(200)
  @Delete('seeder')
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteSeeder() {
    return this.productsService.deleteSeeder();
  } */
}
