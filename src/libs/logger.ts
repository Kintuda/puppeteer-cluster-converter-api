import pino, { Logger, LoggerOptions } from 'pino'
import { isLocal } from '../bootstrap/config'

const createLogger = (): Logger => {
    const defaultConfig: LoggerOptions = {
        prettyPrint: isLocal()
    }
    return pino(defaultConfig)
}

export default createLogger()