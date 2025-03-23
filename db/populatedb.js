const { Client } = require("pg");
const { argv } = require("node:process");


const SQL = `CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255),
    password VARCHAR(255),
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    status VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS messages(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    message VARCHAR(255),
    userId INTEGER,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE  "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: argv[2],
    });
    await client.connect();
    await client.query(SQL);
    await client.end;
    console.log("done");
}
main();