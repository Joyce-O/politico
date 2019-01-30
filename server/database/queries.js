export const insertUser = 'insert into users (firstname, lastname, email, phone, passportUrl, password) values ($1, $2, $3, $4, $5, $6) returning *';
export const queryUsersByEmail = 'select * from users where email = $1';
export const queryPartiesByName = 'select * from parties where name = $1';
export const insertParty = 'insert into parties (name, acronym, hqAddress, logoUrl, email, phone) values ($1, $2, $3, $4, $5, $6) returning *';
