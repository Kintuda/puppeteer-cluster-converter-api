import { FastifyInstance } from 'fastify'
import oas from 'fastify-oas'

const openApiDefinition = async (instance: FastifyInstance) => {
    instance.register(oas, {
        routePrefix: '/documentation',
        exposeRoute: true,
        swagger: {
            info: {
                title: 'Puppeteer-cluster-apid',
                description: 'Puppeteer cluster',
                version: '1.0.0'
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here'
            },
            host: 'localhost',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json']
        }
    })
}


export default openApiDefinition