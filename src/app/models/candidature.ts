export interface Candidature {
    id?: string;
    nom: string;
    prenom: string;
    tel: string;
    email: string;
    date_naissance: string;
    active?: boolean;
    isAdmin?: boolean;

}
