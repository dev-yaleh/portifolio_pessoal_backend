import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categorias.entity';
import { CategoriaService } from './services/categorias.service';
import { CategoriaController } from './controllers/categorias.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria]), AuthModule],
  providers: [CategoriaService],
  controllers: [CategoriaController],
  exports: [CategoriaService], // exporta para que o ProjetosModule possa usar se precisar
})
export class CategoriaModule {}