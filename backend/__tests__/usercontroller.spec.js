import mssql from 'mssql'
import {v4 as uuid} from 'uuid';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { changepwd, checkEmail, checkToken, deleteUser, followUser, following, newuser, otherUsers, peopleymk, unfollow, updateuser, userViewAllFollowers } from '../controllers/usercontroller';

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
} 

jest.mock('uuid', ()=>({v4: (()=> '123456789')}))

describe('add new user', ()=>{
    const req  = {
        body: {
            profilepic: "https://images.pexels.com/photos/428333/pexels-photo-428333.jpeg?auto=compress&cs=tinysrgb&w=600",
            bio: "The african guy",
            username: "Spenser selover",
            email: "kelchospec@gmail.com",
            password: "12345678"
        }
    }
    it('should register successfully', async()=>{
        jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("erongori");
        const mockedInput = jest.fn().mockReturnThis()//for chained inputs on after the request pool connection succesfull
        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute

        }
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

        await newuser(req, res)

        //username is a spyon on uuid, password is a spyon on bcrypt
        expect(mockedInput).toHaveBeenCalledWith('bio', mssql.VarChar, req.body.bio)
        expect(mockedInput).toHaveBeenCalledWith('userid', mssql.VarChar, '123456789')
        expect(mockedInput).toHaveBeenCalledWith('username', mssql.VarChar, req.body.username)
        expect(mockedInput).toHaveBeenCalledWith('profilepic', mssql.VarChar, req.body.profilepic)
        expect(mockedInput).toHaveBeenCalledWith('email', mssql.VarChar, req.body.email)
        expect(mockedInput).toHaveBeenCalledWith('password', mssql.VarChar, "erongori")
        expect(mockedExecute).toHaveBeenCalledWith('registerUserProc')

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({message: "User registered successfully"})

    })
    it('should return an error is the user is not registered', async()=>{
        jest.spyOn(bcrypt, "hash").mockResolvedValue("erongori");
        const mockedInput = jest.fn().mockReturnThis()//for chained inputs on after the request pool connection succesfull
        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [0]})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute

        }
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

        await newuser(req, res)

        expect(mockedInput).toHaveBeenCalledWith('bio', mssql.VarChar, req.body.bio)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: "User not registered successfully"})
    })
})

// describe('Log in user', ()=>{
//     it('should log in user successfully', =>{

//     })
// })

describe('Checkemail', ()=>{
    it("should find an email successfully", async()=>{
        const req = {
            params: {email: 'email'}
        }
        const mockedInput = jest.fn().mockReturnThis()
        const mockedExecute = jest.fn().mockResolvedValue({recordset: [1]})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute

        }
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

        await checkEmail(req,res)
        expect(res.json).toHaveBeenCalledWith({message: "email found"})
        expect(res.status).toHaveBeenCalledWith(200)
        
    })
    it('should return email not found if not found', async()=>{
        const req = {
            params: {email: 'email'}
        }
        const mockedInput = jest.fn().mockReturnThis()
        const mockedExecute = jest.fn().mockResolvedValue({recordset: []})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute

        }
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

        await checkEmail(req,res)
        expect(res.json).toHaveBeenCalledWith({error: "email not found"})
        expect(res.status).toHaveBeenCalledWith(400)
    })
})

describe('Change password', ()=>{
    const req = {
        params: {email: 'email'},
        body: {password: "fakepassword"}
    }
    it('change password in a success', async()=>{
        jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("erongori");
        const mockedInput = jest.fn().mockReturnThis()
        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute

        }
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

        await changepwd(req, res)

        expect(res.json).toHaveBeenCalledWith({message: "Password changed"})
        expect(res.status).toHaveBeenCalledWith(200)
    })
    it('Fails to change password', async()=>{
        jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("erongori");
        const mockedInput = jest.fn().mockReturnThis()
        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [0]})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute

        }
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

        await changepwd(req, res)

        expect(res.json).toHaveBeenCalledWith({error: "Password not changed"})
        expect(res.status).toHaveBeenCalledWith(400) 
    })
})

