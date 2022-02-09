import { Entity, PrimaryGeneratedColumn, Column,  } from "typeorm";
import { Length } from "class-validator";

import { Auditable } from "./Auditable";

export type UserStatusType = "block" | "unblock";

@Entity({ name: "Users" })
export class User extends Auditable {
  @PrimaryGeneratedColumn({ name: "Id", type: "bigint" })
  id: string;

  @Column("varchar", {
    name: "Email",
    length: 120,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column("varchar", {
    name: "UserName",
    length: 60,
    unique: true,
    nullable: false,
  })
  userName: string;

  @Column("varchar", { name: "Password", length: 100, nullable: false })
  @Length(1, 100)
  password: string;


  @Column( {
    name: "LastTimeLogin",
    default: () => `now()`,
    nullable: false,
  })
  lastTimeLogin: Date;

  @Column({
    type: "enum",
    default: "active",
    enum: ["block", "active"],
  })
  status: UserStatusType;

}
