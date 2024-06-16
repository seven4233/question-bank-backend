import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QbModule } from "./router/qb/qb.module";
import { UserModule } from "./router/user/user.module";
import { AuthMiddle } from "./middleware/auth.middleware";

@Module({
  imports: [QbModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddle)
      .exclude('/pb/bank', '/user/login',
       )
      .forRoutes( 'user', )
  }
}


