const { User } = require('../../src/app/models');
const bcrypt = require('bcryptjs');
const truncate = require('../utils/truncateTable');

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  }, 10000);
  it('should encrypt user password', async () => {
    const user = await User.create({
      name: 'Diego',
      email: 'dieguinhodolala@gmail.com',
      password: '12345678',
    });

    const compareHash = await bcrypt.compare(user.password, user.password_hash);

    expect(compareHash).toBe(true);
  });
});

