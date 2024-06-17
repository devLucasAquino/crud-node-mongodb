import {MongoClient} from 'mongodb';

let singleton;

const mongoHost = process.env.VITE_MONGO_HOST || 'mongodb://localhost:27017';
const mongoDataBase = process.env.VITE_MONGO_DATABASE || 'clientes';

async function connect(){
    if(singleton) return singleton;

    const client = new MongoClient(mongoHost);

    await client.connect();

    singleton = client.db(mongoDataBase);
    return singleton;
}


async function insert(customer){
    const db = await connect();
    return db.collection("customers").insertOne(customer);
}

export default {
    insert
}







