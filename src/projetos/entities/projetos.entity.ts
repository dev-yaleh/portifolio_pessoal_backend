import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Categoria } from '../../categorias/entities/categorias.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_projetos' })
export class Projetos {
  @ApiProperty()  
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 150, nullable: false })
  name: string;
  
  @ApiProperty()  
  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  description: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'json', nullable: false })
  techs: string[];

  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'json', nullable: false })
  images: string[];

  @ApiProperty()
  @Column({ type: 'json', nullable: false })
  videos: string[];

  @ApiProperty()
  @Column({ name: 'live_link', length: 500, nullable: false, default: '' })
  liveLink: string;

  @ApiProperty()
  @Column({ name: 'repo_link', length: 500, nullable: false, default: '' })
  repoLink: string;

  @ApiProperty()
  @Column({ default: false })
  featured: boolean;

  @ApiProperty()
  @Column({ default: 0 })
  order: number;

    // ← NOVO: lado ManyToOne do relacionamento
  @ApiProperty({ type: () => Categoria })
  @ManyToOne(() => Categoria, (categoria) => categoria.projetos, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  categoria: Categoria;

  @ApiProperty()
  @CreateDateColumn({ name: 'data_criacao' })
  createdAt: Date;

  @ApiProperty()  
  @UpdateDateColumn({ name: 'data_atualizacao' })
  updatedAt: Date;
}