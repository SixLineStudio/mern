import {Router} from "express";
import Link from "../models/Links.js";
import auth from "../middlewhere/auth.middlewhere.js";
import config from "config";
import shortid from 'shortid'

const routerLinks = Router()

routerLinks.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const {from} = req.body

        const code = shortid.generate()

        const existing = await Link.findOne({from})
        if (existing) {
           return  res.status(200).json({link: existing})
        }

        const to = baseUrl + '/t/' + code;

        const link = new Link
        ({
            code, to, from, owner: req.user.userId
        })
        await link.save()
        res.status(200).json({link})
    } catch (e) {
        res.status(500).json({message: 'Что то пошло не так, попробуйте снова'})
    }
})

routerLinks.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId})
        console.log(1)
        res.json(links)
    } catch (e) {
        res.status(500).json({message: 'Что то пошло не так, попробуйте снова  '})
    }
})

routerLinks.get('/:id', async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)
        res.json(link)
    } catch (e) {
        res.status(500).json({message: 'Что то пошло не так, попробуйте снова  '})
    }
})
export default routerLinks


