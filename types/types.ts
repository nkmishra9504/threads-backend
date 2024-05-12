export enum Gender {
    MALE = 'Male',
    FEMALE = 'Female'
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    gender: Gender;
    mobile?: string;
    profile_image?: string;
    is_active?: boolean;
    soft_delete?: boolean;
}