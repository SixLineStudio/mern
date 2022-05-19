import {Router} from "express";
import Link from "../models/Links.js";

const redirRout = Router()

redirRout.get('/:code', async (req, res) => {
    try {
        console.log('fsfsf')
        const link = await Link.findOne({code: req.params.code})
        if (link) {
            link.clicks++
            await link.save()
            return res.redirect(link.from)
        }
        res.status(404).json('Ссыка не найдена')
    } catch (e) {
        res.status(500).json({message: 'Что то пошло не так, попробуйте снова  '})
    }
})

export default redirRout