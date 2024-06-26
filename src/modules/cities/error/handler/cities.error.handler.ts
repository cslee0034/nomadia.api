import { Inject, InternalServerErrorException } from '@nestjs/common';
import { CommonErrorHandler } from '../../../../common/error/handler/common.error.handler';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { CITIES_ERROR } from '../constant/cities.error';

export class CitiesErrorHandler extends CommonErrorHandler {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
  ) {
    super(logger);
  }

  public create({ error, inputs }: { error: Error; inputs: any }): void {
    super.logInputs(inputs);
    super.handleThrownError(error);
    throw new InternalServerErrorException(CITIES_ERROR.FAILED_TO_CREATE_CITY);
  }

  public findMany({ error, inputs }: { error: Error; inputs: any }): void {
    super.logInputs(inputs);
    super.handleThrownError(error);
    throw new InternalServerErrorException(CITIES_ERROR.FAILED_TO_FIND_CITY);
  }

  public update({ error, inputs }: { error: Error; inputs: any }): void {
    super.logInputs(inputs);
    super.handleThrownError(error);
    throw new InternalServerErrorException(CITIES_ERROR.FAILED_TO_UPDATE_CITY);
  }

  public delete({ error, inputs }: { error: Error; inputs: any }): void {
    super.logInputs(inputs);
    super.handleThrownError(error);
    throw new InternalServerErrorException(CITIES_ERROR.FAILED_TO_DELETE_CITY);
  }

  public createScore({ error, inputs }: { error: Error; inputs: any }): void {
    super.logInputs(inputs);
    super.handleThrownError(error);
    throw new InternalServerErrorException(CITIES_ERROR.FAILED_TO_SCORE_CITY);
  }
}
