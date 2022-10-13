
import { v4 } from "uuid"
import User from "../models/User"

import * as Yup from 'yup'

class UserController {
    async store(request, response) {

        // Verificação de dados usando Yup

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
            admin: Yup.boolean(),
        })

        // Tratamento de erros usando TryCatch

        try{
            schema.validateSync(request.body, {abortEarly: false})
        } catch(err) {
            return response.status(400).json({error : err.errors})
        }

        /* Outra  form de validação de dados */
        // if (!(await schema.isValid(request.body))) {
        //     return response.status(404).json({ error: 'Make sure your data is correct' })
        // }

        const { name, email, password, admin } = request.body

        // Verificando se o email ja consta no banco de dados e tratando o possível erro

        const userExists = await User.findOne({
            where: {email}
        })

        if(userExists) {
            return response.status(409).json({error: 'User already exists'})
        }

        // Criação de usuário

        const user = await User.create({
            id: v4(),
            name,
            email,
            password,
            admin,
        })

        return response.status(201).json({ id: user.id, name, email, admin })

    }
}

export default new UserController()