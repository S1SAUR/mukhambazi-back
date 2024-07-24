import { MusicEntity } from "src/music/entities/music.entity"
import { UserEntity } from "src/users/entities/user.entity"
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class PlaylistEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @ManyToMany(() => MusicEntity, (music) => music.playLists)
    @JoinTable()
    musics: MusicEntity[]

    @ManyToOne(() => UserEntity,(user) => user.playlists)
    user: UserEntity
}
