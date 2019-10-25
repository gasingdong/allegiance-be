const express = require('express')
const router = express.Router()
const PrivateInvitees = require('../models/group_invitees_privates')

router
    .route('/:id/privateInvitees')
    .get(async (req, res) => {
    try {
        const { id }  = req.params;
        const users = await PrivateInvitees.findGroupById(id);
        res.status(200).json(users);
    } catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }
})
.post(async (req, res) => {
    try {
        const { email, sender_id } = req.body;
        const { id } =  req.params;
        const emailedUser = await Users.find({ email }).first();

        if(emailedUser) {
            const user_id = emailedUser.id
        const privateInvite = await PrivateInvitees.privateInvitation(
            id,
            user_id,
            sender_id
        );
        res.status(201).json(privateInvite)
    } else {
        res.status(400).json({ message: "That is not a valid email." })
        }
    } catch (err) {
        console.log({ err })
        res.status(500).json()
    }
})