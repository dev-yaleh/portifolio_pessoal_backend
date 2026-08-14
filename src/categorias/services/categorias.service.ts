import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Categoria } from '../entities/categorias.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      relations: { projetos: true }, // traz os projetos junto
    });
  }

  async findById(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
      relations: { projetos: true },
    });

    if (!categoria)
      throw new HttpException(
        `Categoria com id ${id} não encontrada`,
        HttpStatus.NOT_FOUND,
      );

    return categoria;
  }

  async findAllByName(name: string): Promise<Categoria[]> {
    const categorias = await this.categoriaRepository.find({
      where: { name: ILike(`%${name}%`) },
      relations: { projetos: true },
    });

    if (categorias.length === 0)
      throw new HttpException(
        `Nenhuma categoria encontrada com o nome: ${name}`,
        HttpStatus.NOT_FOUND,
      );

    return categorias;
  }

  async create(categoria: Categoria): Promise<Categoria> {
    return await this.categoriaRepository.save(categoria);
  }

  async update(categoria: Categoria): Promise<Categoria> {
    await this.findById(categoria.id); // garante que existe antes de atualizar
    return await this.categoriaRepository.save(categoria);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id); // garante que existe antes de deletar
    await this.categoriaRepository.delete(id);
  }
}