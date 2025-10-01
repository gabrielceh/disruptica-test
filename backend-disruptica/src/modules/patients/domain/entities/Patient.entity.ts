import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Consultation } from "./Consultation.entity";
import { Gender } from "./Gender.enum";

@Entity("patients")
export class Patient {
  @PrimaryGeneratedColumn("uuid")
  public readonly id!: string;

  @Column()
  public name!: string;

  @Column()
  public lastName!: string;

  @Column({ type: "date" })
  public birthDate!: Date;

  @Column({ type: "enum", enum: Gender })
  public gender!: Gender;

  @Column({ default: true })
  public isActive!: boolean;

  @OneToMany(() => Consultation, (consultation) => consultation.patient, {
    cascade: true,
  })
  public consultations!: Consultation[];

  constructor(props?: {
    id?: string;
    name: string;
    lastName: string;
    birthDate: Date;
    gender: Gender;
    consultations?: Consultation[];
  }) {
    if (props) {
      this.id = props.id ?? crypto.randomUUID();
      this.name = props.name;
      this.lastName = props.lastName;
      this.birthDate = props.birthDate;
      this.gender = props.gender;
      this.consultations = props.consultations ?? [];
      this.isActive = true;
    }
  }
}
