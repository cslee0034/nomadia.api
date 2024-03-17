import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import { createMock } from '@golevelup/ts-jest';
import { MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { WinstonModule } from 'nest-winston';
import { HttpModule } from '@nestjs/axios';

describe('AppModule', () => {
  let appModule: AppModule;
  let configModule: ConfigModule;
  let httpModule: HttpModule;
  let winstonModule = WinstonModule;

  const middlewareConsumer = createMock<MiddlewareConsumer>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    appModule = module.get<AppModule>(AppModule);
    configModule = module.get<ConfigModule>(ConfigModule);
    httpModule = module.get<HttpModule>(HttpModule);
    winstonModule = module.get<any>(WinstonModule);
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

  it('should configure the middleware', () => {
    const app = new AppModule();
    app.configure(middlewareConsumer);
    expect(middlewareConsumer.apply).toHaveBeenCalledWith(LoggerMiddleware);
  });
});
