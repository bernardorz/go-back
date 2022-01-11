import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository'
import { injectable, inject } from 'tsyringe';
import path from 'path';
import IMailProver from "@shared/container/providers/MailProvider/models/IMailProvider"
import IUserTokensRepository from "../repositories/IUserTokensRepository"

interface Request {
    email: string;
}


@injectable()
class ResetPasswordService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProver,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository
    ) { }

    public async execute({ email }: Request): Promise<void> {


        const user = await this.usersRepository.findByEmail(email)


        if (!user) {
            throw new AppError('User does not exist');
        }

        const { token } = await this.userTokensRepository.generate(user.id)


        const forgotPassowrdTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs')

            this.mailProvider.sendMail({
                to: {
                    name: user.name,
                    email: user.email
                },
                subject: 'Recuperação de senha',
                templateDatta: {
                    file: forgotPassowrdTemplate,
                    variables: {
                        name: user.name,
                        token,
                        link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`
                    }
                }
    
            });

    
    }
}


export default ResetPasswordService