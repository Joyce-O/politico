import bcrypt from 'bcrypt';

const hashPassword = password => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};

export const verifyPassword = (prev, current) => bcrypt.compareSync(prev, current);
