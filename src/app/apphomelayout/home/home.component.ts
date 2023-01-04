import { Component, OnInit } from '@angular/core';
import { province } from '../province';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/core';
import { TripService } from 'src/app/shared/service/trip.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
import * as moment from 'moment';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { CryptoService } from 'src/app/shared/service/crypto.service';
import { StorageService } from 'src/app/shared/service/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  provinceData: any[] = [];
  isChecked: boolean = false;
  tripData: any[] = [];
  totalPage!: number;
  from!: string;
  to!: string;
  startTime!: any;
  count = 1;
  loading = true;

  constructor(
    private tripService: TripService,
    private loaderService: LoaderService,
    private cryptoService: CryptoService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.loadTrip(this.count);
    this._province();
  }

  private _province() {
    this.provinceData = province;
  }

  loadTrip(count: number) {
    this.loaderService.showLoading(true);

    this.tripService.getTrip(count).subscribe(
      (data: any) => {
        // const privateKey = this.storageService.retrieve();
        // const decrypt = this.cryptoService.decript('', privateKey);
        this.tripData = [
          ...this.tripData,
          ...this.getUniqueListBy(data.trips, '_id'),
        ];
        this.loaderService.showLoading(false);

        this.totalPage = data.count;
      },
      (err) => {
        this.loaderService.showLoading(false);
      }
    );
  }

  getUniqueListBy(arr: any, key: any) {
    return [...new Map(arr?.map((item: any) => [item[key], item])).values()];
  }

  findTrip(): void {
    const obj = {
      from: this.from,
      to: this.to,
      startTime: moment(this.startTime).format('YYYY/MM/DD'),
    };
    // const privateKey = this.storageService.retrieve();
    // const encrypt = this.cryptoService.encrypt(obj.toString(), privateKey);

    this.tripService.searchTrip(obj).subscribe((data: any) => {
      this.tripData = data?.filterd;
    });
  }

  doCheck() {
    let html = document.getElementsByTagName('html')[0];
    this.isChecked = !this.isChecked;
    if (this.isChecked == true) {
      html.classList.add('dark-mode');
    } else {
      html.classList.remove('dark-mode');
    }
  }

  getProvince(from: string) {
    let id = 0;
    for (let i = 0; i < this.provinceData.length; i++) {
      if (this.provinceData[i].id === from) {
        id = this.provinceData[i].name;
        break;
      }
    }
    return id;
  }

  reset(): void {
    this.from = '';
    this.to = '';
    this.startTime = '';
    this.loadTrip(1);
  }

  onIonInfinite(ev: any) {
    this.count++;
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
      this.loadTrip(this.count);
    }, 300);
  }
}
