import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ICreateOrderRequest } from 'ngx-paypal';
import { province } from 'src/app/apphomelayout/province';
import { Payment } from 'src/app/shared/model/payment.model';
import { CompanyService } from 'src/app/shared/service/company.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { SeatService } from 'src/app/shared/service/seat.service';
import { TicketService } from 'src/app/shared/service/ticket.service';
import { TripService } from 'src/app/shared/service/trip.service';

@Component({
  selector: 'app-ticket-booking',
  templateUrl: './ticket-booking.component.html',
  styleUrls: ['./ticket-booking.component.scss'],
})
export class TicketBookingComponent implements OnInit {
  payment: Payment = new Payment();
  arrayIdSeat: any[] = [];
  seatData: any[] = [];
  tripData: any;
  paramsData: any;
  provinceData: any[] = [];
  arraySeatFilter: any[] = [];
  companyData: any;
  totalSeat = 0;
  public payPalConfig: any;
  p!: string;
  priceUsd: any;
  checkCreateSuccess = false;
  checkCreateError = false;
  checkCreateErrorPayPal = false;
  checkCreateCancel = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private seatService: SeatService,
    private tripService: TripService,
    private router: Router,
    private companyService: CompanyService,
    private ticketService: TicketService,
    private toastController: ToastController,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.arrayIdSeat = JSON.parse(data.idSeat);
    });

    this.activatedRoute.paramMap.subscribe((params) => {
      this.paramsData = params;
      this.loadDetailTrip(this.paramsData.params.id);
    });

    this._province();
    this.loadCompanies();
    this.loadPayPal();
  }

  private _province() {
    this.provinceData = province;
  }

  loadSeatCompanyId(id: string) {
    this.seatService.getSeatId(id).subscribe((data: any) => {
      this.seatData = data.seat;
      this.arraySeatFilter = [];
      this.arrayIdSeat.forEach((data) => {
        this.seatData.forEach((item) => {
          if (data === item._id) {
            this.arraySeatFilter.push(item);
            this.totalSeat +=
              item.type === 'VIP'
                ? Number(this.tripData.price * 1.2)
                : Number(this.tripData.price);
          }
        });
      });
    });
  }

  loadDetailTrip(id: string) {
    this.loaderService.showLoading(true);
    this.tripService.getTripId(id).subscribe(
      (resData: any) => {
        this.tripData = resData?.trip;
        this.loaderService.showLoading(false);
        this.loadSeatCompanyId(this.tripData.vehicle);
      },
      (err) => {
        this.loaderService.showLoading(false);
      }
    );
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

  loadCompanies(): void {
    this.companyService.getCompany().subscribe((resData: any) => {
      this.companyData = resData.body.companies;
    });
  }

  private loadPayPal(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data: any) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: `${(this.totalSeat / 23087.5).toFixed(2)}`,
              },
            },
          ],
        },
      advanced: {
        commit: 'true',
        extraQueryParams: [{ name: 'disable-funding', value: 'credit,card' }],
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (
        data: any,
        actions: { order: { get: () => Promise<any> } }
      ) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data: {
        id: any;
        status: any;
        payer: { email_address: any };
        update_time: any;
      }) => {
        const seatId = this.arraySeatFilter.map((data) => {
          return data._id;
        });
        this.payment.trip = this.tripData._id;
        this.payment.company = this.tripData.company;
        this.payment.vehicle = this.tripData.vehicle;
        this.payment.amountPaid = this.totalSeat;
        this.payment.seat = seatId;
        this.payment.paymentInfo = {
          id: `${data.id}`,
          status: `${data.status}`,
          email_address: `${data.payer.email_address}`,
          update_time: `${data.update_time}`,
        };

        this.ticketService.createTicket(this.payment).subscribe(
          (res: any) => {
            this.checkCreateSuccess = true;
            this.presentToast('bottom', 'Book ticket success!!!');
            this.router.navigate(['/menu/booked']);
          },
          (err) => {
            this.checkCreateError = true;
            this.presentToast('bottom', 'Book ticket fail!!!');
          }
        );
      },
      onCancel: (data: any, actions: any) => {
        this.checkCreateCancel = true;
        this.presentToast('bottom', 'Book ticket cancel!!!');
      },

      onError: (err: any) => {
        this.checkCreateErrorPayPal = true;
        this.presentToast('bottom', 'Book ticket error paypal!!!');
      },
      onClick: (data: any, actions: any) => {
        console.log('onClick', data, actions);
      },
    };
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