describe('Update user details', ()=>{
    const req = {
        body: {
            username: 'hhhkkksmclsmc',
            email: 'calyndemo16@gmail.com',
            bio: 'biology',
            profilepic: 'picture.com'
        },
        params: {userid:'userid'}
    }

    it ('should update user details', async()=>{
        const mockedInput = jest.fn().mockReturnThis()
        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute

        }
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

        await updateuser(req,res)
        expect(res.json).toHaveBeenCalledWith({ message: "Details updated successfully"})
        expect(res.status).toHaveBeenCalledWith(200)
    })
    
        it ('should return an error if the user entered does not exist', async()=>{
        const mockedInput = jest.fn().mockReturnThis()
        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [0]})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute

        }
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

        await updateuser(req,res)
        expect(res.json).toHaveBeenCalledWith({error: "The user you have entered does not exist"})
        expect(res.status).toHaveBeenCalledWith(400)
    })

    it ('should return error is the email is not valid', async()=>{
        const req = {
            body: {
                username: 'hhhkkksmclsmc',
                email: 'wrongemail',
                bio: 'biology',
                profilepic: 'picture.com'
            },
            params: {userid:'userid'}
        }
        await updateuser(req,res)
        expect(res.json).toHaveBeenCalledWith({error: "\"email\" must be a valid email"})
        expect(res.status).toHaveBeenCalledWith(422)
    })
    it ('should username is empty', async()=>{
        const req = {
            body: {
                username: '',
                email: 'calyndemo16@gmail.com',
                bio: 'biology',
                profilepic: 'picture.com'
            },
            params: {userid:'userid'}
        }
        await updateuser(req,res)
        expect(res.json).toHaveBeenCalledWith({error: "\"username\" is not allowed to be empty"})
        expect(res.status).toHaveBeenCalledWith(422)
    })
    it ('should return error if username lenght is less than 5 characters', async()=>{
        const req = {
            body: {
                username: 'pi',
                email: 'calyndemo16@gmail.com',
                bio: 'biology',
                profilepic: 'picture.com'
            },
            params: {userid:'userid'}
        }
        await updateuser(req,res)
        expect(res.json).toHaveBeenCalledWith({error: "\"username\" length must be at least 5 characters long"})
        expect(res.status).toHaveBeenCalledWith(422)
    })
})

describe('get other users', ()=>{
    const req = {
        params: {userid: "userid"}
    }

    const otherusers = [
        {
            userid: "127b0227-57e0-415e-8f75-f1f81827b047",
            username: "james",
            profilepic: "http://res.cloudinary.com/dzuzy670c/image/upload/v1695026116/pnejm2jxptgg7tpytqtu.jpg",
            bio: "how you",
            createdat: "2023-09-11T21:50:20.423Z",
            email: "jose90@gmail.com"
          },
          {
            userid: "62c7c30c-05fa-45ab-9c2f-be40fcf42cff",
            username: "Ngatia Mwai",
            profilepic: null,
            bio: null,
            createdat: "2023-09-11T21:52:08.450Z",
            email: "mwai@gmail.com"
          }
    ]
    it('Should return all the other users', async()=>{
        const mockedInput = jest.fn().mockReturnThis()
        const mockedExecute = jest.fn().mockResolvedValue({recordset: otherusers})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute

        }
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

        await otherUsers(req, res)

        expect(res.status).toHaveBeenCalledWith(200)


    })
})

describe('Delete user', ()=>{
    const req = {
        params: {userid: 'userid'}
    }
    it('Should delete a user successfully', async()=>{
        const mockedInput = jest.fn().mockReturnThis()
        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute

        }
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

        await deleteUser(req,res)

        expect(res.json).toHaveBeenCalledWith({message: "user deleted successfully"})
        expect(res.status).toHaveBeenCalledWith(200)
    })

    it('Should Return an error if the user does not exist', async()=>{
        const mockedInput = jest.fn().mockReturnThis()
        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [0]})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute

        }
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

        await deleteUser(req,res)

        expect(res.json).toHaveBeenCalledWith({Error: "The user you have entered does not exist"})
        expect(res.status).toHaveBeenCalledWith(400)
    })
})

describe('Follow user', ()=>{
    const req = {
        body: {
            userid: "userid",
            followerid: 'followerid'
        }

        
    }
    it('should follow a user succesfully', async()=>{
        const mockedInput = jest.fn().mockReturnThis()
        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute

        }
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

        await followUser(req, res)

        expect(res.json).toHaveBeenCalledWith({message: "user followed"})
        expect(res.status).toHaveBeenCalledWith(200)
        
        expect(mockedInput).toHaveBeenCalledWith('userid', mssql.VarChar, req.body.userid)
        expect(mockedInput).toHaveBeenCalledWith('followerid', mssql.VarChar, req.body.followerid)
        expect(mockedInput).toHaveBeenCalledWith('followid', mssql.VarChar, '123456789')
    })

    it('should not follow user', async()=>{
        const mockedInput = jest.fn().mockReturnThis()
        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [0]})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute

        }
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

        await followUser(req, res)

        expect(res.json).toHaveBeenCalledWith({error: "user not followed"})
        expect(res.status).toHaveBeenCalledWith(400)
    })
})

