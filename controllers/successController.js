import asyncHandler from 'express-async-handler'
import Admin from '../models/admin.js'



export const SucessCon = asyncHandler (async(req, res, next) =>{
    try {
        const{
            firstName,
            Surname,
            level,
            gender
        }=req.body
        // const admin =await Admin.create({
        //     firstName,
        //     Surname,
        //     level,
        //     gender
        // })
        // const findAdmin = await Admin.findOne({firstName})
        // findAdmin.firstName = firstName || findAdmin.firstName
        // findAdmin.Surname = Surname || findAdmin.Surname
        // findAdmin.level = level || findAdmin.level
        // findAdmin.gender = gender || findAdmin.gender
        // const update = await findAdmin.save()
        const admin = await Admin.findByIdAndDelete(req.params.id)
        res.json({
            status: "am fine ",
            next: "carry on",
            data: admin
        })
        
    } catch (error) {
        next (error)
    }
})