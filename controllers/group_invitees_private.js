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
    console.log('.data:::::',req.body.data.userId)
    console.log("req.params::::::",req.params)
    const users = await PrivateInvitees.privateInvitation(userId, group_id);
    res.status(200).json(users);
} catch (err) {
    console.log("invite error:", err)
    res.status(500).json({ err })
}
})
// .post( async (req, res) => {
//     const { post_id } = req.params
//     const { user_id } = req.body
//     console.log("this got called")
//     // Check that user provided exists
//     const user = await Users.find({
//       id: user_id,
//     }).first()
//     // // Check that post provided exists
//     // const post = await Posts.find({
//     //   'p.id': post_id,
//     // }).first()
//     if (user) {
//       // If both user and post exists, create new association
//       const invite = { post_id, user_id }
//       const likeResult = await privateInvitation.privateInvitation(invite)
//       res.status(201).json({
//         likeResult,
//       })
//     } else {
//       res.status(404).json({
//         message: 'User and/or Post provided does not exist',
//       })
//     }
//   })
// .post(async (req, res) => {
//     try {
//         const { email, sender_id } = req.body;
//         const { id } =  req.params;
//         const emailedUser = await Users.find({ email }).first();

//         if(emailedUser) {
//             const user_id = emailedUser.id
//         const privateInvite = await PrivateInvitees.privateInvitation(
//             id,
//             user_id,
//             sender_id
//         );
//         res.status(201).json(privateInvite)
//     } else {
//         res.status(400).json({ message: "That is not a valid email." })
//         }
//     } catch (err) {
//         console.log( 'privateInviteEvvor:', err )
//         res.status(500).json({ err })
//     }
// })

module.exports = router;