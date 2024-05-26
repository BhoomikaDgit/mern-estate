import express from 'express';
import { test } from '../controllers/user.controller.js';

app.listen(3000,()=>{
    console.log('server is running on the port 3000!');
});

const router=express.Router();

router.get('/test',test);
export default router;