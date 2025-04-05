import 'reflect-metadata'
import { Column, CreateDateColumn, Entity, JoinTable,  ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Events } from "./events.js"
import { Reviews } from './reviews.js'

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar'})
    email: string

    @Column({ type: 'varchar'})
    username: string
    
    @Column({type: 'text', select: false})
    password: string

    @OneToMany( () => Events , event => event.createdBy )
    events: Events[]

    @ManyToMany(()=> Events, event => event.attendees)
    @JoinTable()
    eventsAttended: Events[]

    @ManyToMany(()=> Events, event => event.requestToAttend)
    @JoinTable()
    eventsRequested: Events[]

    @OneToMany(() => Reviews, (review) => review.reviewBy)
    reviews: Reviews[];

    @ManyToMany(()=>Events, event => event.invitedUsers)
    eventsInvited: Events[]

    @CreateDateColumn({select: false})
    createdAt: Date

    @UpdateDateColumn({select: false})
    updatedAt: Date


}