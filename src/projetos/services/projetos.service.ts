import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, DeleteResult } from 'typeorm';
import { Projetos } from '../entities/projetos.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { FindProjetosQueryDto } from '../dto/find-projetos-query.dto';

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
    
    // Incrementa a visualização sem precisar recarregar a entidade inteira
    await this.projetosRepository.increment({ id }, 'views', 1);
    projeto.views += 1; // reflete o incremento na resposta atual, sem nova consulta

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

  async addVideoToProject(id: number, videoUrl: string): Promise<Projetos> {
    const projeto = await this.projetosRepository.findOne({ where: { id } });
    
    if (!projeto) {
      throw new NotFoundException('Projeto não encontrado');
    }

    // A única diferença é que mexemos na propriedade .videos
    const videosAtuais = projeto.videos || [];
    projeto.videos = [...videosAtuais, videoUrl];

    return await this.projetosRepository.save(projeto);
  }

  async findAllPaginated(query: FindProjetosQueryDto) {
    const { categoriaId, featured, tech, page = 1, limit = 9 } = query;

  const qb = this.projetosRepository
    .createQueryBuilder('projeto')
    .leftJoinAndSelect('projeto.categoria', 'categoria');

  if (categoriaId) {
    qb.andWhere('categoria.id = :categoriaId', { categoriaId });
  }

  if (featured !== undefined) {
    qb.andWhere('projeto.featured = :featured', { featured: featured === 'true' });
  }

  if (tech) {
    // techs é uma coluna JSON — JSON_CONTAINS verifica se o array contém o valor
    qb.andWhere('JSON_CONTAINS(projeto.techs, :tech)', {
      tech: JSON.stringify(tech),
    });
  }

  qb.orderBy('projeto.order', 'ASC')
    .addOrderBy('projeto.createdAt', 'DESC')
    .skip((page - 1) * limit)
    .take(limit);

  const [dados, total] = await qb.getManyAndCount();

  return {
    dados,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}
  

}