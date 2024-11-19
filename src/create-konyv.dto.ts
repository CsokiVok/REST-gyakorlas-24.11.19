import {IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateKonyvDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  isbn: string;
  
  @IsInt()
  @Min(2000)
  publishYear: number;

}

