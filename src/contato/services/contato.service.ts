import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { ContatoDto } from '../dto/contato.dto';

@Injectable()
export class ContatoService {
  constructor(private config: ConfigService) {}

  async enviar(contato: ContatoDto): Promise<{ message: string }> {
    const transporter = nodemailer.createTransport({
      host: this.config.get<string>('MAIL_HOST'),
      port: this.config.get<number>('MAIL_PORT'),
      secure: false, // true para porta 465, false para 587
      auth: {
        user: this.config.get<string>('MAIL_USER'),
        pass: this.config.get<string>('MAIL_PASS'),
      },
    });

    try {
      await transporter.sendMail({
        from: `"Portfólio - Contato" <${this.config.get<string>('MAIL_USER')}>`,
        to: this.config.get<string>('MAIL_TO'),
        replyTo: contato.email, // ao responder o e-mail, você responde direto pro visitante
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

      return { message: 'Mensagem enviada com sucesso!' };
    } catch (error) {
      throw new HttpException(
        'Não foi possível enviar a mensagem. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}