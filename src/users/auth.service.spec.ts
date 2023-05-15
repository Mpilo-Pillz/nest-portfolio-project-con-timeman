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

    // auth service only uses find and create
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
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
    fakeUsersService.find = () =>
      Promise.resolve([
        { id: 1, email: 'test@mail.com', password: 'testUser' } as User,
      ]);

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
    fakeUsersService.find = () =>
      Promise.resolve([
        { email: 'test@mail.com', password: 'jkghljg' } as User,
      ]);

    await expect(service.signin('test@mail.com', 'password')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('returns a user if correct password is provided', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([
        {
          email: 'test@mail.com',
          password:
            'c910e4ed0b5444e9.ca4aa6df538c04332b38bcfad591cafb036fb048ecda46d138e226b1c6b934bb',
        } as User,
      ]);

    const user = await service.signin('test@mail.com', 'jkghljg');
    // const user = await service.signin('test@mail.com', 'jkghljg');
    // console.log(user);

    // expect(user).toBeDefined();
  });
});
