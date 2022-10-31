import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  // TODO: Add logic for a method that gets all the content from the database
  export const getDb = async () => {
    console.log('Getting data');
    const jateDB = await openDB('jate', 1);
    const tx = jateDB.transaction('jate', 'readwrite');
    const objStore = tx.objectStore('jate');
    const req = objStore.getAll();
    const res = await req;
    console.log('Data saved to the DB', res);
  };
// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, value) => {
  console.log('Put request to update the Database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const objStore = tx.objectStore('jate');
  const req = objStore.put({ id: id, value: value})
  const res = await req;
  console.log('Data sucessfully updated to the Database', res);
}


initdb();
