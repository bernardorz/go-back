import { container } from "tsyringe";

import IMailTemplateProvider from '../MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from '../MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';


container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    HandlebarsMailTemplateProvider
)
