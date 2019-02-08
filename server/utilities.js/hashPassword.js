import bcrypt from 'bcrypt';


export const hashPassword = (password, saltRounds) => {
  return bcrypt.hashSync(password, saltRounds);
};

export const verifyPassword = (prev, current) => bcrypt.compareSync(prev, current);
