import express from 'express';
import { v4 as uuid } from 'uuid';
const router = express.Router();

let users = []; //data will store here 

/*

     Test API

     c (done) (signup) (post)
     r(done) (login)(get)
     u (done) (login) (patch)
     d

*/

//get users
router.get('/',(req,res)=>{
    res.send(users);
})


//change username or password
router.patch('/update/:id', (req, res) => {
	
	try {
        const user = users.find((user) => user.id === req.params.id);       //search user using unique id to patch (update username or password);

        let message = '';
    console.log(user)
        if(req.body.username) {
        user.username = req.body.username;
        message += `username updated `;
     }
        if(req.body.password) 
        {
            user.password = req.body.password;
            message += `password updated `;
        }
        res.json({ status: 'ok', message: `${message}` })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: ';))' })
	}
})

//read login 
router.get('/login',  (req, res) => {
	const { username, password } = req.body
	const user = users.find((user) =>  user.password === password && user.username === username)
    // console.log(user.username,user.password,req.body);
	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}
    if (user) {
        return  res.json({ status: 'ok' , message : `${user.username} logged in successfully`});
	}
    return res.json({ status: 'error', error: 'Invalid username/password' })
})

//create user
router.post('/register', (req, res) => {
	const { username, password } = req.body

	if (!username || !password) {
		return res.json({ status: 'error', error: 'username/password is empty' })
	}

	try {
		users.push({
			username,
			password,
            id: uuid()
		});
        return  res.json({ status: 'ok' , message : `${username} created successfully`});

	} catch (error) {
					return res.json({ status: 'error', error: 'User was not creaated' })
	}
	res.json({ status: 'ok' })
})

//delete user using id
router.delete('/delete/:id', (req, res) => {
	
	try {
        const user = users.find((user) => user.id === req.params.id);

        users = users.filter((user) => user.id !== req.params.id)      //search user using unique id to delete that user;

        if(user) return res.json({ status: 'ok', message: `${user.username} deleted` })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'An error had occured. Please try againg' })
	}
    return res.json({ status: 'error', error: 'User not found' })
})

export default router;