import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from './modules/db/index.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
  ],
})
export class AppModule {}
