import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './content/category/category';
import { Product } from './content/product/product';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const DataAccount = [
      {id:1, name:'Super User', username:'root', level:'root', created:'2021-04-01', modified:'2021-04-01', isactive:'true' },
      {id:2, name:'Admin 1', username:'admin1', level:'admin', created:'2021-05-01', modified:'2021-05-01', isactive:'true' },
      {id:3, name:'Admin 2', username:'admin2', level:'admin', created:'2021-05-02', modified:'2021-05-02', isactive:'true' },
      {id:4, name:'Admin 3', username:'admin3', level:'admin', created:'2021-05-03', modified:'2021-05-03', isactive:'false' },
      {id:5, name:'User 1', username:'user1', level:'user', created:'2021-06-01', modified:'2021-06-01', isactive:'true' },
      {id:6, name:'User 2', username:'user2', level:'user', created:'2021-06-02', modified:'2021-06-02', isactive:'true' },
      {id:7, name:'User 3', username:'user3', level:'user', created:'2021-06-03', modified:'2021-06-03', isactive:'false' },
    ]

    const DataCategory = [
      {id:1, name:'Easy', description:'Description Category'},
      {id:2, name:'Medium', description:'Description Medium'},
      {id:3, name:'Hard', description:'Description Hard'},
      {id:4, name:'Expert', description:'Description Expert'},
      {id:5, name:'Very Expert', description:'Description Very Expert'},
    ];

    const DataProduct = [
      {id:1, category_id:1 , name:'Product 1', description:'Description P1', price:'1000', date:'2021-09-11'},
      {id:2, category_id:1 , name:'Product 2', description:'Description P2', price:'2000', date:'2021-09-12'},
      {id:3, category_id:2 , name:'Product 3', description:'Description P3', price:'3000', date:'2021-09-13'},
      {id:4, category_id:2 , name:'Product 4', description:'Description P4', price:'4000', date:'2021-09-14'},
      {id:5, category_id:3 , name:'Product 5', description:'Description P5', price:'5000', date:'2021-09-15'},
    ];
    
    return {DataAccount, DataCategory, DataProduct};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(DataCategory: Category[]): number {
    return DataCategory.length > 0 ? Math.max(...DataCategory.map(hero => hero.id)) + 1 : 11;
  }
}
