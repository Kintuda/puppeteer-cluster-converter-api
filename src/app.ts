import fastify, { FastifyInstance } from 'fastify'
import { IncomingMessage, Server, ServerResponse } from 'http'
import fp from 'fastify-plugin'
import errorHandler from './plugins/errorHandler'
import oas from './plugins/openapi'
import puppeteer from './plugins/puppeteer'
import v1Routes from './routers/main.router'

const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify()

app.register(fp(oas))
app.register(fp(puppeteer))
app.register(require('fastify-cors'))
app.register(require('fastify-helmet'))
app.setErrorHandler(errorHandler)
app.register(v1Routes, { prefix: 'api/v1' })

export default app