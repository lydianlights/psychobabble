import { Entity, Column, PrimaryGeneratedColumn, OneToOne, getRepository } from "typeorm";
import { User } from "./User";
import * as crypto from 'crypto';

@Entity('validation_tokens')
/** Token generated for email validation of Users. */
export class ValidationToken {
  /** Autogenerated id as an integer. */
  @PrimaryGeneratedColumn()
  id: number;

  /** Validation code generated by this token. */
  @Column()
  code: string;

  /** Expiration date of this token as a UNIX timestamp. */
  @Column({type:'bigint'})
  expiration: number;

  /** The User this token is associated with. */
  @OneToOne(type => User)
  user: User;

  /** Generates a new token not yet associated with any User. */
  public static async generateAsync() {
    let tokenRepo = getRepository(ValidationToken);
    let minBeforeExpire = 15;
    let newToken = new ValidationToken();
    newToken.code = crypto.randomBytes(3).toString('hex');
    newToken.expiration = new Date().getTime() + (minBeforeExpire * 60 * 1000);
    await tokenRepo.save(newToken);
    return newToken;
  }

  /** Checks if the code provided matches the user's token. */
  public static async checkVerify(code: string, userId: string) {
    let userRepo = getRepository(User);
    let currentUser = await userRepo.findOneById(userId);
    if(currentUser.validationToken.code === code && currentUser.validationToken.expiration >= new Date().getTime()) {
      currentUser.validated = true;
      userRepo.save(currentUser);
      return currentUser;
    } else {
      return currentUser;
    }
  }
}
