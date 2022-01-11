  
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProviderService from './ListProviderService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider : FakeCacheProvider;
let listProviderService: ListProviderService;

describe('listProviderService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderService = new ListProviderService(fakeUsersRepository, fakeCacheProvider);
  });
  it('should be able to list the providers', async () => {
    const userOne =  await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

   const userTwo = await fakeUsersRepository.create({
        name: 'John Tre',
        email: 'johndo2e@example.com',
        password: '123456',
      });


    const loggedUsr =  await fakeUsersRepository.create({
        name: 'John Tre',
        email: 'johndo3@example.com',
        password: '123456',
      });

    const providers = await listProviderService.execute({
      user_id : loggedUsr.id
    });

    expect(providers).toEqual([userOne, userTwo])

  });
//   it('should not be able to show the profile of non existent user', async () => {
//     await expect(
//       listProviderService.execute({
//         user_id: 'non-existent-user',
//       }),
//     ).rejects.toBeInstanceOf(AppError);
//   });
});