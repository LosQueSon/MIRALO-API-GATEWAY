import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';  // ← agrega
import { JwtMiddleware } from './auth/jwt.middleware';
import { AuthProxyMiddleware, RoomsProxyMiddleware } from './proxy/proxy.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController], 
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthProxyMiddleware)
      .forRoutes(
        { path: 'auth/google', method: RequestMethod.ALL },
        { path: 'auth/google/callback', method: RequestMethod.ALL },
      );

    consumer
      .apply(JwtMiddleware, AuthProxyMiddleware)
      .forRoutes(
        { path: 'auth/me', method: RequestMethod.ALL },
      );

    consumer
      .apply(JwtMiddleware, RoomsProxyMiddleware)
      .forRoutes({ path: 'rooms', method: RequestMethod.ALL });
  }
}