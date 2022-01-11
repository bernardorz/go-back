import { Entity,Generated ,Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
 


@Entity('user_tokens')
class User{
    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @Column()
    @Generated('uuid')
    token : string;

    @Column()
    user_id : string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at : Date;
}

export default User;