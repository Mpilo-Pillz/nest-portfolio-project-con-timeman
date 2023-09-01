import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Leave {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  numberOfDays: number;

  @ManyToOne(() => User, (user) => user.leaves)
  user: User;
}
