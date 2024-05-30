import express, { NextFunction, Request, Response } from 'express'
import config from './configs/environments'
import instanceMongoDB from './configs/mongodb'
import { ErrorResponse } from './core/error.response'
import errorHandling from './middlewares/errorHandling.middleware'
import Routes from './routers/index'

const app = express()

const PORT : number = config.app.port || 5000

app.use(express.json())

// Init database
instanceMongoDB

// Init routes
app.use('/', Routes)

// Handling error
app.use((req: Request, res: Response, next: NextFunction ) => {
  const error = new ErrorResponse('Not found!', 404)
  next(error)
})

app.use(errorHandling)

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT.toString()}`)
})
