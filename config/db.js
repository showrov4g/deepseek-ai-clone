"use client"
import mongoose from "mongoose";

let cashed = global.mongoose || {conn: null, promise: null}


export default async function connectDB(){
    if(cashed.conn){
        return cashed.conn
    }
    if(!cashed.promise){
      cashed.promise = mongoose.connect(process.env.MONGODB_URI).then((mongoose) => mongoose)
    }
    try {
        cashed.conn = await cashed.promise;
    } catch (error) {
        console.error("Error connection to mongodb", error)
    }
    return cashed.conn
}
console.log(connectDB())