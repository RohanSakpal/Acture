const express = require('express');
const router = express.Router();
const authenticate = require('../utils/authenticateAdmin');
//const config = require('../utils/config');
const jwt = require('jsonwebtoken');
//const { response } = require('express');
const secret = '519ea5a33cc767925027086b59c829579ac408ac74296ebbeb877dcbb092e85acebc47e7';
const crypto = require('crypto');
const mssqlService = require('../services/mssql.service');
const secrets = 'abcdefg'
const bcrypt = require('bcrypt');

 
 
router.post('/login', async (req, res) => {
    const { Username, Password } = req.body;
    try {
        mssqlService.getAllData().then( result =>{
           // console.log( "inside route getall",result);
            for (let i = 0; i < result.length; i++) {
                if(result[i].userName == Username){
                    let accessToken = jwt.sign({
                        userName : result[i].userName,  
                    }, secret, { expiresIn: '1h' });

                    const Nrespo ={
                        Username,
                        Password,
                         accessToken
                    }
                    mssqlService.postTokenData(Nrespo);
                    return res.send({
                        statusCode: 200,
                        data: {accessToken,
                            },
                        message: 'User Login successful'
                    });
               
                  break;  
                }
                
              }
            });
        }catch (err) {
            //  console.log('error', err);
             return res.status(500).send({
                 statusCode: 2000,
                 data: err,
                 message: err.message
             });
         }
        });
 
router.post('/createuser',  async (req, res) => {
   //  console.log(req.body);
   const { UserName, TempPassword,GivenName,Surname,Role,ConfirmPassword,UserType
} = req.body;
try{
// mssqlService.getAllData().then( result =>{
//      console.log( "inside getall",result);
//      for (let i = 0; i < result.length; i++) {
//          if(result[i].UserName == UserName){
//              return res.send({
//                  statusCode: 400,
//                  message: 'User Already Exist'
//              });
        
//            break;  
//          }
         
//        }
//      });
    
     const NewResponse = {
        UserName,
        TempPassword,
        GivenName,
        Surname,
        Role,
        ConfirmPassword,
        UserType
     }
                    // add that to database
                     mssqlService.postInData(NewResponse);
                        return res.status(200).send({
                            statusCode: 200,
                            message: 'New User Create successfully'
                     });
                    
                } catch (err) {
                   //  console.log('error', err);
                    return res.status(500).send({
                        statusCode: 2000,
                        data: err,
                        message: err.message
                    });
                }
                 
               
            });

            
router.post('/resetpassword',  async (req, res) => {
    //  console.log(req.body);
    const { UserId, newPassword,confirmPassword } = req.body;
 try{
      const NewPassResponse = {
        UserId,
        newPassword,
        confirmPassword
      }
                     // add that to database
                      mssqlService.ResetPasswordById(NewPassResponse);
                         return res.status(200).send({
                             statusCode: 200,
                             message: 'User Password Reset successfully'
                      });
                     
                 } catch (err) {
                    //  console.log('error', err);
                     return res.status(500).send({
                         statusCode: 2000,
                         data: err,
                         message: err.message
                     });
                 }
                  
                
             });

        
module.exports = router;