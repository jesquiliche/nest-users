import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
  } from "@nestjs/common";
  import { RegisterUserDto } from "./dto/register-user.dto";
  
  import { JwtService } from "@nestjs/jwt";
  import * as bcryptjs from "bcryptjs";
  import { UsersService } from "src/users/users.service";
  import { LoginDto } from "./dto/login-user.dto";
  
  @Injectable()
  export class AuthService {
    constructor(private readonly usersService: UsersService,
        private readonly jwtService: JwtService,) {}
  
    async register(registerUserDto: RegisterUserDto) {
      const user = await this.usersService.create(registerUserDto);
  
      return {
        message: "User created successfully",
      };
    }
  
    async login({ email, password }: LoginDto) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
          throw new UnauthorizedException('Email invalido');
        }
        console.log(user)
        console.log(email,password)
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
          throw new UnauthorizedException('Credenciales no validas');
        }
    
        const payload = { email: user.email, id: user.id };
        const token = await this.jwtService.signAsync(payload);
    
        return {
          token,
          email,
        };
      }
      
    
  }
  