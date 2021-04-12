import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private route : ActivatedRoute) { }

  paramindex : string;

  ngOnInit() {
    let isiindex = this.route.snapshot.paramMap.get('nama');
    this.paramindex = isiindex;
    console.log(this.paramindex);
    if(this.paramindex==""||this.paramindex==null){
    }
    else{
      document.getElementById('ctn').append('<ion-img [src]="paramindex" id="image"></ion-img>');
    }
  }

}
