import { AlbumEntity } from "src/albums/entities/album.entity";
import { MusicEntity } from "src/music/entities/music.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class AuthorEntity {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({type: 'varchar'})
    biography: string

    @OneToMany(() => MusicEntity, (music) => music.author)
    musics: MusicEntity[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    delatedAt: Date

    @OneToOne(() => AlbumEntity, (album) => album.author)
    album: AlbumEntity;
}
