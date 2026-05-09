const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
         const db = client.db("simpleCrud");
         const userCollection = db.collection("users");

        app.get("/users", async(req, res)=>{
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get("/users/:id", async(req, res)=>{

            const id = req.params.id
            const query = {
                _id: new ObjectId(id)
            }
            const user = await userCollection.findOne(query);
            console.log(id, "params id");
            res.send(user);
        })

        app.delete("/users/:id", async(req, res)=>{
            const id = req.params.id;
            const query = {
                _id: new ObjectId(id)
            }
            const user = await userCollection.deleteOne(query);
            res.send(user);
        })

        app.post("/users", async(req, res)=>{
            const newUser = req.body
            const result = await userCollection.insertOne(newUser)
            res.send(result);
        })

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