const { Client } = require("pg");
const { argv } = require("node:process");


const SQL = `CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    status VARCHAR(255)
);
INSERT INTO users (username, password, firstname, lastname, status) VALUES
('CodeMaster', '$2a$10$hashedpassword1', 'Alice', 'Johnson', 'admin'),
('JSNinja', '$2a$10$hashedpassword2', 'Bob', 'Smith', 'member'),
('Pythonista', '$2a$10$hashedpassword3', 'Charlie', 'Brown', 'member'),
('Rustacean', '$2a$10$hashedpassword4', 'David', 'Garcia', 'member'),
('DevOpsWizard', '$2a$10$hashedpassword5', 'Eve', 'Williams', 'member');


CREATE TABLE IF NOT EXISTS messages(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    message VARCHAR(255),
    userId INTEGER,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO messages (userId, message) VALUES
(1, 'JavaScript closures are so powerful yet so confusing at times!'),
(2, 'I finally understood recursion. It’s just a function calling itself.'),
(3, 'Python list comprehensions are a game changer for writing clean code.'),
(4, 'Rust ownership system is a bit tricky, but it makes so much sense once you get it!'),
(5, 'Dockerizing my Node.js app made deployment so much easier!'),
(1, 'TypeScript makes large-scale JavaScript projects much more maintainable.'),
(2, 'Debugging in Chrome DevTools is a lifesaver for frontend development!'),
(3, 'GraphQL vs REST APIs – which one do you prefer?'),
(4, 'Unit testing in Jest is actually kinda fun!'),
(5, 'CI/CD pipelines have completely changed how I work on projects.');

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