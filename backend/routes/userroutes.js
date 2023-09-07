const {Router} = require('express');
const { newuser, loginuser, updateuser } = require('../controllers/usercontroller');

const userrouter = Router()

userrouter.post('/register', newuser);
userrouter.post('/login', loginuser);
userrouter.put('/updateuser/:userid', updateuser);



module.exports = {
    userrouter
}