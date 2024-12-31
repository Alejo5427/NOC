
import { LogDataSource } from '../domain/datasources/log.datasource';
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from '../infraestructure/datasources/file-system.datasource';
import { LogRepositoryImplementation } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const logRepository = new LogRepositoryImplementation(
    new FileSystemDataSource()
);

export class Server{

    public static start(){
        console.log('Server running...');

        CronService.createJob('*/5 * * * * *', () => {

            // new CheckService().execute('https://google.com')
            new CheckService(
                logRepository,
                () => console.log("Hecho correctamente"),
                (error) => {console.log(error)}
                
            ).execute('https://google.com')
        });
    }



}