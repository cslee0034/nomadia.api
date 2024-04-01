import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SignUpDto } from '../dto/request/signup.dto';
import { UsersService } from '../../users/service/users.service';
import { AuthService } from '../service/auth.service';
import { EncryptService } from '../../encrypt/service/encrypt.service';
import { TokensResponseDto } from '../dto/response/token.dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SignInDto } from '../dto/request/signin.dto';
import { Tokens } from '../types/tokens.type';
import { Public } from '../../../common/decorator/public.decorator';
import { GetTokenUserId } from '../../../common/decorator/get-token-user-id.decorator';
import { RefreshTokenGuard } from '../../../common/guard/refresh-token-guard';
import { GetTokenUser } from '../../../common/decorator/get-token-user.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly encryptService: EncryptService,
  ) {}

  @Public()
  @Post('local/sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: TokensResponseDto })
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  async signup(@Body() signUpDto: SignUpDto) {
    const createdUser = await this.usersService.create(signUpDto);

    const tokens = await this.authService.generateTokens(
      createdUser.id,
      createdUser.email,
    );

    await this.authService.login(createdUser.id, tokens.refreshToken);

    return tokens;
  }

  @Public()
  @Post('local/sign-in')
  @ApiOkResponse({ type: TokensResponseDto })
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  @ApiInternalServerErrorResponse()
  async login(
    @Body() signInDto: SignInDto,
    @Res() res: Response,
  ): Promise<void> {
    const user = await this.usersService.findOneByEmail(signInDto.email);

    await this.encryptService.compareAndThrow(
      signInDto.password,
      user.password,
    );

    const tokens = await this.authService.generateTokens(user.id, user.email);

    await this.authService.login(user.id, tokens.refreshToken);

    await this.authService.setTokens(res, tokens);

    res.status(HttpStatus.OK).json({ success: true });

    return;
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  @ApiInternalServerErrorResponse()
  async logout(@GetTokenUserId() id: number): Promise<{ success: boolean }> {
    const success = await this.authService.logout(id);
    return { success };
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetTokenUserId() id: number,
    @GetTokenUser('email') email: string,
    @GetTokenUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    await this.authService.checkIsLoggedIn(id, refreshToken);

    const tokens = await this.authService.generateTokens(id, email);

    await this.authService.login(id, tokens.refreshToken);

    return tokens;
  }
}
