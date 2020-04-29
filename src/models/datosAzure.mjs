import mongoose from 'mongoose';

const Schema = mongoose.Schema

const DataAzureSchema = new Schema({
    
    "IMEI":{
        type:String,
        required: true,
        unique:true
    },
    "latitud":{
        type:String
    },"longitud":{
        type:String
    },
    "create_at":{
        type:Date,
        default: new Date()
    }
},{collection:"DataAzure", timestamps:true});
export default mongoose.model('DataAzure',DataAzureSchema)

