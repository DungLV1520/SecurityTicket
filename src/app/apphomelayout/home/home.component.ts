import { Component, OnInit } from '@angular/core';
import { province } from '../province';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/core';
import { TripService } from 'src/app/shared/service/trip.service';
import { Trip } from 'src/app/shared/model/trip.model';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

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

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.loadTrip(this.count);
    this._province();
  }

  private _province() {
    this.provinceData = province;
  }

  ngAfterInit() {}

  loadTrip(count: number) {
    this.tripService.getTrip(count).subscribe((data: any) => {
      this.tripData = [
        ...this.tripData,
        ...this.getUniqueListBy(data.trips, '_id'),
      ];
      this.totalPage = data.count;
    });
  }

  getUniqueListBy(arr: any, key: any) {
    return [...new Map(arr?.map((item: any) => [item[key], item])).values()];
  }

  findTrip(): void {
    const obj = {
      from: this.from,
      to: this.to,
      startTime: `${this.startTime.year}-${
        Number(this.startTime.month) < 10
          ? '0' + this.startTime.month
          : this.startTime.month
      }-${
        Number(this.startTime.day) < 10
          ? '0' + this.startTime.day
          : this.startTime.day
      }`,
    };

    console.log(obj);

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
    this.loadTrip(this.count);
  }

  onIonInfinite(ev: any) {
    this.count++;
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
      this.loadTrip(this.count);
    }, 300);
  }
}
