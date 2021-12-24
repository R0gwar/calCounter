import { Column, Entity, ObjectIdColumn } from 'typeorm';
 
@Entity('user')
export class User {
  @ObjectIdColumn()
  public id?: number;
 
  @Column({ unique: true })
  public email: string;
 
  @Column({ unique: true })
  public username: string;
 
  @Column()
  public password: string;

  @Column()
  public cart: string[];
  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }
}