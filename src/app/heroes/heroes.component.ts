import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service'; 
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
heroes: Hero[] = [];

constructor(
  private HeroService: HeroService,
  private messageService: MessageService
){}


getHeroes(): void {
  this.HeroService.getHeroes()
  .subscribe(heroes => this.heroes = heroes);
}
ngOnInit(): void {
  this.getHeroes();
}

}


