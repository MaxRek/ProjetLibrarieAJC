import { CompteDto } from './compte-dto';

export class AdministrateurDto extends CompteDto {
    constructor(
        id: number,
        nom: string,
        prenom: string,
        email: string,
        password: string,
    ) {
        super(id, nom, prenom, email, password);
    }

    public override toJSON(): any {
        return {
            ...super.toJSON()
        };
    }
}
