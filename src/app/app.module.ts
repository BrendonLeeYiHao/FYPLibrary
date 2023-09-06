import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';

import { NzModule } from './nz.module';

import { NgChartsModule } from 'ng2-charts';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterPublicComponent } from './register/register-public/register-public.component';
import { BookComponent } from './book/book.component';
import { NavigationBarAdminComponent } from './navigation-bar-admin/navigation-bar-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuestLayoutComponent } from './guest-layout/guest-layout.component';
import { LibrarianLayoutComponent } from './librarian-layout/librarian-layout.component';
import { LibrarianBookComponent } from './librarian-book/librarian-book.component';
import { DatePipe } from '@angular/common';
import { StockAddComponent } from './stock/stock-add/stock-add.component';
import { StockDeleteUpdateComponent } from './stock/stock-delete-update/stock-delete-update.component';
import { RefreshmentAddComponent } from './refreshment/refreshment-add/refreshment-add.component';
import { RefreshmentDeleteUpdateComponent } from './refreshment/refreshment-delete-update/refreshment-delete-update.component';
import { RoomModalComponent } from './room-modal/room-modal.component';
import { RoomFeedbackModalComponent } from './room-feedback-modal/room-feedback-modal.component';
import { RegisterAllComponent } from './register/register-all/register-all.component';
import { ApproveRejectComponent } from './account/approve-reject/approve-reject.component';
import { UpdateDeleteComponent } from './account/update-delete/update-delete.component';
import { LibrarianDeleteUpdateComponent } from './librarian-delete-update/librarian-delete-update.component';
import { GraphRoomComponent } from './statistic/graph-room/graph-room.component';
import { GraphEquipmentComponent } from './statistic/graph-equipment/graph-equipment.component';
import { GraphRefreshmentComponent } from './statistic/graph-refreshment/graph-refreshment.component';
import { RevenueComponent } from './revenue/revenue.component';
import { FilterPipe } from './filter.pipe';
import { AuthGuard } from './auth.guard';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { ContactComponent } from './contact/contact.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ProfileComponent } from './profile/profile.component';
import { RoomComponent } from './room/room.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterPublicComponent,
    BookComponent,
    NavigationBarAdminComponent,
    DashboardComponent,
    GuestLayoutComponent,
    LibrarianLayoutComponent,
    LibrarianBookComponent,
    StockAddComponent,
    StockDeleteUpdateComponent,
    RefreshmentAddComponent,
    RefreshmentDeleteUpdateComponent,
    RoomModalComponent,
    RoomFeedbackModalComponent,
    RegisterAllComponent,
    ApproveRejectComponent,
    UpdateDeleteComponent,
    LibrarianDeleteUpdateComponent,
    GraphRoomComponent,
    GraphEquipmentComponent,
    GraphRefreshmentComponent,
    RevenueComponent,
    FilterPipe,
    BookingHistoryComponent,
    ContactComponent,
    FeedbackComponent,
    ProfileComponent,
    RoomComponent,
    AboutComponent,
    ServicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NzModule,
    NgChartsModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US } , DatePipe, AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
