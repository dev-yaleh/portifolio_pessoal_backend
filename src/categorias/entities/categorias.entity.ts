import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Projetos } from '../../projetos/entities/projetos.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_categorias' })
export class Categoria {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 100, nullable: false })
  name: string;

  @ApiProperty()
  @Column({ length: 500, nullable: true, default: '' })
  description: string;

  @ApiProperty({ type: () => [Projetos] })  
  @OneToMany(() => Projetos, (projeto) => projeto.categoria)
  projetos: Projetos[];

  @ApiProperty()
  @CreateDateColumn({ name: 'data_criacao' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'data_atualizacao' })
  updatedAt: Date;
}