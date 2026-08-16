import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Projetos } from '../entities/projetos.entity';
import { ProjetosService } from '../services/projetos.service';
import { Param, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CloudinaryService } from '../../upload/cloudinary/services/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import 'multer';
import { FindProjetosQueryDto } from '../dto/find-projetos-query.dto';

@ApiTags('Projetos')
@Controller('/projetos')
@ApiBearerAuth()
export class ProjetosController {
  constructor(private readonly projetosService: ProjetosService, private readonly cloudinaryService: CloudinaryService) {}

  //paginação
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: FindProjetosQueryDto) {
    return await this.projetosService.findAllPaginated(query);
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

  @Post(':id/imagem')
  @ApiConsumes('multipart/form-data')
  @ApiBody({                          // 2. Cria o campo no formulário do Swagger
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file')) // 'file' é o nome do campo que o frontend vai enviar
  async uploadProjectImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado.');
    }
    // 1. Envia para o Cloudinary
    const result = await this.cloudinaryService.uploadFile(file);
    
    // 2. A URL pública da imagem fica no result.secure_url
    const imageUrl = result.secure_url;
    // 3. Atualiza o projeto no banco de dados
    return this.projetosService.addImageToProject(id, imageUrl);
  }


  @Post(':id/video')
  @ApiConsumes('multipart/form-data')
  @ApiBody({                          // 2. Cria o campo no formulário do Swagger
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file')) // 'file' é o nome do campo que o frontend vai enviar
  async uploadProjectVideo(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado.');
    }
    // 1. Envia para o Cloudinary
    const result = await this.cloudinaryService.uploadFile(file);
    
    // 2. A URL pública do vídeo fica no result.secure_url
    const videoUrl = result.secure_url;
    // 3. Atualiza o projeto no banco de dados
    return this.projetosService.addVideoToProject(id, videoUrl);
  }

}