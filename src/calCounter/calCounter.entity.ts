import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('calCounters')
export class CalCounter {
  @ObjectIdColumn() id: ObjectID;
  @Column() name: string;
  @Column() description?: string;
  @Column() cost: number;
  @Column() user: string[];
  @Column() categories: string[];

  constructor(calCounters?: Partial<CalCounter>) {
    Object.assign(this, calCounters);
  }
}