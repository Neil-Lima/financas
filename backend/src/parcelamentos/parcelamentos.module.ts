// src/parcelamentos/parcelamentos.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParcelamentosService } from './parcelamentos.service';
import { ParcelamentosController } from './parcelamentos.controller';
import { Parcelamento, ParcelamentoSchema } from './entities/parcelamento.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Parcelamento.name, schema: ParcelamentoSchema }])],
  controllers: [ParcelamentosController],
  providers: [ParcelamentosService],
})
export class ParcelamentosModule {}
