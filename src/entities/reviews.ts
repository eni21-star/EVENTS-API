import 'reflect-metadata'
import { Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity} from "typeorm";
import { User } from "./users.js";
import { Events } from "./events.js";

// enum rating{
    
// }
@Entity()
export class Reviews {

   @PrimaryGeneratedColumn('uuid')
   readonly id: string

    @Column({type: 'text'})
    review: string

    @ManyToOne(()=> User, user => user.reviews, {cascade: true})
    reviewBy: User

    @ManyToOne(()=> Events, event => event.reviews, {cascade: true})
    event: Events
    
    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}