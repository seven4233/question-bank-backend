import { Module } from '@nestjs/common';
import { QbService } from './qb.service';
import { QbController } from './qb.controller';
import { qbProviders } from "./qb.providers";
import { DatabaseModule } from "../../db/database.module";
import { UserModule } from "../user/user.module";
import { userProviders } from "../user/user.providers";

@Module({
  imports:[DatabaseModule, UserModule],
  controllers: [QbController],
  providers: [QbService, ...qbProviders, ...userProviders],
})
export class QbModule {}
