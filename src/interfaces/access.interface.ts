export interface SignupResponseType {
    message: string;
    status: number;
    reasonStatusCode: string;
    metaData: {
        user: {
            _id: string;
            username: string;
            email: string;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        }
    };
    options: object;
}


export type LoginResponseType = Omit<SignupResponseType, 'options'>
