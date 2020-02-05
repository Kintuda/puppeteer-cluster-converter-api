import { FastifyInstance } from "fastify";
import { notFoundHandler } from "../plugins/errorHandler"
// import createAsynchronous from "./asynchronous.router";
import createSynchronous from './synchronous.router'

const createRoutes = async (instance: FastifyInstance) => {
    instance.setNotFoundHandler(notFoundHandler)
    // instance.register(createAsynchronous)
    instance.register(createSynchronous)
}

export default createRoutes