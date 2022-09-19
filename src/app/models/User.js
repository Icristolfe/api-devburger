import Sequelize, { Model } from 'sequelize'

import bcrypt from 'bcrypt'

class User extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            admin: Sequelize.BOOLEAN
        }, {
            sequelize
        })

        // Criptografia de senha 

        super.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 10)
            }
        })
        return this
    }

    passwordCheck(password) {
        return bcrypt.compare(password, this.password_hash)
    }
}

export default User