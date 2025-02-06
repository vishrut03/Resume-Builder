import { IsEmail, IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateUser {
    
  @ApiProperty({ example: "user@example.com", description: "The email of the user" })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({ example: "password123", description: "The password of the user" })
  @IsNotEmpty()
  password: string
}

