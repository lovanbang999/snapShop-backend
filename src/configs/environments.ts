import 'dotenv/config'

interface AppConfig {
  port: number,
  buildMode?: string
}

interface DBConfig {
  connectString?: string;
  name?: string;
}

interface Config {
  app: AppConfig;
  db: DBConfig;
}

const dev: Config = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT ?? '5000', 10),
    buildMode: process.env.BUILD_MODE
  },
  db: {
    connectString: process.env.DEV_DB_CONNECT_STRING,
    name: process.env.DEV_DB_NAME
  }
}

const product: Config = {
  app: {
    port: parseInt(process.env.PRODUCT_APP_PORT ?? '5000', 10),
    buildMode: process.env.BUILD_MODE
  },
  db: {
    connectString: process.env.PRODUCT_DB_CONNECT_STRING,
    name: process.env.PRODUCT_DB_NAME
  }
}

const configs: Record<string, Config> = { dev, product }
const env: string = process.env.BUILD_MODE ?? 'dev'

export default configs[env]