describe('user view all followers', ()=>{
    const req = {
        params: {userid: 'sampleuserid'}
    }
    const followers = [
        {
          followerid: "127b0227-57e0-415e-8f75-f1f81827b047",
          username: "james",
          bio: "how you",
          email: "jose90@gmail.com",
          profilepic: "http://res.cloudinary.com/dzuzy670c/image/upload/v1695026116/pnejm2jxptgg7tpytqtu.jpg"
        }
      ]
    it('should list all followers', async()=>{
        const mockedInput = jest.fn().mockReturnThis()
        const mockedExecute = jest.fn().mockResolvedValue({recordset: followers})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute

        }
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)
        await userViewAllFollowers(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({followers: followers})
    })
})

describe('unfollow user', ()=>{
    const req = {
        body: {userid: 'sampleuserid',
                followerid: 'samplefollowerid'
            }
    }
    it('should follow user succesfully', async()=>{
        const mockedInput = jest.fn().mockReturnThis()
        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute

        }
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

        await unfollow(req, res)

        expect(mockedInput).toHaveBeenCalledWith('userid', mssql.VarChar, req.body.userid)
        expect(mockedInput).toHaveBeenCalledWith('followerid', mssql.VarChar, req.body.followerid)
        expect(mockedExecute).toHaveBeenCalledWith('unfollowProc')
        
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({message: "user unfollowed"})
    })

    it('should return error if user not existing', async()=>{
        const mockedInput = jest.fn().mockReturnThis()
        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [0]})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute

        }
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

        await unfollow(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({error: "user does not exist"})
    })
    it('should return an error if  input is blank', async()=>{
        const req = {
            body: {userid: '',
                    followerid: 'samplefollowerid'
                }
        }
        await unfollow(req, res)

        expect(res.json).toHaveBeenCalledWith({error: "\"userid\" is not allowed to be empty"})
        expect(res.status).toHaveBeenCalledWith(422)
    })
})

describe('user view all he/she follows', ()=>{
    const req = {
        params: {userid: 'sampleuserid'}
    }
    const followingi =  [
        {
          userid: "dbfdc252-15ae-44fa-ad24-4dbcf73fe09e",
          username: "Spenser selover",
          bio: "The african guy",
          email: "kelchospec@gmail.com",
          profilepic: "https://images.pexels.com/photos/428333/pexels-photo-428333.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
    ]
    it('should generate all the ones following', async()=>{
        const mockedInput = jest.fn().mockReturnThis()
        const mockedExecute = jest.fn().mockResolvedValue({recordset: followingi})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute

        }
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

        await following(req,res)

        expect(mockedExecute).toHaveBeenCalledWith('followingProc')
        expect(mockedInput).toHaveBeenCalledWith('userid', mssql.VarChar, req.params.userid)
        expect(res.json).toHaveBeenCalledWith({following: followingi})
        expect(res.status).toHaveBeenCalledWith(200)
    })
})

describe('getting people you may know', ()=>{
    const req = {
        params: {userid: 'sampleuserid'}
    }
    const peoplmk = [
        {
          userid: "7fc2346a-bc0b-41fd-878c-d348e203fcff",
          profilepic: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
          bio: "I like laughing",
          username: "Kevo guy",
          email: "kevo@gmail.com",
          createdat: "2023-09-12T08:53:37.733Z"
        },
        {
          userid: "88223715-2535-4a23-a25e-c8446f2d86e5",
          profilepic: "http://res.cloudinary.com/dzuzy670c/image/upload/v1695044555/ebic5f1h5o6u1bh3yik8.jpg",
          bio: "Its how you define.",
          username: "Daniel",
          email: "GAMESMY177@GMAIL.COM",
          createdat: "2023-09-18T16:39:58.947Z"
        }
    ]
    it('should generate all the ones following', async()=>{
        const mockedInput = jest.fn().mockReturnThis()
        const mockedExecute = jest.fn().mockResolvedValue({recordset: peoplmk})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute

        }
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

        await peopleymk(req,res)

        expect(mockedExecute).toHaveBeenCalledWith('peopleymkProc')
        expect(mockedInput).toHaveBeenCalledWith('userid', mssql.VarChar, req.params.userid)
        expect(res.json).toHaveBeenCalledWith({peopleymk: peoplmk})
        expect(res.status).toHaveBeenCalledWith(200)
    })
})

describe('Check Token', ()=>{
    it('ought to generate token information', async()=>{
        const req = {
                info: 'some data here'
            }
        await checkToken(req,res)
        expect(res.json).toHaveBeenCalledWith({userdet: req.info})
        expect(res.status).toHaveBeenCalledWith(200)
    })  
    it('should return an error if the token info is not found', async()=>{
        const req = {}
        await checkToken(req,res)
        expect(res.json).toHaveBeenCalledWith({error: "nothing found"})
        expect(res.status).toHaveBeenCalledWith(400)
    })
})