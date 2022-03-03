import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

// to hide private data like mongo password
dotenv.config();

const app=express();
const PORT=process.env.PORT

// middleware
// to allow communication between different ports
app.use(cors())
// every request inside body is json type
app.use(express.json()) 

const MONGO_URL=process.env.MONGO_URL

async function createConnection(){
    const client=new MongoClient(MONGO_URL)
     // connect ,it will return permise ,so used async await
    await client.connect()
    console.log("Mongodb connected");
        return client;
}
// call function
const client=await createConnection();

app.get('/',(request,response)=>{
    response.send("hello BrewApp")
})
const spaces=[
    {
      title:"public space",
     img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFsJwOEnnNkqoLdjON7JG9pXxtIMXG3cM6DA&usqp=CAU",
     type:"most popular"
    },
    {
        title:"working space in bali",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbfdHImPTKFDCRindIRRqqMG9CqMEJbzK91g&usqp=CAU",
        type:"most popular"
    },
    {
        title:"office interiors",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-SGSlmtDNkiiL6PxRJIVIXl5ixXDCKPRHYQ&usqp=CAU",
        type:"most popular"
    },
    {
        title:"coworking ",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-wt6fedEjldIslrZk7cbYbsemmrUnwEI8jg&usqp=CAU",
        type:"most popular"
    },
    {
        title:"Abstract space",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFa37zREjSilkNS6zzXhAw9lDllEXV1WCVPg&usqp=CAU",
        type:"most popular"
    },
    {
        title:"disney world",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDsxZ-1rV7DMwCLGrEtvsTdj4niORBm_crbQ&usqp=CAU",
        type:"most popular"
    },
    {
        title:"birla temple",
        img:"https://rgyan.com/public/uploads/2018-07/birla.jpg",
        type:"temple"
    },
    {
        title:"kedarnath temple",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVUosbosvPIxMVvi61DRqUOW-LOeVabzGQcw&usqp=CAU",
        type:"temple"
    },
    {
        title:"lotus temple",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLsz3EO6InShQy3GIhB3mMttROYcu4PuuCzg&usqp=CAU",
        type:"temple"
    },
    {
        title:"krishna temple",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT4mEDKwV7WKeP6kO7w9tLWc5HH5u-R1Jw9A&usqp=CAU",
        type:"temple"
    },
    {
        title:"ayodha",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8tec5gmbjxvzouJkyZlEDlKXA6J1-N_5HVw&usqp=CAU",
        type:"temple"
    },
    {
        title:"golden temple",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfgcD7fgqpuY475Oo1CXmNEoYrvtIjamjyaQ&usqp=CAU",
        type:"temple"
    },
    {
        title:"RRR",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnQ24RNWAELzaJrhHvtDz2KlTAudZ01bQbKA&usqp=CAU",
        type:"24h trend"
    },
    {
        title:"baby whale",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpgzFWpapwCsc-PHZOXJnsSGiTsobbEUATBg&usqp=CAU",
        type:"24h trend"
    },
    {
        title:"earth's rotation",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQpKdkkGiy65xp-cmXuS9oX-uikhFqRIrGcQ&usqp=CAU",
        type:"24h trend"
    },
    {
        title:"NCT u's ",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWL1sK5ercVK_RiK3PDkUFFanF5sfRHiqIxQ&usqp=CAU",
        type:"24h trend"
    },
    {
        title:"Allu arjun",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQya4ev5hWSGna8a1IbET8GRFL5PKLKjgDOYA&usqp=CAU",
        type:"24h trend"
    },
    {
        title:"wellness",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsZ5NQbYAkyPBqSsVkSjeFzrNCZ3GRGgQOHw&usqp=CAU",
        type:"24h trend"
    },
]
app.post('/liveSpaces',async(request,response)=>{
   const data=request.body
   const result=await client.db("b28wd").collection("brewApp").insertMany(data)
   response.send(result)
})

app.get('/liveSpaces',async(request,response)=>{
    const filter=request.body
    console.log(filter)
    const result=await client.db("b28wd").collection("brewApp").find(filter).toArray()
    response.send(result)
})

app.listen(PORT,()=>console.log("App started in ",PORT))