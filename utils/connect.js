const mongoose = require("mongoose");

const config = require("dotenv").config();

async function connect() {
    const dbUri = process.env.dbUri || "mongodb://127.0.0.1:27017/DiscussIT";

    try {
        await mongoose.connect(dbUri);
        console.log("DB connected");
    }

    catch (error) {
        console.log(error);
        process.exit(1);
    }
}
module.exports = connect;