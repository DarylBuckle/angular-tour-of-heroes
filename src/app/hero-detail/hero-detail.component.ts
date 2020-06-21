import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService }  from '../Services/hero.service';
import { Hero } from '../Classes/hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  selectedHero: Hero;

  addLike(hero: Hero): void {
    if (hero.likes == null){
      hero.likes = 0;
    }
    hero.likes++;
  }

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location  
  ) { }

  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.setHero(hero));
  }

  goBack(): void {
    this.location.back();
  }

  setHero(hero){
    this.selectedHero = hero;
  }

  save(): void {
    this.heroService.updateHero(this.selectedHero)
      .subscribe(() => this.goBack());
  }
}
