import { Device } from "./device";
import { User } from "./user";

export interface LoggedUserData {
    loggedUser?: User | null;
    users?: User[] | null;
    devices?: Device[] | null;
}