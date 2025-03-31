const { MongoClient } = require('mongodb');

// Original drivers array
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
    },
    {
        name: "Robert Johnson",
        vehicleType: "Truck",
        isAvailable: true,
        rating: 4.7
    }
];

const newDriver = {
        name: "Emily Davis",
        vehicleType: "Minivan",
        isAvailable: true,
        rating: 4.9
};
drivers.push(newDriver);

console.log("Updated Drivers Array:");
console.log(drivers);

console.log("\nDriver Names:");
drivers.forEach(driver => console.log(`- ${driver.name}`));

async function main() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("testDB");
        const collection = db.collection("drivers");

        const result = await collection.insertMany(drivers);
        console.log(`\nInserted ${result.insertedCount} drivers into database`);

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
}

main();