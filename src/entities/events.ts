import 'reflect-metadata'
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinTable } from "typeorm";
import { Reviews } from "./reviews.js";
import { User } from "./users.js";

export enum privacyType{
    public="public",
    private="private",
    protected="protected"
}

@Entity()
export class Events {

    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column('text')
    title: string

    @Column('text')
    description: string

    @Column('text')
    location: string

    @Column({ type: 'varchar'})
    contactPhone: string

    @Column({type: 'int'})
    capacity: number

    @Column({ type: 'varchar'})
    eventTime: string

    @Column({
        type: 'enum',
        enum: privacyType,
        default: privacyType.public
    })
    privacyType: string

    @OneToMany(()=> Reviews, reviews => reviews.event)
    reviews: Reviews[] 

    @ManyToMany(()=> User, user => user.eventsAttended, { cascade: true}) 
    attendees: User[] 

    @ManyToMany(()=> User, user => user.eventsRequested, { nullable: true, cascade: true})
    requestToAttend?: User[]

    @ManyToMany(()=> User, user => user.id, {nullable: true, cascade: true})
    @JoinTable()
    invitedUsers?: User[]

    @ManyToOne(()=> User, user => user.id)
    createdBy: User

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date


}