import { User as MyUser } from "@/models/user.ts";

declare global {
	namespace Express {
		interface User extends MyUser {}
	}
}
