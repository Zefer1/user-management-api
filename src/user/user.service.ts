import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

export interface SafeUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(dto.password, 10);
    const user = this.repo.create({ ...dto, password: hash });
    return this.repo.save(user);
  }

  async findAll(): Promise<SafeUser[]> {
    return this.repo.find({
      select: ['id', 'name', 'username', 'email'],
    }) as Promise<SafeUser[]>;
  }

  async findOne(id: number): Promise<SafeUser> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safe } = user;
    return safe as SafeUser;
  }

  async findByIdWithPassword(id: number): Promise<User | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.repo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('LOWER(user.username) = LOWER(:username)', { username })
      .getOne();
  }

  async update(id: number, dto: UpdateUserDto): Promise<SafeUser> {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException(`User ${id} not found`);

    const updateData: Partial<User> = { ...dto };

    if (dto.password) {
      updateData.password = await bcrypt.hash(dto.password, 10);
    }

    await this.repo.update(id, updateData);
    const updated = await this.repo.findOne({ where: { id } });

    if (!updated)
      throw new NotFoundException(`User ${id} not found after update`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = updated;
    return safeUser as SafeUser;
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`User ${id} not found`);
  }
}
