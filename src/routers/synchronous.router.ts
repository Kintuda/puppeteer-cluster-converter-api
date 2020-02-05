import { FastifyInstance } from "fastify";
import { convertHtml } from "../controllers/synchronous.controller";

const createSynchronous = async (instance: FastifyInstance) => {
    const options = {
        addToBody: true,
        sharedSchemaId: 'MultipartFileType'
    }

    instance.register(require('fastify-multipart'), options)
    instance.route({
        url: '/print',
        method: 'POST',
        handler: convertHtml
    })
}

export default createSynchronous