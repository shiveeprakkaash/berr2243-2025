const { MongoClient } = require('mongodb'); // Note: lowercase 'mongodb'

async function main() {
    // MongoDB connection URI
    const uri = "mongodb://localhost:27017"; // Note: lowercase 'mongodb' and semicolon
    const client = new MongoClient(uri); // Changed variable name to 'uri' for clarity

    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        
        const db = client.db("testDB");
        const collection = db.collection("users");

        // Insert a document
        const insertResult = await collection.insertOne({ 
            name: "Alice", 
            age: 25 
        });
        console.log("Document inserted with _id:", insertResult.insertedId);

        // Query the document
        const result = await collection.findOne({ name: "Alice" });
        console.log("Found document:", result);
        
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
}


main()