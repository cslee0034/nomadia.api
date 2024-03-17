import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import { createMock } from '@golevelup/ts-jest';
import { MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { WinstonModule } from 'nest-winston';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';
import { PrismaService } from './config/orm/prisma.service';

describe('AppModule', () => {
  let appModule: AppModule;
  let configModule: ConfigModule;
  let httpModule: HttpModule;
  let winstonModule: WinstonModule;
  let jwtModule: JwtModule;
  let cacheModule: CacheModule;

  let prismaService: PrismaService;

  const middlewareConsumer = createMock<MiddlewareConsumer>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    appModule = module.get<AppModule>(AppModule);
    configModule = module.get<ConfigModule>(ConfigModule);
    httpModule = module.get<HttpModule>(HttpModule);
    winstonModule = module.get<any>(WinstonModule);
    jwtModule = module.get<any>(JwtModule);
    cacheModule = module.get<CacheModule>(CacheModule);

    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should import AppModule', async () => {
    expect(appModule).toBeDefined();
  });

  it('should import config module', () => {
    expect(configModule).toBeDefined();
  });

  it('should import http module', () => {
    expect(httpModule).toBeDefined();
  });

  it('should import winston module', () => {
    expect(winstonModule).toBeDefined();
  });

  it('should import jwt module', () => {
    expect(jwtModule).toBeDefined();
  });

  it('should import jwt module', () => {
    expect(cacheModule).toBeDefined();
  });

  it('should provide prisma service', () => {
    expect(prismaService).toBeDefined();
  });

  it('should configure the middleware', () => {
    const app = new AppModule();
    app.configure(middlewareConsumer);
    expect(middlewareConsumer.apply).toHaveBeenCalledWith(LoggerMiddleware);
  });
});
