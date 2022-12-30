import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/shared/service/company.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { TicketService } from 'src/app/shared/service/ticket.service';
import { VehicleService } from 'src/app/shared/service/vehicle.service';
import { province } from '../province';

@Component({
  selector: 'app-ticket-booked',
  templateUrl: './ticket-booked.component.html',
  styleUrls: ['./ticket-booked.component.scss'],
})
export class TicketBookedComponent implements OnInit {
  provinceData: any;
  ticketData: any;
  vehicleData: any;
  companyData: any;

  constructor(
    private ticketService: TicketService,
    private vehicleService: VehicleService,
    private companyService: CompanyService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.loadTicket();
    this._province();
    this.fetchVehicle();
    this.fetchCompany();
  }

  private _province() {
    this.provinceData = province;
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

  loadTicket(): void {
    this.loaderService.showLoading(true);

    this.ticketService.getTicket().subscribe(
      (data: any) => {
        this.ticketData = data;
        this.loaderService.showLoading(false);
      },
      () => {
        this.loaderService.showLoading(false);
      }
    );
  }

  checkVehicle(id: string): string {
    for (let i = 0; i < this.vehicleData?.length; i++) {
      if (this.vehicleData[i]._id === id) {
        return this.vehicleData[i].name;
      }
    }
    return '';
  }

  fetchVehicle() {
    this.vehicleService.getVehicle().subscribe((data: any) => {
      this.vehicleData = data.vehicles;
    });
  }

  checkCompany(id: string): string {
    for (let i = 0; i < this.companyData?.length; i++) {
      if (this.companyData[i]._id === id) {
        return this.companyData[i].name;
      }
    }
    return '';
  }

  fetchCompany() {
    this.companyService.getCompany().subscribe((data: any) => {
      this.companyData = data.body.companies;
    });
  }

  forMatNumber(data: any) {
    return Number(data);
  }
}
