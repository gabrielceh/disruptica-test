import { AuthDatasource } from "@modules/auth/domain/datasource";
import { User } from "@modules/auth/domain/entities";
import { usersData } from "../data";


export class LocalAuthDatasource implements AuthDatasource {
    private users = usersData;

    async findByEmailAndPassowrd(email: string, password: string): Promise<User | null> {
        try {
            const user = this.users.find(user => user.email === email && user.password === password);
            if (!user) {
                throw new Error("Email or password incorrect");
            }

            return Promise.resolve(user);
        } catch (error) {
            return Promise.reject(error);
        }
    }


}