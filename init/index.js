const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main()
    .then(res => console.log("Connection successful"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderLust');
};

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: '6819ff2fc3a982142d8da249', geometry:{ type: 'Point', coordinates: [ 73.10683, 30.665764 ] }, category:"Amazing pools"}))
    await Listing.insertMany(initData.data);
    console.log("Data was initiallized");
}

initDB();



