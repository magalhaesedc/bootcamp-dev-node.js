import mongoose from "mongoose";

async function connect(){
    const uri = "mongodb+srv://edsonmagalhaesdacosta:ujq1Be3AIrQGJo5z@cluster0.umga2cy.mongodb.net/petshop?retryWrites=true&w=majority";
    return await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

export { connect }