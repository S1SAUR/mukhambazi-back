import { AlbumEntity } from "src/albums/entities/album.entity";
import { AuthorEntity } from "src/authors/entities/author.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    
    @ManyToOne(() => AlbumEntity, (album) => album.musics)
    album: AlbumEntity;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    delatedAt: Date

}
