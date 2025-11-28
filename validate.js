
import { readFile } from 'fs/promises';

(async () => {
  try {
    const data = await readFile('db.json', 'utf8');
    JSON.parse(data);
    console.log('db.json is a valid JSON file.');
  } catch (err) {
    console.error('Error parsing db.json:', err);
  }
})();
