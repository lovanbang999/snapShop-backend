// mongodb+srv://lovanbangbox9:<password>@atlascluster.1mcnel7.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster
import mongoose from 'mongoose'
import config from '../configs/environments'

const { db: { connectString } } = config

class DataBase {
  static instance: DataBase

  constructor() {
    this.connect()
  }

  // Connect
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  connect(type = 'mongodb') { // eslint-disable-line no-unused-vars
    if (!connectString || typeof connectString !== 'string')
      throw new Error('Database connection string is not properly configured.')

    mongoose.connect(connectString, { maxPoolSize: 50 })
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('Connect mongodb successfully!')
      })
      .catch((err : unknown) => {
        // eslint-disable-next-line no-console
        console.log('Connect mongdb error!', err)
      })
  }

  static getInstance() {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!DataBase.instance) DataBase.instance = new DataBase()

    return DataBase
  }
}

const instanceMongoDB = DataBase.getInstance()

export default instanceMongoDB
