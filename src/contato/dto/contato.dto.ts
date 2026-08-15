import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class ContatoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @MaxLength(150)
  nome: string;

  @ApiProperty({ example: 'visitante@email.com' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  @IsEmail({}, { message: 'Informe um e-mail válido.' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'A mensagem é obrigatória.' })
  @MaxLength(2000)
  mensagem: string;
}