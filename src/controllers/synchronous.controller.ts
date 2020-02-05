import { FastifyRequest, FastifyReply } from "fastify"
import { ServerResponse } from "http"
import { UnprocessableEntity } from "../types/Error"

export const convertHtml = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
    const { body } = req
    const data = body?.file[0]?.data
    if(!data) throw new UnprocessableEntity([{message: 'Error file must be assigned'}])
    //@ts-ignore
    const result = await req.puppeteer.execute(data)
    return reply.code(201).header('Content-Type', 'application/pdf').send(result)
}
