export class User {
  nom: string;
  prenom: string;
  tel: string;
  email: string;
  dateNaissance: string;
  active?: boolean;
  isAdmin?: boolean;
  civilite?: string;
  adresse?: string;
  lieu?: string;
  ville?: string;
  etudeLevel?: string;
  experienceLevel?: string;
  actualDomain?: string;
  searchDomain?: string;

  constructor() {
  }
}
