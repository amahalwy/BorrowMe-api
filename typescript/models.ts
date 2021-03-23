import { String } from "aws-sdk/clients/cloudsearch";
import { Document } from "mongoose";

export interface PostingPropsModel extends Document {
  ownerId?: string;
  title?: string;
  description?: string;
  price?: string;
  image?: string;
  tags?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface BookingPropsModel extends Document {
  ownerId?: string;
  requestorId?: string;
  requestorName?: string;
  postingId?: string;
  requestDates?: string;
  price?: string;
  bookingImage?: string;
}

export interface RequestPropsModel extends Document {
  requestorName?: string;
  requestorId?: string;
  receiverId?: string;
  postingId?: string;
  requestDates?: string;
  postingImage?: string;
  postingTitle?: string;
  amount?: string;
}

export interface UserPropsModel extends Document {
  id?: String;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  profilePhoto: string;
  postings: any[];
  password: string;
  confirmPassword?: string;
}
