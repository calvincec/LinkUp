const { config } = require('dotenv');
const mssql = require('mssql');
const { sqlConfig } = require('../Config/config');
const {v4} = require('uuid')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const newuser = async(req,res)=>{
    try {
        const userid = v4()
        const {profilepic, bio, username, email, password} = req.body
        const hashedPwd = await bcrypt.hash(password, 5)
        const pool  = await mssql.connect(sqlConfig)
        if(pool.connected){
            
            const out = await pool.request()
            .input('userid', mssql.VarChar, userid)
            .input('profilepic', mssql.VarChar, profilepic)
            .input('bio', mssql.VarChar, bio)
            .input('username', mssql.VarChar, username)
            .input('email', mssql.VarChar, email)
            .input('password', mssql.VarChar,hashedPwd )
            .execute('registerUserProc')

            if(out.rowsAffected==1){  
                return res.status(200).json({
                    message: "User registered successfully",
                })}
            else{
                    return res.status(400).json({message: "User not registered successfully"})
            }
            
        }
    } catch (error) {
        
        if (error.message.includes('Violation of UNIQUE KEY')) {
          return res.status(400).json({ error: "The email you have entered exists, log in instead?" });
        }
        if (error.code.includes('EPARAM')) {
            return res.status(400).json({ error: "Kindly input the correct parameters" });
        }
        return res.status(500).json({ error: 'Internal server error' });
      }
    }      
const loginuser = async(req,res)=>{
    try {
        const {email, password} = req.body
        const pool  = await mssql.connect(sqlConfig)
        const user = (await pool.request().input('email', mssql.VarChar, email).execute('userLogin')).recordset[0]
        
        
        if(user){
            const hashedPwd = user.password
            const comparePwd = await bcrypt.compare(password, hashedPwd)
            if(comparePwd){
                const {password, ...payload} = user  
                const token = jwt.sign(payload, process.env.SECRET, {expiresIn: '36000s'}) 
                return res.status(200).json({
                    message : "Logged in",
                    token
                })
            }else{
                return res.status(400).json({
                    message: 'Wrong password'
                })
            }
        }else{
            return res.status(400).json({mesage: "Email does not exist"})
        }
        
    } catch (error) {
        return res.status(404).json({error: 'kindly input the right credentials'})
    }
}

const updateuser = async(req,res)=>{
    
    try {
        const {profilepic, bio, username, email} = req.body
        const userid = req.params
        const pool  = await mssql.connect(sqlConfig)
        if(pool.connected){
            
            const out = await pool.request()
            .input('userid', mssql.VarChar, userid)
            .input('profilepic', mssql.VarChar, profilepic)
            .input('bio', mssql.VarChar, bio)
            .input('username', mssql.VarChar, username)
            .input('email', mssql.VarChar, email)
            .execute('updateUserProc')

            if(out.rowsAffected==1){  
                return res.status(200).json({
                    message: "User registered successfully",
                })}
            else{
                    return res.status(400).json({message: "User not registered successfully"})
            }
        }

        
        
    } catch (error) {
        return res.status(404).json({error})
    }
}

module.exports = {
    newuser,
    loginuser,
    updateuser
}