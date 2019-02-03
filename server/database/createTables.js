// import bcrypt from 'bcrypt';
import pool from './dbConnection';
import 'dotenv/config';
import { hashPassword } from '../utilities.js/hashPassword';

const createUserTable = `DROP TABLE IF EXISTS users CASCADE;
  CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    firstname VARCHAR (128) NOT NULL,
    othername VARCHAR (128),
    lastname VARCHAR (128) NOT NULL,
    email VARCHAR (355) UNIQUE NOT NULL,
    phone VARCHAR(128) NOT NULL,
    passportUrl TEXT NOT NULL,
    createdOn TIMESTAMP NOT NULL DEFAULT (NOW()),
    isAdmin BOOLEAN NOT NULL DEFAULT (false),
    password VARCHAR (128) NOT NULL
)`;


const createPartyTable = `DROP TABLE IF EXISTS parties CASCADE;
    CREATE TABLE parties (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR (128) UNIQUE NOT NULL,
    acronym VARCHAR (10) UNIQUE NOT NULL,
    hqAddress VARCHAR (128) NOT NULL,
    logoUrl TEXT NOT NULL,
    email VARCHAR (355) UNIQUE NOT NULL,
    phone VARCHAR(128) NOT NULL,
    status VARCHAR(15) NOT NULL DEFAULT ('new'),
    createdOn TIMESTAMP NOT NULL DEFAULT (NOW())
)`;
const createTypeTable = `DROP TYPE IF EXISTS office_type, certificate CASCADE;
CREATE TYPE office_type AS ENUM('federal', 'legislative', 'state', 'local government');
CREATE TYPE certificate AS ENUM('school certificate level', 'undergraduate level', 'postgraduate level');
`;

const createOfficeTable = `DROP TABLE IF EXISTS offices CASCADE;
    CREATE TABLE offices (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR (128) UNIQUE NOT NULL,
    type office_type NOT NULL,
    ageLimit VARCHAR (128) NOT NULL,
    basicQual certificate NOT NULL,
    createdOn TIMESTAMP NOT NULL DEFAULT (NOW())
)`;

const createCandidateTable = `DROP TABLE IF EXISTS candidates CASCADE;
CREATE TABLE candidates (
  id SERIAL UNIQUE NOT NULL,
  age INTEGER NOT NULL,
  qualification TEXT NOT NULL,
  userId INTEGER UNIQUE NOT NULL,
  FOREIGN KEY (userId) references users(id) on delete cascade,
  office INTEGER NOT NULL,
  FOREIGN KEY (office) references offices(id) on delete cascade,
  PRIMARY KEY (userId, office),
  party INTEGER NOT NULL,
  FOREIGN KEY (party) references parties(id) on delete cascade,
  createdOn TIMESTAMP NOT NULL DEFAULT (NOW())

)`;

const createVoteTable = `DROP TABLE IF EXISTS votes CASCADE;
    CREATE TABLE votes (
    id SERIAL NOT NULL,
    createdOn TIMESTAMP NOT NULL DEFAULT (NOW()),
    voter INTEGER  NOT NULL,
    FOREIGN KEY (voter) references users(id) on delete cascade,
    office INTEGER NOT NULL,
    FOREIGN KEY (office) references offices(id) on delete cascade,
    PRIMARY KEY (office, voter),
    candidate INTEGER NOT NULL,
    FOREIGN KEY (candidate) references candidates(id) on delete cascade
    
)`;

const createPetitionTable = `DROP TABLE IF EXISTS petitions CASCADE;
    CREATE TABLE petitions (
    id SERIAL NOT NULL PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL DEFAULT (NOW()),
    createdBy INTEGER UNIQUE NOT NULL,
    FOREIGN KEY (createdBy) references users(id) on delete cascade,
    office INTEGER NOT NULL,
    FOREIGN KEY (office) references offices(id) on delete cascade,
    body TEXT NOT NULL,
    evidence TEXT []
    
)`;

const sql = 'insert into users (firstname, lastName, email, phone, passportUrl, isAdmin, password) values ($1, $2, $3, $4, $5, $6, $7)';

const variables = [process.env.ADMIN_FIRSTNAME, process.env.ADMIN_LASTNAME, process.env.ADMIN_EMAIL, process.env.ADMIN_PHONE, process.env.ADMIN_PASSPORT_URL, 'true', hashPassword(process.env.ADMIN_PASSWORD)];

async function createTables() {
  try {
    await pool.query(createUserTable);
  } catch (error) {
    throw new Error('user table creation failed');
  }
  try {
    await pool.query(sql, variables);
  } catch (error) {
    throw new Error('Admin insertion failed');
  }
  try {
    await pool.query(createPartyTable);
  } catch (error) {
    throw new Error('party table creation failed');
  }
  try {
    await pool.query(createTypeTable);
  } catch (error) {
    throw new Error('office_type table creation failed');
  }
  try {
    await pool.query(createOfficeTable);
  } catch (error) {
    throw new Error('office table creation failed');
  }
  try {
    await pool.query(createCandidateTable);
  } catch (error) {
    throw new Error('candidate table creation failed');
  }
  try {
    await pool.query(createVoteTable);
  } catch (error) {
    throw new Error('vote table creation failed');
  }
  try {
    await pool.query(createPetitionTable);
  } catch (error) {
    throw new Error('petition table creation failed');
  }
}

createTables();

export default createTables;
