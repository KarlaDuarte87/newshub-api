import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração de CORS para produção
  const frontendUrl = process.env.FRONTEND_URL;
  const allowedOrigins = frontendUrl 
    ? [frontendUrl] 
    : (process.env.NODE_ENV === 'production' ? [] : true);

  app.enableCors({
    origin: allowedOrigins, 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Porta dinâmica para plataformas de deploy (Railway, Render, etc)
  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log(`🚀 API rodando na porta ${port}`);
  if (process.env.NODE_ENV === 'production') {
    console.log(`🌐 Frontend permitido: ${frontendUrl || 'nenhum (configurar FRONTEND_URL)'}`);
  }
}

bootstrap();
