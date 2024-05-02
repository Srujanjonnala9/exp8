const{MongoClient}=require('mongodb');
const url='mongodb://localhost:27017';
const client=new MongoClient(url);
let collection;

async function connectDB(dbname,collectionname)
{
    let result=await client.connect();
    let db= result.db(dbname);
    collection = db.collection(collectionname);
    console.log("DataBase Connected...");
    return collection;
}

exports.getData=async function(name,password)
{
    collection = await connectDB("cseB1","employee");
    let response = await collection.find({name:name,password:password}).toArray();
    console.log("From getData method: "+JSON.stringify(response));
    collection.close;
    return JSON.stringify(response);
}

exports.insertData=async function(emp)
{
    collection = await connectDB("cseB1","employee");
    let response= await collection.insertOne({name:emp.name,work:emp.work,password:emp.password})
    console.log("Record inserted Successfully");
    collection.close;
    return JSON.stringify(response);
}
