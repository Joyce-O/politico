import pool from './dbConnection';
import { hashPassword } from '../middlewares/authentication';


const createUserTable = `DROP TABLE IF EXISTS users CASCADE;
  CREATE TABLE userTable (
    id SERIAL INTEGER NOT NULL PRIMARY KEY,
    firstname VARCHAR (128) NOT NULL,
    lastname VARCHAR (128) NOT NULL,
    othername VARCHAR (128),
    email VARCHAR (355) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    passportUrl TEXT NOT NULL,
    registered TIMESTAMP NOT NULL DEFAULT (NOW()),
    isAdmin BOOLEAN NOT NULL DEFAULT (false),
    password VARCHAR (128) NOT NULL
)`;


const createPartyTable = `DROP TABLE IF EXISTS partyTable;
    CREATE TABLE patyTable (
    id SERIAL ,
    userId VARCHAR PRIMARY KEY NOT NULL,
    partyId INTEGER NOT NULL,
    name VARCHAR (128) UNIQUE NOT NULL,
    hqAddress VARCHAR (128) NOT NULL,
    logoUrl TEXT NOT NULL,
    email VARCHAR (355) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    registered TIMESTAMP NOT NULL DEFAULT (NOW())
)`;

const createOfficeTable = `DROP TABLE IF EXISTS officeTable;
    CREATE TABLE officeTable (
    id SERIAL PRIMARY KEY,
    officeId INTEGER NOT NULL,
    name VARCHAR (128) UNIQUE NOT NULL,
    type VARCHAR (128) NOT NULL,
    registered TIMESTAMP NOT NULL DEFAULT (NOW())
)`;

const createCandidateTable = `DROP TABLE IF EXISTS candidateTable;
    CREATE TABLE candidateTable (
    id SERIAL PRIMARY KEY,
    candidate INTEGER NOT NULL,
    FOREIGN KEY (candidate) references userTable(userId) on delete cascade,
    office INTEGER NOT NULL,
    FOREIGN KEY (office) references officeTable(officeId) on delete cascade,
    party INTEGER NOT NULL,
    FOREIGN KEY (party) references officeTable(partyId) on delete cascade,
    registered TIMESTAMP NOT NULL DEFAULT (NOW())
)`;

const createVoteTable = `DROP TABLE IF EXISTS voteTable;
    CREATE TABLE voteTable (
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL DEFAULT (NOW()),
    createdBy INTEGER NOT NULL,
    FOREIGN KEY (createdBy) references userTable(userId) on delete cascade,
    office INTEGER NOT NULL,
    FOREIGN KEY (office) references officeTable(officeId) on delete cascade,
    candidate INTEGER NOT NULL,
    FOREIGN KEY (candidate) references candidateTable(candidate) on delete cascade
    
)`;

const createPetitionTable = `DROP TABLE IF EXISTS PetitionTable;
    CREATE TABLE PetitionTable (
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL DEFAULT (NOW()),
    createdBy INTEGER NOT NULL,
    FOREIGN KEY (createdBy) references userTable(userId) on delete cascade,
    office INTEGER NOT NULL,
    FOREIGN KEY (office) references officeTable(officeId) on delete cascade,
    body TEXT NOT NULL,
    evidence INTEGER NOT NULL
    
)`;

const sql = 'insert into userTable (firstname, othername, lastName, email, address, phone, isAdmin, password) values ($1, $2, $3, $4, $5, $6, $7, $8)';

const variables = ['Admin', 'chief', 'Harry', 'chief@gmail.com', 'Government layout Benin', '098064467788', 'true', hashPassword('adminchief')];


async function createTables() {
  const users = await pool.query(createUserTable);
  try {
    console.log('user table created', users);
  } catch (error) {
    console.log('user table creation failed');
  }
  const admin = await pool.query(sql, variables);
  try {
    console.log('Admin inserted', admin);
  } catch (error) {
    console.log('Admin insertion failed');
  }
  const party = await pool.query(createPartyTable);
  try {
    console.log('party table created', party);
  } catch (error) {
    console.log('party table creation failed');
  }
  const office = await pool.query(createOfficeTable);
  try {
    console.log('office table created', office);
  } catch (error) {
    console.log('office table creation failed');
  }
  const candidate = await pool.query(createCandidateTable);
  try {
    console.log('candidate table created', candidate);
  } catch (error) {
    console.log('candidate table creation failed');
  }

  const vote = await pool.query(createVoteTable);
  try {
    console.log('vote table created', vote);
  } catch (error) {
    console.log('vote table creation failed');
  }

  const petition = await pool.query(createPetitionTable);
  try {
    console.log('petition table created', petition);
  } catch (error) {
    console.log('petition table creation failed');
  }
}

createTables();

export default createTables;
