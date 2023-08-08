import { ConflictException,NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcryptjs from "bcryptjs";

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, ...rest } = createUserDto;

    // Verificar si ya existe un usuario con el mismo email
    const existingUser = await this.usersRepository.findOne({ where: { email } });

    if (existingUser) {
      throw new ConflictException('El email ya está en uso');
    }

    // Encripta el password utilizando bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcryptjs.hash(password, saltRounds);

    // Crea el nuevo usuario con el password encriptado
    const user = this.usersRepository.create({
      ...rest,
      email,
      password: hashedPassword,
    });

    // Guarda el usuario en la base de datos
    await this.usersRepository.save(user);
    return {
      ...rest,
      email
    }
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  async update(id: number, updateUseuDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return await this.usersRepository.update(id, updateUseuDto);
  }

  async remove(id: number) {
    // Verificar si el usuario existe antes de intentar eliminarlo
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Eliminar el usuario
    return await this.usersRepository.delete(id);
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

}

