import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();
let dbUrl;

if (process.env.NODE_ENV === 'test:dev') {
  dbUrl = {
    connectionString: process.env.TEST_DB_URL,
  };
} else {
  dbUrl = ({
    connectionString: process.env.DATABASE_URL || process.env.LOCALDB_URL,
  });
}

const pool = new Pool(dbUrl);

export default pool;
