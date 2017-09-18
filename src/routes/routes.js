import express from 'express';
import config from '../config/config';
import middleware from '../middleware/middleware';
import initializeDb from '../db';
import vehicle from '../controller/vehicle';


let router = express();

//connect to db
initializeDb(db=>{

    //internal middleware
    router.use(middleware({config, db}));
    //api routes v1 (/v1)
    router.use('/vehicle', vehicle({config, db}));
   

});

export default router;