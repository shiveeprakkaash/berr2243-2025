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
        const db = client.db("testDB");
        const driversCollection = db.collection("drivers");
    
        const updateResult = await db.collection('drivers').updateOne(
            { name: "John Doe" },
            { $inc: { rating: 0.1 } }
        );
        console.log(`Driver updated with result: ${updateResult}`);
        
        const deleteResult = await db.collection('drivers').deleteOne({
            isAvailable: false
        });
        console.log(`Driver deleted with result: ${deleteResult}`);
    
    } finally {
        await client.close();
    }
}

main();