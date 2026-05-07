import { Sequelize } from 'sequelize';
import { readdirSync } from 'fs';
import { join, basename as base } from 'path';
import { fileURLToPath } from 'url';
import sequelize from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = base(__filename);
const db = {};

const files = readdirSync(new URL('.', import.meta.url).pathname).filter(file =>
  file !== 'index.js' &&
  file.endsWith('.js') &&
  !file.endsWith('.test.js')
);

for (const file of files) {
  const model = (await import(join(new URL('.', import.meta.url).pathname, file))).default;
  if (model?.name) db[model.name] = model;
}

Object.values(db).forEach(model => {
  if (model.associate) model.associate(db);
});

db.sequelize = sequelize;
db.Sequelize  = Sequelize;

export default db;