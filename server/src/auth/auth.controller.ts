import { PasswordReset } from './../template/passwordReset';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import sgMail from 'src/config/SendGrid';
import { welcomeMailTemplate } from 'src/config/WelcomeMailTemplate';
import { User } from './../users/entities/user.entity';
import { AuthService } from './auth.service';
import {
  generateTokens,
  serializeUser,
  generatePasswordResetLink,
} from './auth.utility';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { ResetDTO } from './dto/reset.dto';

export type AuthResponse = Promise<{
  user: User;
  accessToken: string;
  refreshToken: string;
}>;

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDTO: LoginDTO): AuthResponse {
    const user = await this.authService.login(loginDTO);
    const tokens = generateTokens(user);

    return {
      user: serializeUser(user),
      ...tokens,
    };
  }

  @Post('accessToken')
  async accessToken(@Body() data: { access_token: string }): AuthResponse {
    const user = await this.authService.accessTokenVerify(data);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const tokens = generateTokens(user);

    return {
      user: serializeUser(user),
      ...tokens,
    };
  }

  @Get('/reset-password/:email')
  async resetPassword(@Param('email') email: string): Promise<boolean> {
    const token = generatePasswordResetLink(email);
    sgMail
      .send({
        to: email,
        from: 'ferinpatel79@gmail.com',
        subject: 'Reset Password | StepToLearn',
        html: PasswordReset(
          `https://group-18.netlify.app/reset-password/${token}`,
        ),
      })
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });
    return true;
  }

  @Post('/reset-password')
  async setPassword(@Body() resetDTO: ResetDTO): Promise<boolean> {
    this.authService.resetPassword(resetDTO);
    return true;
  }

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO): AuthResponse {
    const user = await this.authService.register(registerDTO);
    const tokens = generateTokens(user);

    sgMail
      .send({
        to: user.email,
        from: 'ferinpatel79@gmail.com',
        subject: 'Welcome to StepToLearn',
        html: welcomeMailTemplate,
      })
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });

    return {
      user: serializeUser(user),
      ...tokens,
    };
  }
}
