import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OTPEntity } from "./otp.entity";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ nullable: true })
  firstname: string;
  @Column({ nullable: true })
  lastname: string;
  @Column()
  mobile: string;
  @Column({ default: false })
  mobile_verify: boolean;
  @Column({ nullable: true })
  otpId: number;
  @OneToOne(() => OTPEntity, (otp) => otp.user)
  @JoinColumn({ name: "otpId" })
  otp: OTPEntity;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
