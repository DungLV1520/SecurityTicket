import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { province } from 'src/app/apphomelayout/province';
import { CompanyService } from 'src/app/shared/service/company.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { SeatService } from 'src/app/shared/service/seat.service';
import { TripService } from 'src/app/shared/service/trip.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss'],
})
export class TicketDetailComponent implements OnInit {
  paramsData: any;
  tripData: any;
  companyData: any;
  provinceData: any[] = [];
  seatData: any[] = [];
  arrayCheckItem: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private companyService: CompanyService,
    private seatService: SeatService,
    private router: Router,
    private loaderService: LoaderService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.paramsData = params;
      this.loadDetailTrip(this.paramsData.params.id);
    });

    this._province();
    this.loadCompanies();
  }

  private _province() {
    this.provinceData = province;
  }

  loadDetailTrip(id: string) {
    this.loaderService.showLoading(true);
    this.tripService.getTripId(id).subscribe(
      (resData: any) => {
        this.tripData = resData?.trip;
        this.loadSeatCompanyId(this.tripData.vehicle);
        this.loaderService.showLoading(false);
      },
      () => {
        this.loaderService.showLoading(false);
      }
    );
  }

  loadCompanies(): void {
    this.companyService.getCompany().subscribe((resData: any) => {
      this.companyData = resData.body.companies;
    });
  }

  getProvince(from?: string) {
    let id = 0;
    for (let i = 0; i < this.provinceData?.length; i++) {
      if (this.provinceData[i].id === from) {
        id = this.provinceData[i].name;
        break;
      }
    }
    return id;
  }

  getNameCompany(item: string) {
    let id = 0;
    for (let i = 0; i < this.companyData?.length; i++) {
      if (this.companyData[i]._id === item) {
        id = this.companyData[i].name;
        break;
      }
    }
    return id;
  }

  loadSeatCompanyId(id: string) {
    this.seatService.getSeatId(id).subscribe((data: any) => {
      this.seatData = data.seat;
    });
  }

  changeCheckedResultItem(event: any, item: any): void {
    if (event.target.checked) {
      this.arrayCheckItem.push(item._id);
    } else {
      this.removeElement(this.arrayCheckItem, item._id);
    }
  }

  removeElement(arr: Array<any>, e: string): void {
    const index = arr.indexOf(e);
    if (index > -1) {
      arr.splice(index, 1);
    }
  }

  navigateWithState(id: string) {
    if (this.arrayCheckItem.length <= 0) {
      this.presentToast('bottom', "You haven't chosen a chair yet");
      return;
    }
    this.router.navigate([`/ticket/booking/${id}`], {
      queryParams: { idSeat: JSON.stringify(this.arrayCheckItem) },
    });
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', messsage: string) {
    const toast = await this.toastController.create({
      message: messsage,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
}
