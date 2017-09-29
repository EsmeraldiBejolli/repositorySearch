export class RepositoryModel {
  name: string;
  value: number;

  constructor(name, contributes) {
    this.name = name;
    this.value = contributes;
  }
}
