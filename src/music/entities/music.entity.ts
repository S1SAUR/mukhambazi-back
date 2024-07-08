import { AuthorEntity } from "src/authors/entities/author.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MusicEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => AuthorEntity,(autor) => autor.musics)
    author:AuthorEntity

    @Column()
    url: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    delatedAt: Date
    
}
