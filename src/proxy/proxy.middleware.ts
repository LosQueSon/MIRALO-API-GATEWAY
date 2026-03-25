import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

@Injectable()
export class AuthProxyMiddleware implements NestMiddleware {
  private proxy = createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
    secure: false,
    on: {
      error: (err, req, res: any) => {
        console.error('Proxy error:', err.message);
        res.status(502).json({ message: 'Auth service unavailable' });
      },
    },
  });

  use(req: Request, res: Response, next: NextFunction) {
    this.proxy(req, res, next);
  }
}

@Injectable()
export class RoomsProxyMiddleware implements NestMiddleware {
  private proxy = createProxyMiddleware({
    target: process.env.ROOMS_SERVICE_URL,
    changeOrigin: true,
    secure: false,
    on: {
      error: (err, req, res: any) => {
        console.error('Proxy error:', err.message);
        res.status(502).json({ message: 'Rooms service unavailable' });
      },
    },
  });

  use(req: Request, res: Response, next: NextFunction) {
    this.proxy(req, res, next);
  }
}