import assert from 'assert'

const {
    NODE_ENV,
    MAX_CONCURRENCY,
    SQS_URL,
    AWS_REGION,
    AWS_DEFAULT_REGION,
    TIMEOUT,
    BUCKET_URL,
    PORT
} = process.env

interface Config {
    env: string
    aws: {
        mainQueue: string,
        region: string
        mainBucket: string
    }
    puppeteer: {
        maxConcurrency: number
        args: Array<string>
        timeout: number
    }
    pageOptions: {
        printBackground: boolean
        format: 'A4' | 'A5' | 'Letter'
    }
    port: number
}

const config: Config = {
    env: NODE_ENV || 'development',
    aws: {
        mainQueue: SQS_URL!,
        region: AWS_REGION || AWS_DEFAULT_REGION || 'us-east-1',
        mainBucket: BUCKET_URL!
    },
    puppeteer: {
        maxConcurrency: parseInt(MAX_CONCURRENCY || '2'),
        args: [
            '--disable-setuid-sandbox',
            '--disable-gpu',
            '--hide-scrollbars',
            '--mute-audio',
            '--disable-infobars',
            '--disable-breakpad',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-canvas-aa',
            '--disable-2d-canvas-clip-aa',
            '--disable-gl-drawing-for-tests',
            '--use-gl=swiftshader'
        ],
        timeout: parseInt(TIMEOUT || '30000')
    },
    pageOptions: {
        printBackground: true,
        format: 'A4',
    },
    port: parseInt(PORT || '3000')
}

export const isLocal = () => NODE_ENV === 'development'

export default config