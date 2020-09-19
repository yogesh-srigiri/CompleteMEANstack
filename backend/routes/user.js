const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

router.post("/singup", (req, res, next) => {

    bcrypt.hash(req.body.password, 10).then(hashpassword => {
        const user = new User({
            email: req.body.email,
            password: hashpassword
        });
        user.save()
            .then(result => {
                res.status(201).json({
                    message: 'User created',
                    result: result
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    })

})

router.post("/login", (req, res, next) => {
    let fetcheduser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed"
                })
            }

            fetcheduser = user
            return bcrypt.compare(req.body.password, fetcheduser.password);

        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Auth failed"
                })
            }
            const token = jwt.sign({ email: fetcheduser.email, userId: fetcheduser._id }, 'secret_key_for_this_posts', {
                expiresIn: "1h"
            });

            res.status(200).json({
                token: token,
                expiresIn: 3600
            })


        })
        .catch(err => {
            return res.status(401).json({
                message: "Auth failed"
            })
        })

})


module.exports = router;