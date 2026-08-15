import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { ContatoDto } from '../dto/contato.dto';
import { Mensagem } from '../entities/mensagem.entity';

@Injectable()
export class ContatoService {
  constructor(
    private config: ConfigService,
    @InjectRepository(Mensagem) private mensagemRepository: Repository<Mensagem>,
  ) {}

  async enviar(contato: ContatoDto): Promise<{ message: string }> {
    // 1. Salva a mensagem no banco PRIMEIRO — garante que nada se perde,
    //    mesmo que o envio de e-mail falhe na sequência
    const mensagemSalva = await this.mensagemRepository.save({
      nome: contato.nome,
      email: contato.email,
      mensagem: contato.mensagem,
      emailEnviado: false,
    });

    const transporter = nodemailer.createTransport({
      host: this.config.get<string>('MAIL_HOST'),
      port: this.config.get<number>('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.config.get<string>('MAIL_USER'),
        pass: this.config.get<string>('MAIL_PASS'),
      },
    });

    try {
      await transporter.sendMail({
        from: `"Portfólio - Contato" <${this.config.get<string>('MAIL_USER')}>`,
        to: this.config.get<string>('MAIL_TO'),
        replyTo: contato.email,
        subject: `Novo contato de ${contato.nome} pelo portfólio`,
        text: contato.mensagem,
        html: `
          <h3>Nova mensagem pelo portfólio</h3>
          <p><strong>Nome:</strong> ${contato.nome}</p>
          <p><strong>E-mail:</strong> ${contato.email}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${contato.mensagem.replace(/\n/g, '<br>')}</p>
        `,
      });

      // 2. Se o envio deu certo, atualiza a flag
      mensagemSalva.emailEnviado = true;
      await this.mensagemRepository.save(mensagemSalva);

      return { message: 'Mensagem enviada com sucesso!' };
    } catch (error) {
      // Mesmo se o e-mail falhar, a mensagem já está salva no banco — nada se perde
      return {
        message: 'Sua mensagem foi recebida! (Pode haver atraso na notificação por e-mail)',
      };
    }
  }

  // Endpoints administrativos, para você consultar depois
  async findAll(): Promise<Mensagem[]> {
    return await this.mensagemRepository.find({ order: { createdAt: 'DESC' } });
  }

  async marcarComoLida(id: number): Promise<Mensagem> {
  await this.mensagemRepository.update(id, { lida: true });

  const mensagem = await this.mensagemRepository.findOne({
    where: { id },
  });

  if (!mensagem) {
    throw new NotFoundException(`Mensagem com ID ${id} não encontrada.`);
  }

  return mensagem;
}
}