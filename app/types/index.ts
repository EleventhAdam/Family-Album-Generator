export interface FamilyMember {
  id: string;
  name: string;
  photo?: string;
  birthDate?: string;
  deathDate?: string;
  parentIds: string[];
  spouseIds: string[];
  childrenIds: string[];
  bio?: string;
}

export interface FamilyTree {
  members: FamilyMember[];
  rootId: string;
}