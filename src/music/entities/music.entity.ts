import { AuthorEntity } from "src/authors/entities/author.entity";
import { PlaylistEntity } from "src/playlist/entities/playlist.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MusicEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    authorId: number

    @Column()
    url: string
    

    @ManyToOne(() => AuthorEntity,(autor) => autor.musics)
    author: AuthorEntity

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    delatedAt: Date

    @ManyToMany(() => PlaylistEntity, (playlist) => playlist.musics)
    playLists: PlaylistEntity[]

}
