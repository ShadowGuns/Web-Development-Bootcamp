const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');

    // The fruit schema
    const fruitSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, "Please check your fruit. No name has been specified!"]
        },
        rating: {
            type: Number,
            min: 1,
            max: 10
        },
        review: String
    });

    const Fruit = new mongoose.model("Fruit", fruitSchema);

    const apple = new Fruit({
        name: "apple",
        rating: 7,
        review: "pretty solid as a fruit.",
    });
    const kiwi = new Fruit({
        name: "kiwi",
        rating: 10,
        review: "awesome fruit.",
    });
    const orange = new Fruit({
        name: "orange",
        rating: 9,
        review: "sour but healthy.",
    });
    const banana = new Fruit({
        name: "banana",
        rating: 2,
        review: "i don't like it.",
    });

    // Fruit.insertMany([apple, kiwi, orange, banana]).then(function (result) {
    //     console.log("Item added successfully");
    //     })
    //     .catch(function (err) {
    //         console.log(err);
    //     });

    Fruit.find().then(function(fruits){
        mongoose.connection.close();
        fruits.forEach(function(fruit){
        console.log(fruit.name);
        })
    })
    .catch(function(err){
        console.log(err);
    });
}