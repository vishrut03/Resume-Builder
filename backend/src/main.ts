import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
// import * as dotenv from 'dotenv';
import { AuthGuard } from "./auth/guards/auth.guard"
// dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  
  const config = new DocumentBuilder()
    .setTitle("Resume-Builder")
    .setDescription("The Resume-Builder API description")
    .setVersion("1.0")
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      name: "JWT",
      description: "Enter JWT token",
      in: "header",
    }, "JWT-auth")
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)

  await app.listen(process.env.PORT ?? 3001)
}
bootstrap()

