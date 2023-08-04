import { User, UserDto, UserCreationDto } from "@models";

export async function addUser(info: UserCreationDto) {
    const user = await User.create(info);
    return user as UserDto;
}

export async function getUsers() {
    const users = await User.find();
    return users as UserDto[];
}

export async function getUserCount() {
    const count = await User.count();
    return count;
}
