import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("otp")
export class OTPEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  code: number;
  @Column()
  expire_in: Date;
  @Column()
  userId: number;
  @OneToOne(() => UserEntity, (user) => user.otp, { onDelete: "CASCADE" })
  user: UserEntity;
}
