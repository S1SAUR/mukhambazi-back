import { AlbumEntity } from "src/albums/entities/album.entity";
import { AuthorEntity } from "src/authors/entities/author.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MusicEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => AuthorEntity,(autor) => autor.musics)
    author:AuthorEntity
    
    @ManyToOne(() => AlbumEntity, (album) => album.musics)
    album: AlbumEntity;

    @Column()
    authorId: number

    @Column()
    url: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    delatedAt: Date

}
