import { DataSource } from 'typeorm'
import { User } from '../entities/users.js'
import { Events } from '../entities/events.js'
import { Reviews } from '../entities/reviews.js'


const AppDataSource = new DataSource({
type: 'postgres',
host: 'localhost',
username: 'postgres',
password: '1234',
database: 'postgres',
synchronize: true, // Automatically creates tables based on entities (use only in development)
logging: false,
entities: [User, Events, Reviews],
})

export default AppDataSource
