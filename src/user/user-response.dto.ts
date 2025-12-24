import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'John Wick' })
  name: string;

  @ApiProperty({ example: 'johnwick' })
  username: string;

  @ApiProperty({ example: 'johnwick@example.com' })
  email: string;
}
