import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { HomePageService } from '../../services/pages/home-page.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit, OnChanges {
  className = 'PhotoComponent';
  @Input() thirdPartyId: number;
  @ViewChild('thirdPartyImage') thirdPartyImage: ElementRef;

  hasImage = false;
  isLoading = false;

  constructor(private homePageService: HomePageService) { }

  ngOnInit(): void {
  }

  async ngOnChanges(change: SimpleChanges) {
    if (change['thirdPartyId']) {
      await this.getPhoto(this.thirdPartyId);
    }
  }

  public async getPhoto(id: number | string) {
    let res = null;
    try {
      res = await this.homePageService.getPhoto(id);
      if (!res?.bufferImg?.data || !res?.typeImg) return this.thirdPartyImage.nativeElement.src = 'assets/img/no-image.png';

      if (res?.bufferImg?.data && res?.typeImg) {
        this.isLoading = false;
        const bufferImg = new Uint8Array(res?.bufferImg?.data);
        const blob = new Blob([bufferImg], {type: res?.typeImg});
        if (blob.size > 0) {
          const urlCreator = window.URL || window.webkitURL;
          const imageUrl = urlCreator.createObjectURL(blob);
          this.thirdPartyImage.nativeElement.src = imageUrl;
          this.hasImage = true;
        }
      }

    } catch (err) {
      this.isLoading = false;
      this.hasImage = false;
      console.error(`Error en ${this.className} => getPhoto`, err);
    }
  }

}
