const express = require('express')
const router = express.Router()
const PrivateInvitees = require('../models/group_invitees_privates')
const validation = require('../middleware/dataValidation')
const { groupSchema } = require("../schemas");
const Users = require('../models/users')

router
.route('/group/:group_id/')
.post(async (req, res) => {
try {
    const { group_id }  = req.params;
    const { userId } = req.body.data
    const users = await PrivateInvitees.privateInvitation(userId, group_id);
    res.status(200).json(users);
} catch (err) {
    res.status(500).json({ err })
}
})

module.exports = router;