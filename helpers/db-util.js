import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const url =
    "mongodb+srv://kyahn:3j3IwKSAIYw6nj50@cluster0.7jehjja.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(url);

  return client;
}

export async function insertDocument(client, database, collection, document) {
  const db = client.db(database);
  const col = db.collection(collection);

  const result = await col.insertOne(document);

  return result;
}

export async function getAllData(client, database, collection) {
  const db = client.db(database);

  const data = await db.collection(collection).sort({ _id: -1 }).toArray();

  return data;
}

export async function getData(client, database, collection, option) {
  const db = client.db(database);

  const data = await db
    .collection(collection)
    .find(option)
    .sort({ _id: -1 })
    .toArray();

  return data;
}
