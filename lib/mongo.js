const { MongoClient, ObjectId } = require('mongodb')
const { config } = require('../config/index')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName

/**
 * Si hay conexion a Mlab 
 */
const MONGO_URI = `mongodb://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}` // prettier-ignore

/**
 * Si hay conexion con Docker
 */
const MONGO_URI_DOCKER = process.env.MONGO_URI_DOCKER

class MongoLib {
    constructor () {
        this.client = new MongoClient(MONGO_URI_DOCKER, { useNewUrlParser: true, useUnifiedTopology: true })
        this.dbName = DB_NAME
    }


    async connect () {
        const connect = await this.client.connect()
        if(!connect) new Error('Not connected db')
        console.log('Connected successfully to mongo')
        return await this.client.db(this.dbName)
    }

    async getAll (collection, query) {
       const db = await this.connect()
       return await db.collection(collection).find(query).toArray()
    }

    async get (collection, id) {
        const db = await this.connect()
        return await db.collection(collection).findOne({ _id: ObjectId(id) })
    }
    
    async create (collection, data) {
        const db = await this.connect()
        const result = await db.collection(collection).insertOne(data)
        return result.insertedId
    }

    async update (collection, id, data) {
        const db = await this.connect()
        const result = await db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true })
        return result.upsertedId || id
    }

    async delete (collection, id) {
        const db = await this.connect()
        const result =  await db.collection(collection).deleteOne({ _id: ObjectId(id) })
        return id
    }

}

module.exports = MongoLib