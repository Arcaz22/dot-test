import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class ContentRequest {
    @ApiProperty({ example: 'This Title' })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(255)
    title: string;

    @ApiProperty({ example: 'This is the body of the post' })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    body: string;

    @ApiProperty({ example: 1 })
    @IsInt()
    @IsNotEmpty()
    userId: number;
}
