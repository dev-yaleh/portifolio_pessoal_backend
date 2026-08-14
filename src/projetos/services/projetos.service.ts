import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, DeleteResult } from 'typeorm';
import { Projetos } from '../entities/projetos.entity';
import { HttpException, HttpStatus } from '@nestjs/common';


@Injectable()
export class ProjetosService {
  constructor(
    @InjectRepository(Projetos)
    private projetosRepository: Repository<Projetos>
  ) {}

  async findAll(): Promise<Projetos[]> {
    return await this.projetosRepository.find();
  }

  async findById(id:number): Promise<Projetos> {
    const projeto = await this.projetosRepository.findOne({ 
      where: { id } 
    });

    if (!projeto) 
      throw new HttpException('Projeto não encontrado', HttpStatus.NOT_FOUND);
    
    return projeto;
  }

  async findAllByName(name: string): Promise<Projetos[]> {
    const projetos = await this.projetosRepository.find({
      where: { name: ILike(`%${name}%`) }
    });

    if (projetos.length === 0)
      throw new HttpException('Nenhum projeto encontrado com esse nome: ${name}', HttpStatus.NOT_FOUND);

    return projetos
  }

  async create(projeto: Projetos): Promise<Projetos> {
    return await this.projetosRepository.save(projeto);
  }

  async update(projeto: Projetos): Promise<Projetos> {
    await this.findById(projeto.id);
    return await this.projetosRepository.save(projeto);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id)
    return await this.projetosRepository.delete(id)
  }

  async addImageToProject(id: number, imageUrl: string): Promise<Projetos> {
    // 1. Busca o projeto
    const projeto = await this.projetosRepository.findOne({ where: { id } });
    
    if (!projeto) {
      throw new NotFoundException('Projeto não encontrado');
    }
    // 2. Garante que o array existe e adiciona a nova URL
    const imagensAtuais = projeto.images || [];
    projeto.images = [...imagensAtuais, imageUrl];
    // 3. Salva no banco de dados e retorna o projeto atualizado
    return await this.projetosRepository.save(projeto);
  }

}