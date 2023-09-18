const {Router} = require('express');
const { fpassword } = require('../emailService/resetPassword');

const updatepwd = Router()

updatepwd.put('/:email', fpassword)

module.exports = {
    updatepwd
}