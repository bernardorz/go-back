import IMailTemplateProvider from "../models/IMailTemplateProvider";
import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";


class FakeMailTemplateProvider implements IMailTemplateProvider{
    public async parse() : Promise<string>{
    
        return 'Mail Content'
    }
}



export default FakeMailTemplateProvider