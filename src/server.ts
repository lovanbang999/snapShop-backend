import express, { Request, Response } from 'express'
import config from './configs/environments'
import instanceMongoDB from './configs/mongodb'

const app = express()

const PORT = config.app.PORT || 5000


// Init database
instanceMongoDB

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
