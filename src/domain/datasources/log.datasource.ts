

// Una clase abstracta es aquella que no se le puede crear una instancia pero si implementar
// const logDs = new LogDataSource(); X
// No permitiria lo de arriba

import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

//Sirve para poder obligar el comportamiento que quiero definir sobre las otras clases 
export abstract class LogDataSource {
    abstract saveLog(log: LogEntity): Promise<void>
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>
}