import mongoose from 'mongoose';
import Manufacturer from './manufacturer';
import ModelEngine from './modelengine';
let Schema = mongoose.Schema;

let ModelSchema = new Schema({
    title : {
        type: String,
        required: true
    },    
    manufacturer: {
        type: Schema.Types.ObjectId,
        ref: 'Manufacturer',
        required: true
    },
    engines : [{type: Schema.Types.ObjectId, ref: 'ModelEngine'}]
});

module.exports = mongoose.model('CarModel', ModelSchema);