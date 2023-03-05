import { RequestHandler } from "express";
import createHttpError from "http-errors";
import usersModel from "../model/users";
import bcrypt from 'bcrypt';
import mongoose from "mongoose";


export const getAuthUsers: RequestHandler = async (req, res, next) => {
    try {
        const user = await usersModel.findById(req.session.userId).select("+email");
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const logout: RequestHandler = async (req, res, next) => {
    req.session.destroy(error => {
        if (error) next(error)
        else res.sendStatus(200);
    })
}

interface ISignUpBody {
    username?: string,
    email?: string,
    password?: string,
}

export const signUp: RequestHandler<unknown, unknown, ISignUpBody, unknown> = async (req, res, next) => {
    const usrname = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;

    try {
        if (!usrname || !passwordRaw) throw createHttpError(400, "Parametrs mising");

        const isDoubleUser = await usersModel.findOne({ username: usrname }).exec();

        if (isDoubleUser) throw createHttpError(409, "Username alrady taken. Please choose another or click to forget password link");

        const passwordHashed = await bcrypt.hash(passwordRaw, 10);

        const newUser = await usersModel.create({
            username: usrname,
            email: email,
            password: passwordHashed,
            rights: 'user',
        });
        req.session.userId = newUser._id;
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
}

interface ILoginBody {
    username?: string,
    password?: string
}

export const login: RequestHandler<unknown, unknown, ILoginBody, unknown> = async (req, res, next) => {
    const usrname = req.body.username;
    const passwordRaw = req.body.password;

    try {
        if (!usrname || !passwordRaw) throw createHttpError(400, "Login parameters missing");
        const user = await usersModel.findOne({ username: usrname }).select("+password +email").exec();
        if (!user) throw createHttpError(401, "Invalid credentials");
        const passwordMatch = await bcrypt.compare(passwordRaw, user.password)
        if (!passwordMatch) throw createHttpError(401, "Invalid credentials");
        req.session.userId = user._id;
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const getUsers: RequestHandler = async (req, res, next) => {
    try {
        const users = await usersModel.find().select('+email').exec();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }

};

interface IUpdateUserParams {
    userID?: string,
}
interface IUpdateUserBody {
    email?: string,
    rights?: string,
    password?: string,

}

export const updateUser: RequestHandler<IUpdateUserParams, unknown, IUpdateUserBody, unknown> = async (req, res, next) => {
    const Id = req.params.userID;
    const newEmail = req.body.email;
    const newRights = req.body.rights;
    const newPassword = req.body.password;

    try {
        
        if (!mongoose.isValidObjectId(Id)) throw createHttpError(400, "Invalid user ID:" + Id);
        const searchedRecord = await usersModel.findById(Id).exec();
        if (!searchedRecord) {
            throw createHttpError(404, "user whith id:" + Id + " not found");
        }


        if (newEmail)
            searchedRecord.email = newEmail;
        if (newRights)
            searchedRecord.rights = newRights;
        if (newPassword) {
            const passwordHashed = await bcrypt.hash(newPassword, 10);
            searchedRecord.password = passwordHashed;
        }
        /* searchedword.language = newLanguage;*/

        const UpdatedWord = await searchedRecord.save();

        res.status(200).json(UpdatedWord);

    }
    catch (error) {

        next(error);
    }
};