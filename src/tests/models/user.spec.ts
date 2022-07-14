import UserStore from '../../models/user.model';

import User from '../../types/user.type';
const UserStoreInstance = new UserStore();

describe('User Model', () => {
  const user: User = {
    email: 'm@s.com',
    user_name: 'ordertester',
    first_name: 'Order',
    last_name: 'Tester',
    password: 'password123',
  };

  async function createUser(user: User) {
    return UserStoreInstance.create(user);
  }

  async function deleteUser(id: string) {
    return UserStoreInstance.deleteUser(id);
  }

  it('should have an index method', () => {
    expect(UserStoreInstance.getUsers).toBeDefined();
  });

  it('should have a show method', () => {
    expect(UserStoreInstance.getUser).toBeDefined();
  });

  it('should have a create method', () => {
    expect(UserStoreInstance.create).toBeDefined();
  });

  it('should have a remove method', () => {
    expect(UserStoreInstance.deleteUser).toBeDefined();
  });

  it('create method should create a user', async () => {
    const createdUser: User = await createUser(user);

    if (createdUser) {
      const { user_name, first_name, last_name } = createdUser;

      expect(user_name).toBe(user.user_name);
      expect(first_name).toBe(user.first_name);
      expect(last_name).toBe(user.last_name);
    }
  });

  it('index method should return a list of users', async () => {
    const createdUser: User = await createUser(user);
    const userList = await UserStoreInstance.getUsers();

    expect(userList).toEqual([createdUser]);
  });

  it('show method should return the correct users', async () => {
    const createdUser: User = await createUser(user);
    const userFromDb = await UserStoreInstance.getUser(createdUser?.id ?? '');

    expect(userFromDb).toEqual(createdUser);

    await deleteUser(createdUser?.id || '');
  });

  it('remove method should remove the user', async () => {
    const createdUser: User = await createUser(user);

    await deleteUser(createdUser.id || '');

    const userList = await UserStoreInstance.getUsers();

    expect(userList).toEqual([]);
  });
});
