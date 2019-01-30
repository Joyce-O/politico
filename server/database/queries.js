export const insertUser = 'insert into users (firstname, lastname, email, phone, passportUrl, password) values ($1, $2, $3, $4, $5, $6) returning *';
export const queryUsersByEmail = 'select * from users where email = $1';
export const queryPartiesByName = 'select * from parties where email = $1';
export const queryPartiesByAcronym = 'select * from parties where email = $1';
export const queryPartiesByEmail = 'select * from parties where email = $1';
