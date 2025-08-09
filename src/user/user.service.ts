import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

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

  // retorna lista sem password
  findAll(): Promise<Partial<User>[]> {
    return this.repo.find({ select: ['id', 'name', 'username', 'email'] });
  }

  // retorna user sem password (lança se não existir)
  async findOne(id: number): Promise<Partial<User>> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    const { password, ...safe } = user;
    return safe;
  }

  // procura o user completo pelo id (inclui password)
  async findByIdWithPassword(id: number): Promise<User | null> {
    return this.repo.findOne({ where: { id } });
  }

  // procura o user completo pelo username (inclui password)
  async findByUsername(username: string): Promise<User | null> {
    return this.repo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('LOWER(user.username) = LOWER(:username)', { username })
      .getOne();
  }

  async update(id: number, dto: UpdateUserDto): Promise<Partial<User>> {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException(`User ${id} not found`);

    if ((dto as any).password) {
      (dto as any).password = await bcrypt.hash((dto as any).password, 10);
    }

    await this.repo.update(id, dto);

    const updated = await this.repo.findOne({ where: { id } });
    if (!updated) throw new NotFoundException(`User ${id} not found after update`);

    const { password, ...safe } = updated;
    return safe;
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`User ${id} not found`);
  }
}