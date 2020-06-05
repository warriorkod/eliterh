export class User {
    nom: string;
    prenom: string;
    tel: string;
    email: string;
    date_naissance: string;
    active?: boolean;
    isAdmin?: boolean;
    civilite?: string;
    adresse?: string;
    lieu?: string;
    ville?:string;
    niveau_etude?: string;
    niveau_experience?: string;
    domaine_actuel?: string;
    domaine_recherche?: string;

    constructor() {}
}
