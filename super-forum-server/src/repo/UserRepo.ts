import {User} from "./User";
import bcrypt from "bcryptjs";
import {isPasswordValid} from "../common/validators/PasswordValidator";
import {isEmailValid} from "../common/validators/EmailValidator";
import {QueryArrayResult} from "./QueryArrayResult";

const saltRounds = 10;

export class UserResult {
    constructor(public messages?: Array<string>, public user?: User) {
    }
}

export const register = async (
    email: string,
    userName: string,
    password: string
): Promise<UserResult> => {

    const result = isPasswordValid(password);
    if (!result.isValid) {
        return {
            messages: [
                "Passwords must have min length 1 symbol",
            ],
        };
    }

    const trimmedEmail = email.trim().toLowerCase();
    const emailErrorMsg = isEmailValid(trimmedEmail);
    if (emailErrorMsg) {
        return {
            messages: [emailErrorMsg],
        };
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userEntity = await User.create({
        email: trimmedEmail,
        userName,
        password: hashedPassword,
    }).save();

    userEntity.password = ""; // blank out for security
    return {
        user: userEntity,
    };
};

export const login = async (
    userName: string,
    password: string
): Promise<UserResult> => {
    const user = await User.findOne({
        where: {userName},
    });
    if (!user) {
        return {
            messages: [userNotFound(userName)],
        };
    }

    const passwordMatch = await bcrypt.compare(password, user?.password);
    if (!passwordMatch) {
        return {
            messages: ["Password is invalid."],
        };
    }

    return {
        user: user,
    };
};

export const logout = async (userName: string): Promise<string> => {
    const user = await User.findOne({
        where: {userName},
    });

    if (!user) {
        return userNotFound(userName);
    }

    return "User logged off.";
};

export const me = async (id: string): Promise<UserResult> => {
    const user = await User.findOne({
        where: {id}
    });

    if (!user) {
        return {
            messages: ["User not found."],
        };
    }

    user.password = "";
    return {
        user: user,
    };
};

export const checkEmailInDb = async (email: string): Promise<string> => {
    const user = await User.findOne({
        where: {email},
    });

    if (!user) {
        return "Email is free";
    } else {
        return "Email is taken";
    }
};

export const getAllUsers = async (): Promise<QueryArrayResult<User>> => {
    const categories = await User.find();
    return {
        entities: categories,
    };
};

export const blockUnblockDeleteDb = async (button: string, arr: Array<string>): Promise<string> => {

    let str = "";
    if (button == "delete") {
        await User.delete(arr)
        str = "deleted"
    } else if (button === "block" || button === "active") {
        await User.update(arr, { status: button });
        str = "Update successfully"
    }

    return str;
}

function userNotFound(userName: string) {
    return `User with userName ${userName} not found.`;
}
