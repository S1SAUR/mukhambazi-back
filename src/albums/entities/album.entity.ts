import { ModulesContainer } from "@nestjs/core";
import { IsDate } from "class-validator";
import { AuthorEntity } from "src/authors/entities/author.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AlbumEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({type: "varchar"})
    title: string;

    @Column({type: "varchar"})
    artistName: string;

    @Column({type: "varchar"})
    releaseDate: string;


    @OneToOne(() => AuthorEntity, (author) => author.album)
    @JoinColumn()
    author: AuthorEntity;

    // @Column()
    // authorId: number
}
