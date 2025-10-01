import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Patient } from "./Patient.entity";

@Entity("consultations")
export class Consultation {
  @PrimaryGeneratedColumn("uuid")
  public readonly id!: string;

  @Column({ type: "date" })
  public date!: Date;

  @Column()
  public reason!: string;

  @Column()
  public observations!: string;

  @ManyToOne(() => Patient, (patient) => patient.consultations, {
    onDelete: "CASCADE",
  })
  public patient!: Patient;

  constructor(props?: {
    id?: string;
    date: Date;
    reason: string;
    observations: string;
  }) {
    if (props) {
      this.id = props.id ?? crypto.randomUUID();
      this.date = props.date;
      this.reason = props.reason;
      this.observations = props.observations;
    }
  }
}
