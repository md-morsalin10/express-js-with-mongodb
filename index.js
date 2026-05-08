const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());

// to convert jason
app.use(express.json());
const uri = `mongodb+srv://expressData:i5dCiUVir9fGwVnq@cluster0.icfdluw.mongodb.net/?appName=Cluster0`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const run = async () => {
    try {
        await client.connect()
        await client.db('admin').command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally {
        //  await client.close();
    }
}
run().catch(console.dir);



app.get("/", (req, res) => {
    res.send('simple crud server is serving')
})

app.listen(port, () => {
    console.log(`server in running in ${port}`)
})