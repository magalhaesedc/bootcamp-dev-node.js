import mongodb from "mongodb";

function getClient(){
    const uri = "mongodb+srv://edsonmagalhaesdacosta:ujq1Be3AIrQGJo5z@cluster0.umga2cy.mongodb.net/?retryWrites=true&w=majority";
    return new mongodb.MongoClient(uri);
}

export { getClient }