import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Index('user_pkey', ['id'], { unique: true })
@Entity('user', { schema: 'public' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column('varchar', { name: 'username', nullable: true, length: 50 })
  username: string | null;

  @Column('varchar', { name: 'discord_username', nullable: true, length: 50 })
  discordUsername: string | null;

  @Column('varchar', { name: 'discord_id', nullable: true, length: 50 })
  discordId: string | null;

  @Column('varchar', {
    name: 'discord_banner_color',
    nullable: true,
    length: 10,
  })
  discordBannerColor: string | null;

  @Column('varchar', { name: 'email', nullable: true, length: 50 })
  email: string | null;

  @Column('varchar', { name: 'full_name', nullable: true, length: 50 })
  fullName: string | null;

  @Column('varchar', { name: 'password', nullable: true, length: 250 })
  @Exclude()
  password: string | null;

  @Column('varchar', { name: 'picture', nullable: true, length: 250 })
  picture: string | null;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'created_at',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    name: 'updated_at',
  })
  public updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamptz',
    default: () => `null`,
    name: 'deleted_at',
  })
  public deletedAt: Date | null;
}
