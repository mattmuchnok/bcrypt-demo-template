const bcrypt = require(`bcryptjs`)
const chats = []

// chat = {
//      pin: 123,
//      messages: [`hello`, `harry potter`]
// }

module.exports = {
    createMessage: (req, res) => {
        const {pin, message} = req.body

        for (let i = 0; i < chats.length; i++) {
            const existing = bcrypt.compareSync(pin, chats[i].pinHash)

            if (existing) {
                chats[i].messages.push(message)

                console.log(chats)
                const chatObjCopy = {...chats[i]}
                delete chatObjCopy.pinHash
                res.status(200).send(chatObjCopy)
                return
            }
        }

        let salt = bcrypt.genSaltSync(5)

        const pinHash = bcrypt.hashSync(pin, salt)

        // bcrypt.hashSync(pin, salt)

        const newChat = {
            pinHash: pinHash,
            messages: [message]
        }

        chats.push(newChat)
        let chatObjCopy = {...newChat}
        delete chatObjCopy.pinHash
        console.log(chats)
        res.status(200).send(chatObjCopy)
    }
}