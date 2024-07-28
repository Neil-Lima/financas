/* eslint-disable prettier/prettier */
// src/estoque/estoque.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EstoqueService } from './estoque.service';
import { EstoqueController } from './estoque.controller';
import { Estoque, EstoqueSchema } from './entities/estoque.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Estoque.name, schema: EstoqueSchema }])],
  controllers: [EstoqueController],
  providers: [EstoqueService],
})
export class EstoqueModule {}
