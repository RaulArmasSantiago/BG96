import mongoose from 'mongoose';

const Schema = mongoose.Schema

const DataAzureSchema = new Schema({
    "create_at":{
        type:Date,
        default: new Date()
    },
    "latitud":{
        type:String,
        required:true
    },"longitud":{
        type:String,
        required:true
    }
},{collection:"DataAzure", timestamps:true});
export default mongoose.model('DataAzure',DataAzureSchema)

