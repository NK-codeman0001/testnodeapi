import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import bodyParser from "body-parser";

 const app = express();
 app.use(express.json()); 
app.use(express.urlencoded({extended:true}));


app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());

const DB = `mongodb+srv://jaimatade:jaishreeram@cluster0.i1uxdtv.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(DB).then(()=>{
    console.log("DB connected")
}).catch((err)=> console.log(`DB not connecte : Error = ${err}`));

import Users from '../model/userSchema.js';


// let users = []; //data will store here 

/*
        todo: 
        1) add DB {done}
        2) send data in form type
        3) make code more optimize
        *4) validations  

     Test API

     c (done) (signup) (post)
     r(done) (login)(get)
     u (done) (login) (patch)
     d

*/

//get users (db done)
router.get('/', async (req,res)=>{
    const records = await Users.find({})
	res.json(records);
})

//delete all users (new)
router.delete('/deleteall', async (req,res)=>{
    await Users.deleteMany({});
    return res.json({ status: 'ok', message: `all users deleted` })
	
})



//change username or password (db done)
router.post('/update/:id', async (req, res) => {
	
	try {
        let message = '';
        const user = await Users.find({_id: req.params.id});
        if(req.body.username && user){
        await Users.updateOne({_id: req.params.id},{ username: req.body.username});
        message += `username updated `;
        } 
        if(req.body.password && user) {
        await Users.updateOne({_id: req.params.id}, {password: req.body.password});     
        message += `password updated `;
        }
        res.json({ status: 'ok', message: `${message}` })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: `${error}` })
	}
})

//read login (db done)
router.get('/login', async (req, res) => {
	const { username, password } = req.body
	const user = await Users.findOne(  {username , password })

    if (user) {
        return  res.json({ status: 'ok' , message : `${user._conditions.username} logged in successfully`});
	}

    else {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}
     
})

//create user (db done)
router.post('/register', async (req, res) => {
   	const { username, password } = req.body
    const user = await Users.find({username: {$eq: username}})
	if (!username) {
		return res.json({ status: 'error', error: 'username is empty' })
	}
    else if (!password) {
		return res.json({ status: 'error', error: 'password is empty' })
	}
    else if (user.length!=0) {
		return res.json({ status: 'error', error: 'username already exist' })
	}

	try {
		Users.create({
			username,
			password,
		});
        return  res.json({ status: 'ok' , message : `${username} created successfully`});

	} catch (error) {
					return res.json({ status: 'error', error: 'User was not creaated' })
	}

})

//delete user using id (db done)
router.delete('/delete/:id', async (req, res) => {
	
	try {
        const response = await  Users.deleteOne({ _id : req.params.id}) ;    
         //search user using id to delete that user;
        if(response.deletedCount) return res.json({ status: 'ok', message: `user deleted` })
	}catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'An error had occured. Please try againg' })
	}
    return res.json({ status: 'error', error: 'User not found' })
})

export default router;