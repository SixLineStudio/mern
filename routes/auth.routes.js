import {Router} from "express";
import User from "../models/user.js";
import bcrypt from 'bcrypt'
import {check, validationResult} from 'express-validator'
import jwt from 'jsonwebtoken'
import config from "config";

const router = Router()



// /api/auth/register
router.post('/register', [
    check('email', 'Некоруктный емейл').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})
], async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(),
                massage: 'Некоректные данные при регистрации'})
        }
        const {email, password} = req.body
        const candidate = await User.findOne({email})// {email} == {email: email} if key and value equil
        if (candidate) {
            return res.status(400).json({message: 'Такой пользователь существует'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({
            email,
            password: hashedPassword
        })
        await user.save()

        res.status(201).json({message: "Пользователь создан"})

    } catch (e) {
        res.status(500).json({message: 'Что то пошло не так, попробуйте снова  '})
    }
})


router.post('/login',[
    check('email', 'Ввудите коректный емейл').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
], async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(),
                massage: 'Некоректные данные при воде в систему'})
        }
        const {email, password} = req.body
        console.log(email,password)

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message:'Пользователь не найден'})
        }


        const isMath = await bcrypt.compare(password, user.password)
        if(!isMath){
            return res.status(400).json({message: 'Неверный пароль'})
        }
        console.log(user.id)

        let token = jwt.sign({userId: user.id}, config.get("jvtSecret"))
        //let token = jwt.sign({userId: user.id}, config.get("jvtSecret"), {expiresIn: '1h'})

        res.json({token, userId: user.id})

    } catch (e) {
        res.status(500).json({message: 'Что то пошло не так, попробуйте снова  '})
    }
})

export default router