export interface Candidature {
  id?: string;
  nom: string;
  prenom: string;
  tel: string;
  email: string;
  dateNaissance: string;
  active?: boolean;
  isAdmin?: boolean;

}
