import { MaxLength, MinLength } from "class-validator";
import { FavoriteEntity } from "src/favorites/entities/favorite.entity";
import { PlaylistEntity } from "src/playlist/entities/playlist.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({unique: true})
    email: string

    @Column()
    @MinLength(8)
    @MaxLength(9)
    password: string

    @OneToMany(() => PlaylistEntity,(playlist) => playlist.user)
    playlists: PlaylistEntity[]

    @OneToMany(() => FavoriteEntity,(favorite) => favorite.user)
    favorites: FavoriteEntity[]
    
    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    delatedAt: Date
}
