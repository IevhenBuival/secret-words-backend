
import app from './app'
import mongoose from "mongoose";
import env from './util/validateEnv';



const port = env.PORT;



mongoose.set('strictQuery', true);
mongoose.connect(env.MONGO_CONECTION_STRING,undefined)
    .then(()=>{
        console.log("Mongoose connected");
        
        app.listen(port,()=>{
            console.log(`server start on ${port} port`);
        });
    })
    .catch(
        console.error
    );

