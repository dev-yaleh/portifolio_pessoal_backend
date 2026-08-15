import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_mensagens' })
export class Mensagem {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 150, nullable: false })
  nome: string;

  @ApiProperty()
  @Column({ length: 150, nullable: false })
  email: string;

  @ApiProperty()
  @Column({ length: 2000, nullable: false })
  mensagem: string;

  @ApiProperty()
  @Column({ default: false })
  lida: boolean;

  @ApiProperty()
  @Column({ type: 'boolean', default: false })
  emailEnviado: boolean;

  @ApiProperty()
  @CreateDateColumn({ name: 'data_criacao' })
  createdAt: Date;
}