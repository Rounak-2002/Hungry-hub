const mongoose = require('mongoose');
//const mongoURI = 'mongodb+srv://Mernproject:Rounak-2002@cluster0.1citt7j.mongodb.net/foodmania?retryWrites=true&w=majority'
//const mongoURI = 'mongodb://Mernproject:Rounak-2002@ac-zhoggwh-shard-00-00.1citt7j.mongodb.net:27017,ac-zhoggwh-shard-00-01.1citt7j.mongodb.net:27017,ac-zhoggwh-shard-00-02.1citt7j.mongodb.net:27017/foodmania?ssl=true&replicaSet=atlas-130e0r-shard-0&authSource=admin&retryWrites=true&w=majority'
const mongoDB = async() =>{
    await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true}, async(err,result)=>{
        if(err) console.log("---",err)
        else{
            console.log("Connected");
            const fetched_data = await mongoose.connection.db.collection("food_category");
            fetched_data.find({}).toArray( async function(err, data){
                const food_items = await mongoose.connection.db.collection("food_items");
                food_items.find({}).toArray(function (err, catData){
                    if(err) console.log(err);  
                    else{
                        global.food_category = data;
                        global.food_items = catData;
                    }
                })
                // if(err) console.log(err);
                // else{
                //     global.food_category = data;
                //     //console.log(global.food_category);
                // }
            })
        }
    });
}

module.exports = mongoDB;