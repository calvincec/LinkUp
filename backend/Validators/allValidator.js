const joi=require('joi')

// user validators
const updateuserValidator=joi.object({
    username:joi.string().min(5).max(20).messages({
        'username.empty':'Please Input Your user name with length 5 to 20' }),
        
    email:joi.string().lowercase().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    bio:joi.string().allow(null).empty(''),
    profilepic:joi.string().allow(null).empty('')
})

const newuserValidator=joi.object({
    username:joi.string().required().min(5).max(20).messages({
        'username.empty':'Please Input Your userName with length 5 to 20' }),
        
    email:joi.string().required().lowercase().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    bio:joi.string(),
    profilepic:joi.string(),
    password:joi.string().required()

}) 
const loginuserValidator=joi.object({
    email:joi.string().required().lowercase().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password:joi.string().required()
})
const followuserValidator=joi.object({
    userid:joi.string().required(),
    followerid:joi.string().required()
})


// post validators
const newPostValidator=joi.object({
    userid:joi.string().required(),
    postwords:joi.string().allow(null).empty(''),
    postpic:joi.string().allow(null).empty('')
})

const updatePostValidator=joi.object({
    postwords:joi.string().allow(null).empty(''),
    postpic:joi.string().allow(null).empty('')
})



module.exports = { 
    newuserValidator, newPostValidator,
    loginuserValidator, updatePostValidator,
    updateuserValidator, 
    followuserValidator 
}