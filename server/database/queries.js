export const insertUser = 'insert into users (firstname, lastname, email, phone, passportUrl, address, password) values ($1, $2, $3, $4, $5, $6, $7) returning *';
export const queryUsersByEmail = 'select * from users where email = $1';
export const queryPartiesByName = 'select * from parties where name = $1';
export const queryPartiesByEmail = 'select * from parties where email = $1';
export const queryPartiesByAcronym = 'select * from parties where acronym = $1';
export const insertParty = 'insert into parties (name, acronym, hqAddress, logoUrl, email, phone) values ($1, $2, $3, $4, $5, $6) returning *';
export const selectAllParties = 'select * from parties ORDER BY name';
export const selectAParty = 'select * from parties where id = $1';
export const updatePartyName = 'UPDATE parties set name = $1 where id = $2 returning *';
export const deleteParty = 'DELETE from parties where id = $1 returning *';
export const queryOfficesByName = 'select * from offices where name = $1';
export const insertOffice = 'insert into offices (name, type, ageLimit, basicQual) values ($1, $2, $3, $4) returning *';
export const selectAllOffices = 'select * from offices';
export const selectAnOffice = 'select * from offices where id = $1';
export const insertCandidate = 'insert into candidates (age, qualification, userId, office, party) values ($1, $2, $3, $4, $5) returning *';
export const selectUsersById = 'select * from users where id = $1';
export const selectCanById = 'select * from candidates where userId = $1';
export const insertVote = 'insert into votes (voter, office, candidate) values ($1, $2, $3) returning *';
export const selectCanId = 'select * from candidates where id = $1';
export const resultQuery = 'select office, candidate, count(candidate) as results from votes where office = $1 group by candidate, office' 
