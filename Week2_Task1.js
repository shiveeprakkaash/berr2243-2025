const { MongoClient } = require('mongodb');

const drivers = [
    {
        name: "John Doe",
        vehicleType: "Sedan",
        isAvailable: true,
        rating: 4.8
    },
    {
        name: "Alice Smith",
        vehicleType: "SUV",
        isAvailable: false,
        rating: 4.5
    }
];

console.log("All drivers data:");
console.log(drivers);

console.log("\nDriver names:");
drivers.forEach(driver => console.log(driver.name));

const newDriver = {
    name: "Robert Johnson",
    vehicleType: "Truck",
    isAvailable: true,
    rating: 4.7
};
drivers.push(newDriver);
console.log("\nAdded new driver:", newDriver);

async function main() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("\nConnected to MongoDB!");
        
        const db = client.db("testDB");
        const driversCollection = db.collection("drivers");

        const insertResult = await driversCollection.insertMany(drivers);
        console.log(`\nSuccessfully inserted ${insertResult.insertedCount} drivers`);

        const allDrivers = await driversCollection.find().toArray();
        console.log("\nDrivers in database:");
        allDrivers.forEach(driver => console.log(driver));

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
}

main();