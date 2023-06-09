import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // Create a fake copy of the users service
    const users: User[] = [];

    // auth service only uses find and create
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random()) * 999999,
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService); // Make di container to create instance of auth service to get th emotheods and properties
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('test@mail.com', 'testUser');

    expect(user.password).not.toEqual('testUser');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user sings up with email that is in use', async () => {
    // fakeUsersService.find = () =>
    //   Promise.resolve([
    //     { id: 1, email: 'test@mail.com', password: 'testUser' } as User,
    //   ]);
    await service.signup('itest@mail.com', 'testUser');

    await expect(service.signup('test@mail.com', 'testUser')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws if signin is called with an unused email', async () => {
    await expect(service.signin('fsdfs@fsfs.com', 'fsdfre')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('throws if an invalid password is provided', async () => {
    // fakeUsersService.find = () =>
    //   Promise.resolve([
    //     { email: 'test@mail.com', password: 'jkghljg' } as User,
    //   ]);
    await service.signup('invalid@mail.com', 'password');
    await expect(
      service.signin('test@mail.com', 'invalidPassword'),
    ).rejects.toThrow(BadRequestException);
  });

  it('returns a user if correct password is provided', async () => {
    await service.signup('test@mail.com', 'jkghljg');

    const user = await service.signin('test@mail.com', 'jkghljg');
    // const user = await service.signin('test@mail.com', 'jkghljg');
    // console.log(user);

    expect(user).toBeDefined();
  });
});
