const express = require("express")

const app= express();

// 1. Be polite,Greet the User
app.get("/greetings/:username", (req,res)=> {
    res.send(`Hello there, ${req.params.username}!`)
})

// 2. Rolling the Dice
app.get("/roll/:number", (req,res)=>{
    if (isNaN(req.params.number)){
        res.send(`You must specify a number.`)
        return
    }
    
   

    res.send(`You rolled a ${Math.floor(Math.random() * parseInt(req.params.number)+ 1)}!`)
    
})


//3. I Want THAT One!

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

  app.get("/collectibles/:index", (req,res)=>{
    const itemIndex=parseInt(req.params.index)
    if(isNaN(itemIndex) || itemIndex< 0 || itemIndex >= collectibles.length){
        res.send(`This item is not yet in stock. Check back soon!`)
    }
    else{ 
        res.send(`So, you want the ${collectibles[itemIndex].name}? For ${collectibles[itemIndex].price}, it can be yours!`)
    }


  })

  //4. Filter Shoes by Query Parameters

  const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get("/shoes", (req,res)=>{
    const minPrice = parseInt(req.query["min-price"])
    const maxPrice = parseInt(req.query["max-price"])
    const type = req.query["type"]

    const filteredShoes = shoes
        .filter((shoe=> !minPrice || shoe.price>= minPrice))
        .filter((shoe=> !maxPrice || shoe.price<= maxPrice))
        .filter((shoe=> !type || shoe.type === type))
   
       //res.json(filteredShoes)
       const responseText = filteredShoes.map(shoe=>{
        return `shoe:${shoe.name},price: ${shoe.price}, type: ${shoe.type}`
       }).join("<br>")

res.send(responseText)

    
})




app.listen(3000,()=>{
    console.log("Listening on port 3000")
})