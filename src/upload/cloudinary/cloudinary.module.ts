import { CloudinaryService } from './services/cloudinary.service';
import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './providers/cloudinary.provider';

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService], // Exportamos para usar no módulo de projetos
})
export class CloudinaryModule {}