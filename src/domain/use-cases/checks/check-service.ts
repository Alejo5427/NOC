import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';


interface CheckServiceUseCase {
    execute(url: string):Promise<boolean>
}

type SuccessCallBack = (() => void) | undefined;
type ErrorCallBack = ((error: any) => void) | undefined; 

export class CheckService implements CheckServiceUseCase{

    constructor(
        private readonly logRepository:LogRepository,
        private readonly successCallback: SuccessCallBack,
        private readonly errorCallBack: ErrorCallBack
    ){}

    async execute(url: string):Promise<boolean>{ 
        try {

            const req = await fetch(url)

            if (!req.ok) {throw new Error('Error en el servicio ' + url)}
            
            console.log(url + ' Is ok');

            const log = new LogEntity(LogSeverityLevel.low,`Service ${url} working`);
            this.logRepository.saveLog(log)

            if (this.successCallback) {this.successCallback();}
            return true;
        } catch (error) {
            
            console.log(error);
            const errorMessage = `${error}`
            const log = new LogEntity(LogSeverityLevel.high, errorMessage);
            this.logRepository.saveLog(log)

            if (this.errorCallBack) this.errorCallBack(error);
            return false;
        }   
    }
}


