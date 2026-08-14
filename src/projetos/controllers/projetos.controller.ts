import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, UseGuards } from '@nestjs/common';
import { Projetos } from '../entities/projetos.entity';
import { ProjetosService } from '../services/projetos.service';
import { Param, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Projetos')
@Controller('/projetos')
@ApiBearerAuth()
export class ProjetosController {
  constructor(private readonly projetosService: ProjetosService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Projetos[]> {
    return this.projetosService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Projetos> {
    return await this.projetosService.findById(id);
  }

  @Get('/name/:name')
  @HttpCode(HttpStatus.OK)
  async findAllByName(@Param('name') name: string): Promise<Projetos[]> {
    return await this.projetosService.findAllByName(name);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() projeto: Projetos): Promise<Projetos> {
    return await this.projetosService.create(projeto);
  }
  
  @UseGuards(JwtAuthGuard)
  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() projeto: Projetos): Promise<Projetos> {
    return await this.projetosService.update(projeto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number){
    return await this.projetosService.delete(id);
  }

}