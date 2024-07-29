import { sql } from './db.js'

// sql`DROP TABLE IF EXISTS items;`.then(() => {
//   console.log('Tabela deletada!')
// })

sql`
  CREATE TABLE items (
  id TEXT PRIMARY KEY,
  title TEXT
  );
`.then(() => {
  console.log('Tabela criada!')
})