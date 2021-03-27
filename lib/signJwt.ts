import jwt, { SignOptions, SignCallback } from "jsonwebtoken";
import { UserPropsModel } from "../typescript/models";

export const signJwt = (res: any, user: UserPropsModel) => {
  const payload = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profilePhoto: user.profilePhoto,
  };

  const key: string | any = process.env.secretOrKey;
  const options: SignOptions = { expiresIn: 3600 };
  const cb: SignCallback = (err: Error | null, encoded: string | undefined) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json({
        success: true,
        token: "Bearer " + encoded,
        user,
      });
    }
  };
  jwt.sign(payload, key, options, cb);
};
