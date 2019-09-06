const { MongoClient, ObjectId } = require('mongodb')
const { config } = require('../config')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName

const MONGO_URI = `mongodb://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}`

class MongoLib {
    constructor () {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        this.dbName = DB_NAME
    }

    async connect() {
        const client = await this.client.connect()
        console.log('>> Connected successfully to mongo')
        return client.db(this.dbName)
    }

    async getAll(collection, query) {
        const db = await this.connect()
        const result = await db.collection(collection).find(query).toArray()
        return result
    }

    async get(collection, id) {
        const db = await this.connect()
        return db.collection(collection).findOne({ _id: ObjectId(id) })
    }

    async create(collection, data) {
        const db = await this.connect()
        const result = await db.collection(collection).insertOne(data)
        return result.insertedId
    }

    async update(collection, id, data) {
        const db = await this.connect()
        const result = await db.collection(collection)
                        .updateOne({ _id: ObjectId(id) }, { $set:data} , { upsert: true })
        return result.upsertedId || id
    }

    async delete(collection, id) {
        const db = await this.connect()
        const result = await db.collection(collection)
                        .updateOne({ _id: ObjectId(id) }, { $set: data}, { upsert: true })
        return result.upsertedId || id
    }

}


module.exports = MongoLib











