import { Cluster } from 'puppeteer-cluster'
import CONFIG, { isLocal } from '../bootstrap/config'
import logger from '../libs/logger'
import { LaunchOptions } from 'puppeteer'
import { FastifyInstance } from 'fastify'

interface Input {
    page: any
    data: Record<string, string>
}

const spawnCluster = async (instance: FastifyInstance) => {
    const local = isLocal()
    const launchOptions: LaunchOptions = {
        headless: true,
        args: CONFIG.puppeteer.args,
        executablePath: local ? undefined : '/usr/bin/chromium-browser'
    }

    const defaultConfig = {
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: CONFIG.puppeteer.maxConcurrency,
        puppeteerOptions: launchOptions,
        monitor: isLocal()
    }
    const cluster = await Cluster.launch(defaultConfig)
    await cluster.task(async ({ page, data }: Input) => {
        try {
            await page.setContent(data.toString())
            const result = await page.pdf(CONFIG.pageOptions)
            return result
        } catch (error) {
            logger.error(`Error converting ${data} - ${error && error.message}`)
        }
    })

    cluster.on('taskerror', (err: Error, data: {}) => {
        logger.error(`Task error, ${data} - ${err.message}`);
    });
    instance.decorateRequest('puppeteer', cluster)
    instance.addHook('onClose', async () => cluster.close())
    logger.info('Puppeteer UP')
}

export default spawnCluster