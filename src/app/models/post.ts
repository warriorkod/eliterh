export class Post {
  id?: string;
  titre: string;
  lieu: string;
  type: string;
  categorie: string;
  secteur: string;
  dateCreate: string;
  dateVal: string;
  fiche: string;
  competences: string[] = [];
  structureName: string;
  index?: number;

  constructor() {
    this.id = Math.random().toString(36).substring(2);
  }
}
