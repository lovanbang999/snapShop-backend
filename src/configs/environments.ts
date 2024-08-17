import { getEnvVar } from '@/utils'
import 'dotenv/config'

interface AppConfig {
  host: string;
  port: number;
  buildMode: string;
}

interface DBConfig {
  connectString: string;
  name: string;
}

interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

interface GoogleOAuth20 {
  clientId: string;
  clientSecret: string;
}

interface FacebookOAuth {
  clientId: string;
  clientSecret: string;
}

interface Config {
  app: AppConfig;
  db: DBConfig;
  frontendUrl: string;
  cloudinary: CloudinaryConfig;
  googleOAuth20: GoogleOAuth20;
  facebookOAuth: FacebookOAuth;
}

const dev: Config = {
  app: {
    host: getEnvVar('DEV_APP_HOST'),
    port: parseInt(process.env.DEV_APP_PORT ?? '5000', 10),
    buildMode: getEnvVar('BUILD_MODE')
  },
  db: {
    connectString: getEnvVar('DEV_DB_CONNECT_STRING'),
    name: getEnvVar('DEV_DB_NAME')
  },
  frontendUrl: getEnvVar('DEV_FRONTEND_URL'),
  cloudinary: {
    cloudName: getEnvVar('DEV_CLOUDINARY_NAME'),
    apiKey: getEnvVar('DEV_CLOUDINARY_API_KEY'),
    apiSecret: getEnvVar('DEV_CLOUDINARY_API_SECRET')
  },
  googleOAuth20: {
    clientId: getEnvVar('DEV_GOOGLE_CLIENT_ID'),
    clientSecret: getEnvVar('DEV_GOOGLE_CLIENT_SECRET')
  },
  facebookOAuth: {
    clientId: getEnvVar('DEV_FACEBOOK_CLIENT_ID'),
    clientSecret: getEnvVar('DEV_FACEBOOK_CLIENT_SECRET')
  }
}

const product: Config = {
  app: {
    host: getEnvVar('PRODUCT_APP_HOST'),
    port: parseInt(process.env.PRODUCT_APP_PORT ?? '5000', 10),
    buildMode: getEnvVar('BUILD_MODE')
  },
  db: {
    connectString: getEnvVar('PRODUCT_DB_CONNECT_STRING'),
    name: getEnvVar('PRODUCT_DB_NAME')
  },
  frontendUrl: getEnvVar('PRODUCT_FRONTEND_URL'),
  cloudinary: {
    cloudName: getEnvVar('PRODUCT_CLOUDINARY_NAME'),
    apiKey: getEnvVar('PRODUCT_CLOUDINARY_API_KEY'),
    apiSecret: getEnvVar('PRODUCT_CLOUDINARY_API_SECRET')
  },
  googleOAuth20: {
    clientId: getEnvVar('PRODUCT_GOOGLE_CLIENT_ID'),
    clientSecret: getEnvVar('PRODUCT_GOOGLE_CLIENT_SECRET')
  },
  facebookOAuth: {
    clientId: getEnvVar('PRODUCT_FACEBOOK_CLIENT_ID'),
    clientSecret: getEnvVar('PRODUCT_FACEBOOK_CLIENT_SECRET')
  }
}

const configs: Record<string, Config> = { dev, product }
const env: string = process.env.BUILD_MODE ?? 'dev'

export default configs[env]
