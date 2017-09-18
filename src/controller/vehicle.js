import mongoose from 'mongoose';
import {Router} from 'express';
import Manufacturer from '../model/manufacturer';
import CarModel from '../model/carmodel';
import ModelEngine from '../model/modelengine';

import {authenticate} from '../middleware/authMiddleware';

export default({config, db})=>{
    let api = Router();

     //**********************Manufcturers */

      // '/v1/vehicle//manufacturer/add' -CREATE     
        api.post('/manufacturer/add', authenticate, (req,res)=>{
            let newManufacturer = new Manufacturer();
            newManufacturer.name= req.body.name;         
    
            newManufacturer.save(err =>{
                if(err){
                    res.setEncoding(err);
                }
                res.json({message: 'Manufacturer created successfully'});
            });
        });


    //   // '/v1/vehicle//manufacturer/' -READ
      api.get('/manufacturer', (req,res)=>{
            Manufacturer.find({}, (err, manufacturers)=>{
                if(err){
                    res.send(err);
                }
                res.json(manufacturers);
            });
        });

    //   // '/v1/vehicle//manufacturer/:id' -READ BY ID
     api.get('/manufacturer/:id', (req,res)=>{
            Manufacturer.findById(req.params.id, (err, manufacturer)=>{
                if(err){
                    res.send(err);
                }
                res.json(manufacturer);
            });
        });

    //   // '/v1/vehicle//manufacturer/:id' -UPDATE BY ID
             api.put('/manufacturer/:id', authenticate, (req,res)=>{
            Manufacturer.findById(req.params.id, (err, manufacturer)=>{
                if(err){
                    res.send(err);
                }
                console.log(`Manufacturer found, name= ${manufacturer.name}`);
                manufacturer.name = req.body.name;               
                manufacturer.save((err)=>{
                    if(err){
                        res.send(err);
                    }
                    res.json({message: 'Manufacturer info updated!'});
                });
               
            });
        });


      // '/v1/vehicle//manufacturer/:id' -DELETE BY ID
     api.delete('/manufacturer/:id', authenticate, (req,res)=>{
            Manufacturer.remove({
                _id: req.params.id
            }, (err)=>{
                if(err){
                    res.send(err, manufacturer);
                }
                res.json({message: 'Manufacturer Removed'});
            });            
        });


     //**********************Models */

// '/v1/vehicle//model/add' -CREATE     
api.post('/model/add/:id', authenticate, (req,res)=>{
    Manufacturer.findById(req.params.id, (err,manufacturer)=>{
        if(err){
            res.send(err);
        }
        let newModel = new CarModel();
        newModel.title = req.body.title;       
        newModel.manufacturer = manufacturer._id;
        newModel.save((err, model)=>{
            if(err){
                res.send(err);
            }    
           
             res.json({message: 'Review Successfully saved'});        
           
        });
    });
});

//   // '/v1/vehicle/model/' -READ
api.get('/model/', (req,res)=>{
    CarModel.find({}, (err, models)=>{
        if(err){
            res.send(err);
        }
        res.json(models);
    });
});

//   // '/v1/vehicle/model/' -READ BY MANUFACTURER
api.get('/model/:manu', (req,res)=>{
    CarModel.find({manufacturer: req.params.manu}, (err, models)=>{
        if(err){
            res.send(err);
        }
        res.json(models);
    });
});

//   // '/v1/vehicle/model/:id' -READ BY ID
api.get('/model/:id', (req,res)=>{
    CarModel.findById(req.params.id, (err, model)=>{
        if(err){
            res.send(err);
        }
        res.json(model);
    });
});

//   // '/v1/vehicle//manufacturer/:id' -UPDATE BY ID
     api.put('/model/:id', authenticate, (req,res)=>{
    CarModel.findById(req.params.id, (err, model)=>{
        if(err){
            res.send(err);
        }
        
        model.name = req.body.name;  
        model.manufacturer = req.body.manufacturer;             
        model.save((err)=>{
            if(err){
                res.send(err);
            }
            res.json({message: 'Model info updated!'});
        });
       
    });
});


// '/v1/vehicle//manufacturer/:id' -DELETE BY ID
api.delete('/model/:id', authenticate, (req,res)=>{
    CarModel.remove({
        _id: req.params.id
    }, (err)=>{
        if(err){
            res.send(err, model);
        }
        res.json({message: 'CarModel Removed'});
    });            
});



    //**********************Engines */
    // '/v1/vehicle/engine/add/:id' -CREATE     
    api.post('/engine/add/:id', authenticate, (req,res)=>{
        CarModel.findById(req.params.id, (err,model)=>{
            if(err){
                res.send(err);
            }
            let newEngine = new ModelEngine();
            newEngine.title = req.body.title;            
            newEngine.model = model._id;
            newEngine.save((err, engine)=>{
                if(err){
                    res.send(err);
                }
                model.engines.push(newEngine);
                model.save((err,model)=>{
                    if(err){
                        res.send(err);
                    }
                    res.json({message: 'Model Engine Successfully saved'}); 
                });
               
            });
        });
    });



//   // '/v1/vehicle/model/' -READ
api.get('/engine/', (req,res)=>{
    ModelEngine.find({}, (err, engines)=>{
        if(err){
            res.send(err);
        }
        res.json(engines);
    });
});

//   // '/v1/vehicle/engine/:model' -READ BY MODEL
api.get('/engine/:model', (req,res)=>{
    ModelEngine.find({model: req.params.model}, (err, engines)=>{
        if(err){
            res.send(err);
        }
        res.json(engines);
    });
});

//   // '/v1/vehicle/model/:id' -READ BY ID
api.get('/model/:id', (req,res)=>{
    CarModel.findById(req.params.id, (err, model)=>{
        if(err){
            res.send(err);
        }
        res.json(model);
    });
});

//   // '/v1/vehicle//model/:id' -UPDATE BY ID
     api.put('/model/:id', authenticate, (req,res)=>{
    CarModel.findById(req.params.id, (err, model)=>{
        if(err){
            res.send(err);
        }
        
        model.name = req.body.name;  
        model.manufacturer = req.body.manufacturer;             
        model.save((err)=>{
            if(err){
                res.send(err);
            }
            res.json({message: 'Model info updated!'});
        });
       
    });
});


// '/v1/vehicle//model/:id' -DELETE BY ID
api.delete('/model/:id', authenticate, (req,res)=>{
    CarModel.remove({
        _id: req.params.id
    }, (err)=>{
        if(err){
            res.send(err, model);
        }
        res.json({message: 'CarModel Removed'});
    });            
});


     //**********************Engine Codes */



      //**********************Torgues */
    
    

        return api;
    
}