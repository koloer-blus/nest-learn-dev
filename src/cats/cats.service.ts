import { Injectable } from '@nestjs/common';

interface ICat {
  name: string;
  color: string;
  age: number;
}

@Injectable()
export class CatsService {
  private readonly cats: ICat[] = [];
  create(cat: ICat) {
    this.cats.push(cat);
  }
  findAll(): ICat[] {
    return this.cats;
  }
}
