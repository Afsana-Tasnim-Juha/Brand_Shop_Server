const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;



//middleware

app.use(cors());
app.use(express.json());
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');



const uri = `mongodb+srv://${process.env.BRAND_USER}:${process.env.BRAND_PASS}@cluster0.vlqjil4.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const productCollection = client.db("productDB").collection("collect");
        const CardCollection = client.db("CardDB").collection("collectCard");
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        //addProduct
        app.post('/product', async (req, res) => {
            const newProduct = req.body;
            console.log(newProduct);
            const result = await productCollection.insertOne(newProduct);
            res.send(result);
        })

        app.get('/product', async (req, res) => {
            const cursor = productCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const newProduct = await productCollection.findOne(query);

            res.send(newProduct);
        })

        app.post('/card', async (req, res) => {
            const details = req.body;
            console.log(details);
            const result2 = await CardCollection.insertOne(details);
            res.send(result2);
        })





        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Technology and Electronics server is running')
})

app.listen(port, () => {
    console.log(`Technology and Electronics server is running on port ${port}`)
})