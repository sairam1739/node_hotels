const express = require('express');
const app = express();
const db = require('./db')
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Person = require('./models/person')
const MenuItem = require('./models/MenuItem')
app.get('/',function (req,res){
    res.send("welcome to hotel how help i ");
})

// app.post("/person",async (req,res)=>{
//     try{
//         const data = req.body;

//     const newPerson = new Person(data);

//      const response = await newPerson.save();
//      console.log('data saved');
//      res.status(200).json(response);
//     }catch(err){

//         console.log(err);
//          res.status(500).json({error:'internal server error'})    
// }
// })


// app.get("/person",async (req,res)=>{
//     try{

//     const data = await Person.find();
//     console.log("data fetched");
//     res.status(200).json(data);
//     }catch(err){

//         console.log(err);
//          res.status(500).json({error:'internal server error'})    
// }
// })
//POST for menu

app.post("/Menu",async (req,res)=>{
try{
    const data = req.body
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log('data saved')
    res.status(200).json(response);

}
catch(err){
    console.log(err);
    res.status(500).json({error:'internal error'});
}
    
})

app.get('/menu',async (req,res)=>{
    try{
        const data =await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal error server'});
    }
})

// app.get('/person/:worktype', async (req,res)=>{
// try{
//     const worktype = req.params.worktype;

//     if(worktype=='chef' || worktype=='waiter'|| worktype=='manager' ){
//         const response =await Person.find({work:worktype})
//         console.log("response fetched");
//         res.status(200).json(response)
  
//     }else{
//         res.status(404).json({error:"invalid work type"})
//     }
// }catch(err){
//     console.log(err);
//     res.status(500).json({error:'internal error server'});
// }
// })

const personroutes = require('./routes/personRoutes')
const menuItemsRoutes = require('./routes/menuItemRoutes')
app.use('/person',personroutes);
app.use('/menu',menuItemsRoutes)


app.listen(3000,()=>{
    console.log("listening to port 3000");
})





