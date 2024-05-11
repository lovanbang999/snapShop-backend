import 'dotenv/config'

const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 5000
  },
  db: {
    connectString: process.env.DEV_DB_CONNECT_STRING,
    name: process.env.DEV_DB_NAME
  }
}

const product = {
  app: {
    port: process.env.PRODUCT_APP_PORT || 5000
  },
  db: {
    connectString: process.env.PRODUCT_DB_CONNECT_STRING,
    name: process.env.PRODUCT_DB_NAME
  }
}

const configs: any = { dev, product }
const env: string = process.env.BUILD_MODE || 'dev'

export default configs[env]
