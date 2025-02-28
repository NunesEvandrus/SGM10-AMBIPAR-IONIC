import { Component, OnInit } from '@angular/core';
import { CUSTOMER_CONFIGS } from 'src/environments/environment';

@Component({
  selector: 'app-acesso-wrap',
  templateUrl: './acesso-wrap.component.html',
  styleUrls: ['./acesso-wrap.component.scss']
})
export class AcessoWrapComponent implements OnInit {
  logo = CUSTOMER_CONFIGS.LogoLogin;

  constructor() {}

  ngOnInit() {}
}
