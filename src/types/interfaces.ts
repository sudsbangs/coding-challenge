export interface UserPhonePayload {
  phone_number: string;
  user_id: string;
}

export interface UserPhoneQuery {
  phone_number: string;
  user_id: string;
}

export interface UserPhoneRecord {
  user_id: string;
  phone_number: string;
  created_at?: string;
  updated_at?: string;
}
