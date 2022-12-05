import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { province } from 'src/app/apphomelayout/province';
import { CompanyService } from 'src/app/shared/service/company.service';
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

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private companyService: CompanyService,
    private seatService: SeatService
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
    this.tripService.getTripId(id).subscribe((resData: any) => {
      this.tripData = resData?.trip;
      this.loadSeatCompanyId(this.tripData.vehicle);
    });
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
}
