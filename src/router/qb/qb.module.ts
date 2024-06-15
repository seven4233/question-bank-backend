import { Module } from '@nestjs/common';
import { QbService } from './qb.service';
import { QbController } from './qb.controller';
import { qbProviders } from "./qb.providers";
import { DatabaseModule } from "../../db/database.module";

@Module({
  imports:[DatabaseModule],
  controllers: [QbController],
  providers: [QbService, ...qbProviders],
})
export class QbModule {}
