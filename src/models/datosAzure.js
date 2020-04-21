import mongoose from 'mongoose';

const Schema = mongoose.Schema

const DataAzureSchema = new Schema({
    "variable":{
        type:String,
        required:true,
    },
    "create_at":{
        type:Date,
        default: new Date()
    }
},{collection:"DataAzure", timestamps:true});
export default mongoose.model('DataAzure',DataAzureSchema)

