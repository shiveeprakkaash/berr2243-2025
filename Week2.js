const { MongoClient } = require('mongodb'); // Note: lowercase 'mongodb'

const drivers = [
    {
        name: "John Doe",
        vehicleType: "sedan",
        isAvailable: true,
        rating: 4.8  
    },
    {
        name: "Alice Smith",
        vehicleType: "SUV",
        isAvailable: false,
        rating:4.5
    },
    {
        name: "Robert Johnson",
        vehicleType: "truck",
        isAvailable: true,
        rating: 4.7
    }
];

console.log(drivers);

async function main() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const db = client.db("testDB");
        const driversCollection = db.collection("drivers");

        const insertResult = await driversCollection.insertMany(drivers);
        console.log(`${insertResult.insertedCount} drivers inserted`);

        const allDrivers = await driversCollection.find().toArray();
        console.log("All drivers names: ");
        allDrivers.forEach(driver => console.log(driver.name));

        console.log("Driver Names:");
        const driverNames = await driversCollection.find({}, { projection: { _id: 0, name: 1 } }).toArray();
        driverNames.forEach(driver => console.log(driver.name));


        // Insert a Driver
        const newDriver = { 
            name: "Robert Johnson", 
            vehicleType: "Truck",
            isAvailable: true, 
            rating: 4.7
        };
        await driversCollection.insertOne(newDriver);
        console.log("New driver added: ", newDriver.name);

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
}

main();