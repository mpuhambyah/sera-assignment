const express = require("express");
const router = express.Router();
const createError = require('http-errors');
const User = require('../models/user.model.js');
const {
    authSchema
} = require('../config/validation_schema.js');
const {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
    deleteRefreshToken
} = require('../config/jwt_config.js');
const {
    create
} = require("../models/user.model.js");

router.post('/register', async (req, res, next) => {
    try {
        const result = await authSchema.validateAsync(req.body);

        const doesExist = await User.findOne({
            email: result.email
        });
        if (doesExist) throw createError.Conflict(`${result.email} is already been registered`);
        const user = new User(result);
        const savedUser = await user.save();
        const accessToken = await signAccessToken(savedUser.id);
        const refreshToken = await signRefreshToken(savedUser.id);
        res.send({
            accessToken,
            refreshToken
        });

    } catch (error) {
        if (error.isJoi === true) error.status = 422
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const result = await authSchema.validateAsync(req.body);

        const user = await User.findOne({
            email: result.email
        })
        if (!user) throw createError.NotFound("User not registered");
        const isMatch = await user.isValidPassword(result.password);
        if (!isMatch) throw createError.Unauthorized("Username/password not valid")

        const accessToken = await signAccessToken(user.id);
        const refreshToken = await signRefreshToken(user.id);

        res.send({
            accessToken,
            refreshToken
        });
    } catch (error) {
        if (error.isJoi === true) return next(createError.BadRequest("Invalid username/password"))
        next(error)
    }
})

router.post('/refresh-token', async (req, res, next) => {
    try {
        const {
            refreshToken
        } = req.body
        if (!refreshToken) throw createError.BadRequest();
        const userId = await verifyRefreshToken(refreshToken);

        const accessToken = await signAccessToken(userId)
        const refToken = await signRefreshToken(userId)
        res.send({
            accessToken: accessToken,
            refreshToken: refToken
        })
    } catch (error) {
        next(error)
    }
})

router.delete('/logout', async (req, res, next) => {
    try {
        const {
            refreshToken
        } = req.body
        if (!refreshToken) throw createError.BadRequest();
        const userId = await deleteRefreshToken(refreshToken)
        res.send("logout route");
    } catch (error) {
        next(error);
    }
})

module.exports = router;