import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Categoria } from '../entities/categorias.entity';
import { CategoriaService } from '../services/categorias.service';
import { JwtAuthGuard } from './../../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Categoria')
@Controller('/categorias')
@ApiBearerAuth()
export class CategoriaController {
  constructor(private categoriaService: CategoriaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Categoria[]> {
    return await this.categoriaService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
    return await this.categoriaService.findById(id);
  }

  @Get('/name/:name')
  @HttpCode(HttpStatus.OK)
  async findAllByName(@Param('name') name: string): Promise<Categoria[]> {
    return await this.categoriaService.findAllByName(name);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() categoria: Categoria): Promise<Categoria> {
    return await this.categoriaService.create(categoria);
  }
  
  @UseGuards(JwtAuthGuard)
  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() categoria: Categoria): Promise<Categoria> {
    return await this.categoriaService.update(categoria);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.categoriaService.delete(id);
  }
}