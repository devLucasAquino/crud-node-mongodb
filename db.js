import {MongoClient} from 'mongodb';

let singleton;

const mongoHost = process.env.VITE_MONGO_HOST || 'mongodb://localhost:27017';
const mongoDataBase = process.env.VITE_MONGO_DATABASE || 'clientes';

async function connect(){
    if(singleton) return singleton;

    const client = new MongoClient(mongoHost, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    
      try {
        await client.connect();
        singleton = client.db(mongoDataBase);
        return singleton;
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
      }
}


async function insert(customer){
    const db = await connect();
    const result = await db.collection('customers').insertOne(customer);
    return result;
}

    export default {
        insert,
      };
