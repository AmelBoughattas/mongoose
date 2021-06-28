const express = require('express')
const router = express.Router()
const Person = require('../models/personSchema')


//***********************************************************************//
//http://localhost:6000/person/newperson
//add new one person Post 
router.post('/newperson', (req, res) => {
    let newPerson = new Person(req.body)
    newPerson.save((err, data) => {
        err ? console.log(err) : res.json({Message:"Person was added", data})
    })
})


//***********************************************************************//
//http://localhost:6000/person/addmany
//add many records person with model.create()
router.post('/addmany', async (req, res) => {
    try {
        let Arr = [...req.body]
        const user = await Person.create(Arr, (err, data) => {
            res.json(Arr);
            console.log(Arr);
        });
    } catch (err) {
        console.log(err)
    }
});


//***********************************************************************//
//http://localhost:6000/person/getperson
//get all person 
router.get('/getperson', async (req, res) => {
    try {
        const data = await Person.find()
        res.json(data)
    }
    catch (err) {
        console.log(err)
    }
});


//***********************************************************************//
//http://localhost:6000/person/findname
//Find all the persons having a given name
router.get('/findname', async (req, res) => {
    try {
        const data = await Person.find({ name: req.body.name })
        res.json(data)
    }
    catch (err) {
        console.log(err)
    }
});


//***********************************************************************//
//http://localhost:6000/person/(write id)
//Use model.findById() to Search Your Database By _id
router.get('/:id', async (req, res) => {
    try {
        const data = await Person.findById(req.params.id)
        res.json(data)
    }
    catch (err) {
        console.log(err)
    }
});


//***********************************************************************//
//http://localhost:6000/person/updatefood/(write id)
///Updates by Running Find, Edit, then Save  (favoriteFoods:"hamburger")
router.put("/updatefood/:id", (req, res) => {
    Person.findById(req.params.id, (err, data)=> {
    if (err) {
        console.log(err)
    }
    const humburger = data.favoriteFoods.push("humburger")
    res.json({Message : "update done", humburger })
    data.save((err, data) => {
        if (err) {
            console.log(err)
        } 
    console.log(data)
    })      
    })
})


//***********************************************************************//
//http://localhost:6000/person/findUpdateAge
//Find a person by Name and set the person's age to 20 use findOneAndUpdate()
router.put("/findUpdateAge", async(req,res)=> {
       try {
        const age = await Person.findOneAndUpdate(
            {name : req.body.name},
            {$set : {age:20}},
            {new : true},
            );
        res.json({message : "Done",age})
    }
    catch (err) {
        console.log(err)
    }
});
           

//***********************************************************************//
//http://localhost:6000/person/deleteperson/(write id)
//Delete one person by the person's _id, use findByIdAndRemove()
router.delete('/deleteperson/:id', async (req, res)=>{
    try{
        const data =await Person.findByIdAndRemove({_id : req.params.id})
        console.log(data)
        res.json({message : "person is delete", data})
    }
    catch(err) {
        console.log(err)
    }
})


//***********************************************************************//
//http://localhost:6000/person/deletemanyper
//Delete all the people whose name is “Mary” example, using Model.remove()
router.delete("/deletemanyper", async (req, res) => {
    try {
      const date = await Person.remove({ name: req.body.name });
      console.log(date);
      res.json({ msg: "Persons were deleted", date });
    } catch (err) {
      console.log(err);
    }
  });


//***********************************************************************//
//http://localhost:6000/person/find/findchain
//Chain Search Query Helpers to Narrow Search Results
router.get("/find/findchain", (req,res)=>{
    Person.find ({ favoriteFoods:{$all:["pasta"] }})
    .sort({age:"asc"})
    .limit(2)
    .select({name:true})
    .exec((err, data)=>{
        if(err)
        { console.log(err); }

        console.log(data);
        res.json({message:"Done", data});
    });
});

module.exports = router;
