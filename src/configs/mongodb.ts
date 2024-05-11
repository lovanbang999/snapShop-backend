// mongodb+srv://lovanbangbox9:<password>@atlascluster.1mcnel7.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster
import mongoose from 'mongoose'
import config from '../configs/environments'

const { db: { connectString } } = config
console.log('ConnectString:: ', connectString)

class DataBase {
  static instance: DataBase

  constructor() {
    this.connect()
  }
  
  // Connect
  connect(type: string = 'mongodb'): any {
    mongoose.connect(connectString, { maxPoolSize: 50 })
      .then(() => {
        console.log('Connect mongodb successfully!')
      })
      .catch(err => console.log('Connect mongdb error!', err))
  }

  static getInstance() {
    if (!DataBase.instance) DataBase.instance = new DataBase()
    
    return DataBase
  }
}

const instanceMongoDB = DataBase.getInstance()

export default instanceMongoDB
