const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/register", async(req, res, next) => {
    
    const salt_rounds = 5;

    const hashedPassword = await bcrypt.hash(req.body.password, salt_rounds);

    try {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: hashedPassword
            }
        })

        const token = jwt.sign({id: user.id}, process.env.JWT);

        res.status(201).send({token, user:{userId: user.id, username: user.username}});

    } catch(err) {
        next(err);
    }
})

module.exports = router;