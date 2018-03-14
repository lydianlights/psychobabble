import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Program } from './Program';
import { Tag } from "./Tag";
import { Response } from "./Response";

/** A video object. */
@Entity('videos')
export class Video {
  /** Autogenerated id as a UUID string. */
  @PrimaryGeneratedColumn("uuid")
  id: string;

  /** Video Title */
  @Column({nullable: true})
  title: string

  /** The URL where this video is stored. Nullable. */
  @Column({nullable: true})
  url: string;

  /** A description of this video. Nullable. */
  @Column({nullable: true})
  description: string;

  /** All tags associated with this video. */
  @ManyToMany(type => Tag, tags => tags.videos)
  @JoinTable()
  tags: Tag[];

  /** All Programs containing this video. */
  @ManyToMany(type => Program, program => program.videos)
  programs: Program[];

  /** All subject Responses to this video. */
  @OneToMany(type => Response, responses => responses.video)
  responses: Response[];
}
