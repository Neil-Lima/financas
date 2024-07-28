// src/metas/metas.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MetasService } from './metas.service';
import { MetasController } from './metas.controller';
import { Meta, MetaSchema } from './entities/meta.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Meta.name, schema: MetaSchema }])],
  controllers: [MetasController],
  providers: [MetasService],
})
export class MetasModule {}
