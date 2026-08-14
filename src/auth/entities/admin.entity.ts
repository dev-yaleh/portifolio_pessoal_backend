import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tb_admins' })
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true, nullable: false })
  username: string;

  @Column({ name: 'password_hash', length: 255, nullable: false })
  passwordHash: string;

  @CreateDateColumn({ name: 'data_criacao' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'data_atualizacao' })
  updatedAt: Date;
}