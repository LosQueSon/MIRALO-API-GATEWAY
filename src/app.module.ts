import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtMiddleware } from './auth/jwt.middleware';
import { AuthProxyMiddleware, RoomsProxyMiddleware } from './proxy/proxy.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Rutas públicas de auth: NO piden JWT
    consumer
      .apply(AuthProxyMiddleware)
      .forRoutes(
        { path: 'auth/google', method: RequestMethod.ALL },
        { path: 'auth/google/callback', method: RequestMethod.ALL },
      );

    // Rutas protegidas de auth: SÍ piden JWT
    consumer
      .apply(JwtMiddleware, AuthProxyMiddleware)
      .forRoutes(
        { path: 'auth/me', method: RequestMethod.ALL },
      );

    // Rooms protegidas
    consumer
    consumer
      .apply(JwtMiddleware, RoomsProxyMiddleware)
      .forRoutes({ path: 'rooms', method: RequestMethod.ALL });
  }
}
