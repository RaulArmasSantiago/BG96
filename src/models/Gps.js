import mongoose from 'mongoose';

const Schema = mongoose.Schema

const Gps = new Schema({
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
},{collection:"Gps", timestamps:true});
export default mongoose.model('Gps',Gps)

