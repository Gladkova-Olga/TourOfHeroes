import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service'; 

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent {
selectedHero? : Hero;
heroes: Hero[] = [];
onSelected(hero: Hero): void {
  this.selectedHero = hero;
} 
constructor(
  private HeroService: HeroService
){}
getHeroes() {
  this.heroes = this.HeroService.getHeroes();
}
ngOnInit(): void {
  this.getHeroes();
}
}


