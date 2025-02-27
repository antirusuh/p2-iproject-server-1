const { User, Petition, Sign } = require('../models');
const { verify } = require('../helpers/jwt');

const authentication = async (req, res, next) => {
    let { access_token } = req.headers

    try {
        const { id } = verify(access_token)

        const user = await User.findByPk(id)

        if (!user) {
            throw ({
                name: 'Unauthorized',
                message: 'Your sesssion is over please re-login'
            })
        }
        else {
            req.user = {
                id: user.id
            }

            next()
        }
    }
    catch (err) {
        next(err)
    }
}

const noRepeatSign = async (req, res, next) => {
    let petitionId = +req.params.id
    let userId = req.user.id

    console.log(petitionId, '*******PETITION ID');
    console.log(userId, '*******USER ID');
    try {
        const petition = await Petition.findByPk(petitionId)
        if (!petition) {
            throw ({
                name: 'NotFound',
                message: 'There are no such Petition'
            })
        } else {
            const sign = await Sign.findOne({
                where: {
                    userId
                }
            })

            console.log(sign, '===== ini isi sign');
            if (sign) {
                throw ({
                    name: 'Forbidden',
                    message: 'You already sign this petition'
                })
            } else {
                next()
            }
        }
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    authentication,
    noRepeatSign
}