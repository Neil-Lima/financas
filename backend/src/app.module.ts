/* eslint-disable prettier/prettier */
import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuario } from './usuarios/entities/usuarios.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Usuario],
      synchronize: true,
    }),
    UsuariosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    console.log('Database connection successful');
    console.log(`Connected to database: ${process.env.DB_NAME}`);
  }
}
