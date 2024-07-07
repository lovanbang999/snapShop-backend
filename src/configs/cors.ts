import cors from 'cors'
import { WHITELIST_DOMAIN } from '@/utils/constants'

export const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (process.env.BUILD_MODE === 'dev') callback(null, true)

    if (WHITELIST_DOMAIN.includes(origin as never)) callback(null, true)
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization', 'x-rtoken-id', 'x-client-id', 'x-api-key'],
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true
}
