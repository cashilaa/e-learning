import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('src/certificates/key.pem'), // Adjust path as needed
    cert: fs.readFileSync('src/certificates/cert.pem'), // Adjust path as needed
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });
  await app.listen(3000); // Use HTTPS on port 5173
}
bootstrap();
