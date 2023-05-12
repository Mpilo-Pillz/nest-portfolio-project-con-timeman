import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { promisify } from 'util';
import { scrypt as _scrypt, randomBytes } from 'crypto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // See if email is in use
    const users = await this.usersService.find(email);

    if (users.length) {
      throw new BadRequestException('email in use');
    }
    // hash the users password
    // Generate a salt
    const salt = randomBytes(8).toString('hex');

    // hash the salt and the password together
    const hash = await scrypt(password, salt, 32);
    // Create a new user and save
    // return the user
  }

  signin() {}
}
