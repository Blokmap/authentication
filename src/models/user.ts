export interface User {
	issuer: string;
	email: string;
	username: string | undefined;
	firstName: string | undefined;
	lastName: string | undefined;
	avatarUrl: string | undefined;
}
