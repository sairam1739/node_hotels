const express = require('express');
const router =express.Router();
const Person = require('./../models/person')

router.post("/",async (req,res)=>{
    try{
        const data = req.body;

    const newPerson = new Person(data);

     const response = await newPerson.save();
     console.log('data saved');
     res.status(200).json(response);
    }catch(err){

        console.log(err);
         res.status(500).json({error:'internal server error'})    
}
})

router.get("/",async (req,res)=>{
    try{

    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
    }catch(err){

        console.log(err);
         res.status(500).json({error:'internal server error'})    
}
})

router.get('/:worktype', async (req,res)=>{
    try{
        const worktype = req.params.worktype;
    
        if(worktype=='chef' || worktype=='waiter'|| worktype=='manager' ){
            const response =await Person.find({work:worktype})
            console.log("response fetched");
            res.status(200).json(response)
      
        }else{
            res.status(404).json({error:"invalid work type"})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal error server'});
    }
    })

router.put('/:id',async (req,res)=>{
        try{
            const personId = req.params.id;
            const updatedPersonData=req.body;

            const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
                new:true,
                runValidators:true
            })

            if(!response){
                return res.status(404).json({error:"not found person"});
            }
            console.log("data updated");
            res.status(200).json(response)


        }catch(err){
            console.log(err);
            res.status(500).json({errer:"internal server errror"})
        }
    })

    router.delete('/:id',async (req,res)=>{
        try{
            const personId = req.params.id;
           
            const response=await Person.findByIdAndDelete(personId)

            if(!response){
                return res.status(404).json({error:"not found person"});
            }
            console.log("deleted person");
            res.status(200).json({message:"person deleted successfully"})


        }catch(err){
            console.log(err);
            res.status(500).json({errer:"internal server errror"})
        }
    })

module.exports=router;