import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { LoginDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

interface RequestWithUser extends Request {
    user: {
      email: string;
      role: string;
    };
  }

@ApiTags('auth')
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({
    summary: 'Registra un nuevo usuario en la base de datos.',
    description: 'Registra un nuevo usuario en la base de datos.',
  })
  @ApiResponse({ status: 201, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  @ApiResponse({ status: 409, description: 'El email ya esta en uso' })
  register(@Body() registerDto: RegisterUserDto) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  @ApiOperation({
    summary: 'Devuelve el JWT de autorización si el usuario esta autorizado.',
    description: 'Devuelve el JWT de autorización si el usuario esta autorizado.',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
