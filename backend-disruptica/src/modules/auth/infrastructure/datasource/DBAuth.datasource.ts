import { AuthDatasource } from "@modules/auth/domain/datasource";
import { User } from "@modules/auth/domain/entities";
import { AppDataSource } from "@src/core/infraestructure/config/datasource";


export class DBAuthDatasource implements AuthDatasource {
    private usersData = AppDataSource.getRepository(User);

    async findByEmailAndPassowrd(email: string, password: string): Promise<User | null> {
        try {
           const user = await this.usersData.findOne({ where: { email } });
           if (!user) {
               throw new Error("Email or password incorrect");
           }

           if (!await user.comparePassword(password)) {
               throw new Error("Email or password incorrect");
           }
            return Promise.resolve(user);
        } catch (error) {
            return Promise.reject(error);
        }
    }


}