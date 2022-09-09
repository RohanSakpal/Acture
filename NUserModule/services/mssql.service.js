const { response } = require('express');
const {
    poolPromise
} = require('../connection/mssql-db');

const getAllData = async(req,res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
        .query(`SELECT * FROM NewUser`)
        if(result){
           // console.log("Getall method",result.recordset);
            return result.recordset;
        }else{
            return null
        }
    } catch (err) {
        return err
    }
}

const getDataById = async(userName,res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
        .query(`SELECT userName FROM Users where userID = ${userName}`)
        if(result){
            return result.recordset;
        }else{
            return null
        }
    } catch (err) {
        res.status(500);
        return err;
        
    }
}

const ResetPasswordById = async(req,res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
        .query(     
            `UPDATE NewUser
            SET TempPassword = '${req.newPassword}'
            WHERE userID = '${req.UserId}'`)
        if(result){
            return result.recordset;
        }else{
            return null
        }
    } catch (err) {
        return err;   
    }
}

const postInData = async (req,res) => {
   // console.log("insidepost data",req.Newrespone);
    
   // console.log("insidepost New reqdata",req.Accesstoken);
    try {
        const pool = await poolPromise ;
        const result = await pool.request()
        // .input(req.userName,req.password,req.Accesstoken)
        // .execute("USP_UserPost")
        .query(     
    `INSERT INTO NewUser (UserName, TempPassword,GivenName,Surname,Role,ConfirmPassword,UserType)
    VALUES ('${req.UserName}', '${req.TempPassword}','${req.GivenName}','${req.Surname}','${req.Role}',
    '${req.ConfirmPassword}','${req.UserType}')`
        )
        
        if(result){
            return result.recordset;
        }
        else{
            return null
        }
    } catch (error) {
        
       return error;
        
    }
}


const postTokenData = async (req,res) => {
    //console.log("insidepost data",req.userName);
     
   // console.log("insidepost New reqdata",req.accessToken);
     try {
         const pool = await poolPromise ;
         const result = await pool.request()
         // .input(req.userName,req.password,req.Accesstoken)
         // .execute("USP_UserPost")
         .query(     
     `UPDATE Users
     SET Accesstoken = '${req.accessToken}'
     WHERE userName = '${req.Username}'`
         )
         
         if(result){
             return result.recordset;
         }
         else{
             return null
         }
     } catch (error) {
         
        return error;
         
     }
 }

module.exports ={
    postInData:postInData,
    getDataById:getDataById,
    getAllData:getAllData,
    postTokenData:postTokenData,
    ResetPasswordById:ResetPasswordById
}