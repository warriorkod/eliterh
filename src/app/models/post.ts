export class Post
{
    id?: string;
    titre: string;
    lieu: string;
    type: string;
    categorie: string;
    secteur: string;
    date_create: string;
    date_val: string;
    fiche: string;
    competences: string[] = [];
    structure_name: string;
    index?: number;

    constructor(){
        this.id = Math.random().toString(36).substring(2);
    }
}
