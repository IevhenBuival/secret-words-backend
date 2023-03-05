import { RequestHandler } from "express";
import createHttpError from "http-errors";
import usersModel from "../model/users";

export const requiresRights:RequestHandler = (req,res,next) =>{
    async function CheckRights() {
        try {
            if (req.session.userId) {
               
                const user = await usersModel.findById(req.session.userId).select("+rights").exec();
                if (user && (user.rights === 'admin')) {
                 next(); } else {
                    next(createHttpError(401, "User not have rights"));
                }
            } else {
                next(createHttpError(401, "User not authentificated"));
            }
        } catch (error) {
            console.error(error);
            next(createHttpError(401, "Unknown user"));
        }
       
    }
    CheckRights();
};