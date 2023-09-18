const ejs = require('ejs')
const mssql = require('mssql')
const {sqlConfig} = require('../Config/config')
const { sendMail } = require('../Helpers/email')
const {v4} = require('uuid')



const fpassword = async (req, res)=>{
    const email = req.params.email
    const code = v4()

    ejs.renderFile('./Templates/changepwd.ejs', {code: code}, async(error, html)=>{
        const message = {
            from: process.env.EMAIL,
            to: email,
            subject: "Change Password Request",
            html
        }
        try {
            await sendMail(message);
            return res.status(200).json({message: "email sent", code: code})
        } catch (error) {
             return res.status(400).json({Error: error})
        }
    })


   
}

module.exports = {
    fpassword
}