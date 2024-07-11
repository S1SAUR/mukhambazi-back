import { ModulesContainer } from "@nestjs/core";
import { IsDate } from "class-validator";
import { AuthorEntity } from "src/authors/entities/author.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    authorId: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    delatedAt: Date


    @ManyToOne(() => AuthorEntity, (author) => author.album)
    @JoinColumn()
    author: AuthorEntity;
}
