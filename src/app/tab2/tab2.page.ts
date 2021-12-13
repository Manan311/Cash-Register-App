import { Component, OnInit } from '@angular/core';
import { AppmanagerService } from '../appmanager.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit{
  constructor(
    private appManagerService: AppmanagerService
    ) {}

  ngOnInit() {}
}
