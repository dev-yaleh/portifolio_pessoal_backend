import { ApiProperty } from "@nestjs/swagger";

export class AdminLogin {
  @ApiProperty()
  public username: string;
  @ApiProperty()
  public password: string;
}