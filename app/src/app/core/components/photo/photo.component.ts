import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { HomePageService } from '../../services/pages/home-page.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  animations: [
    trigger('photoAnimated', [
      state('noPhoto', style({})),
      state('hasPhoto', style({})),
      transition('noPhoto <=> hasPhoto',
        animate(1000)
      )
    ])
  ]
})
export class PhotoComponent implements OnInit, OnChanges {
  className = 'PhotoComponent';
  @Input() thirdPartyId: number;
  @ViewChild('thirdPartyImage', { static: false }) thirdPartyImage: ElementRef;

  preloadPhoto: boolean = true;
  statePhoto: string = 'noPhoto';

  constructor(private homePageService: HomePageService) { }

  ngOnInit(): void {}

  async ngOnChanges(change: SimpleChanges) {
    if (change['thirdPartyId']) {
      await this.getPhoto(this.thirdPartyId);
    }
  }
  
  public async getPhoto(id: number | string) {
    let res = null;
    try {
      res = await this.homePageService.getPhoto(id);
      if (!res?.bufferImg?.data || !res?.typeImg) {
        this.preloadPhoto = false;
        this.statePhoto = 'hasPhoto';
        return this.thirdPartyImage.nativeElement.src = 'assets/img/no-image.png';
      } 

      if (res?.bufferImg?.data && res?.typeImg) {
        const bufferImg = new Uint8Array(res?.bufferImg?.data);
        const blob = new Blob([bufferImg], {type: res?.typeImg});
        if (blob.size > 0) {
          this.preloadPhoto = false;
          this.statePhoto = 'hasPhoto';
          const urlCreator = window.URL || window.webkitURL;
          const imageUrl = urlCreator.createObjectURL(blob);
          this.thirdPartyImage.nativeElement.src = imageUrl;

        }
      }

    } catch (err) {
      this.preloadPhoto = false;
      this.statePhoto = 'noPhoto';
      console.error(`Error en ${this.className} => getPhoto`, err);
    }
  }

  public async getPhotoProfessional(id: number | string) {
    let finished = false;
    let cancel:any = () => finished = true;
    let res = null;

    const promise = new Promise<any | void>((resolve: any, reject) => {
      (async () => {
        try {
          if (!id) {
            reject();
            return;
          }
          res = await this.homePageService.getPhoto(id);
          if (!res?.bufferImg?.data || !res?.typeImg) {
            this.preloadPhoto = false;
            this.statePhoto = 'hasPhoto';
            this.thirdPartyImage.nativeElement.src = 'assets/img/no-image.png';
            
          } else {
            // Valida que contega la imagen
            if (res?.bufferImg?.data && res?.typeImg) {
              const bufferImg = new Uint8Array(res?.bufferImg?.data);
              const blob = new Blob([bufferImg], {type: res?.typeImg});
              if (blob.size > 0) {
                this.preloadPhoto = false;
                this.statePhoto = 'hasPhoto';
                const urlCreator = window.URL || window.webkitURL;
                const imageUrl = urlCreator.createObjectURL(blob);
                this.thirdPartyImage.nativeElement.src = imageUrl;
  
              }
            }
          }
          resolve();

          cancel = () => {
            if (finished) return;
            console.log('OK, I\'ll stop counting.');
            reject();
          };

          if (finished) {
            cancel();
          } 

        } catch (err) {
          console.error(`Error en ${this.className} => getPhoto`, err);
        }
      })();
    })
    .then((resolvedValue) =>{
      finished = true;
			return resolvedValue;
    })
    .catch((err) => {
      finished = true;
			return err;
    });
    return { promise, cancel };

  }


}
