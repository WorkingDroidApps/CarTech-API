import mongoose from 'mongoose';
import CarModel from './carmodel';
let Schema = mongoose.Schema;

let ManufacturerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    
    models : [{type: Schema.Types.ObjectId, ref: 'CarModel'}]
});

module.exports = mongoose.model('Manufacturer', ManufacturerSchema);