import { IsNotEmpty, IsString } from "class-validator";

export class CreateStudyMemoDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  goal!: string;

  @IsString()
  @IsNotEmpty()
  decision!: string;

  @IsString()
  @IsNotEmpty()
  notes!: string;
}
