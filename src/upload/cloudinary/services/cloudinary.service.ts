import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
// O streamifier transforma o buffer (arquivo na memória) em um fluxo de dados legível
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  uploadFile(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'portfolio', resource_type: 'auto' }, // Opcional: cria uma pasta no Cloudinary para organizar
        (error, result) => {
          if (error) return reject(error);

          if (result) {
          resolve(result);
          } else {
            reject(new Error('Erro desconhecido: O Cloudinary não retornou o resultado do upload'));
          }
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}