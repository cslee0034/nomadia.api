import { Inject, InternalServerErrorException } from '@nestjs/common';
import { ThrownErrorHandler } from '../../../../common/error/handler/thrown.error.handler';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { USERS_ERROR } from '../constant/users.error.constant';

export class UsersErrorHandler extends ThrownErrorHandler {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
  ) {
    super(logger);
  }

  public createLocal = ({
    error,
    inputs,
  }: {
    error: Error;
    inputs: any;
  }): void => {
    inputs.password = '';
    this.logInputs(inputs);
    this.handleThrownError(error);
    throw new InternalServerErrorException(USERS_ERROR.FAILED_TO_CREATE_USER);
  };

  public findOrCreateOauth = ({
    error,
    inputs,
  }: {
    error: Error;
    inputs: any;
  }): void => {
    this.logInputs(inputs);
    this.handleThrownError(error);
    throw new InternalServerErrorException(
      USERS_ERROR.FAILED_TO_FIND_OR_CREATE_OAUTH_USER,
    );
  };
}