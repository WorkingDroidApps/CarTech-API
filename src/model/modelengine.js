import mongoose from 'mongoose';
import CarModel from './carmodel';
//import CarModelEngine from './modelengine';
let Schema = mongoose.Schema;

let ModelEngineSchema = new Schema({
    title : {
        type: String,
        required: true
    },    
    model: {
        type: Schema.Types.ObjectId,
        ref: 'CarModel',
        required: true
    }
});

module.exports = mongoose.model('ModelEngine', ModelEngineSchema);