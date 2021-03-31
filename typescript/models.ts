import { Document } from "mongoose";

export interface PostingModel extends Document {
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
  bookings?: BookingModel[];
}

export interface BookingModel extends Document {
  ownerId?: string;
  requestorId?: string;
  requestorName?: string;
  postingId?: string;
  requestDates?: string;
  price?: string;
  bookingImage?: string;
}

export interface RequestModel extends Document {
  requestorName?: string;
  requestorId?: string;
  receiverId?: string;
  postingId?: string;
  requestDates?: string;
  postingImage?: string;
  postingTitle?: string;
  amount?: string;
  owner?: boolean;
}

export interface UserModel extends Document {
  id?: string;
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
