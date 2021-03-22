import { String } from "aws-sdk/clients/cloudsearch";
import { Document } from "mongoose";

export interface PostingProps extends Document {
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

export interface BookingProps extends Document {
  ownerId?: string;
  requestorId?: string;
  requestorName?: string;
  postingId?: string;
  requestDates?: string;
  price?: string;
  bookingImage?: string;
}

export interface RequestProps extends Document {
  requestorName?: string;
  requestorId?: string;
  receiverId?: string;
  postingId?: string;
  requestDates?: string;
  postingImage?: string;
  postingTitle?: string;
  amount?: string;
}

export interface UserProps extends Document {
  id?: String;
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  profilePhoto?: string;
  postings?: string;
  password?: string;
}
