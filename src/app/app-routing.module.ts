import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterPublicComponent } from './register/register-public/register-public.component';
import { BookComponent } from './book/book.component';
import { NavigationBarAdminComponent } from './navigation-bar-admin/navigation-bar-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { GuestLayoutComponent } from './guest-layout/guest-layout.component';
import { LibrarianLayoutComponent } from './librarian-layout/librarian-layout.component';
import { LibrarianBookComponent } from './librarian-book/librarian-book.component';
import { StockAddComponent } from './stock/stock-add/stock-add.component';
import { StockDeleteUpdateComponent } from './stock/stock-delete-update/stock-delete-update.component';
import { RefreshmentAddComponent } from './refreshment/refreshment-add/refreshment-add.component';
import { RefreshmentDeleteUpdateComponent } from './refreshment/refreshment-delete-update/refreshment-delete-update.component';
import { RegisterAllComponent } from './register/register-all/register-all.component';
import { ApproveRejectComponent } from './account/approve-reject/approve-reject.component';
import { UpdateDeleteComponent } from './account/update-delete/update-delete.component';
import { LibrarianDeleteUpdateComponent } from './librarian-delete-update/librarian-delete-update.component';
import { GraphRoomComponent } from './statistic/graph-room/graph-room.component';
import { GraphEquipmentComponent } from './statistic/graph-equipment/graph-equipment.component';
import { GraphRefreshmentComponent } from './statistic/graph-refreshment/graph-refreshment.component';
import { RevenueComponent } from './revenue/revenue.component';
import { AuthGuard } from './auth.guard';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { ContactComponent } from './contact/contact.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ProfileComponent } from './profile/profile.component';
import { RoomComponent } from './room/room.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';

const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch:'full'},
  {
    path: '',
    component: GuestLayoutComponent,
    children:[
      { path: 'home', component: HomeComponent},
      { path: 'login', component: LoginComponent},
      { path: 'registerpublic', component: RegisterPublicComponent},
      { path: 'book', component: BookComponent, canActivate: [AuthGuard]},
      { path: 'booking-history', component: BookingHistoryComponent, canActivate: [AuthGuard]},
      { path: 'contact', component: ContactComponent},
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
      { path: 'about', component: AboutComponent},
      { path: 'services', component: ServicesComponent}
    ],
  },
  {
    path: 'admin',
    component: LibrarianLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent},
      { path: 'stock-add', component: StockAddComponent},
      { path: 'stock-delete-update', component: StockDeleteUpdateComponent},
      { path: 'refreshment-add', component: RefreshmentAddComponent},
      { path: 'refreshment-delete-update', component: RefreshmentDeleteUpdateComponent},
      { path: 'register-all', component: RegisterAllComponent},
      { path: 'account-approve-reject', component: ApproveRejectComponent},
      { path: 'account-update-delete', component: UpdateDeleteComponent},
      { path: 'librarian-book', component: LibrarianBookComponent},
      { path: 'librarian-delete-update', component: LibrarianDeleteUpdateComponent},
      { path: 'statistic-usage-room', component: GraphRoomComponent},
      { path: 'statistic-usage-equipment', component: GraphEquipmentComponent},
      { path: 'statistic-usage-refreshment', component: GraphRefreshmentComponent},
      { path: 'revenue', component: RevenueComponent},
      { path: 'feedback', component: FeedbackComponent},
      { path: 'profile', component: ProfileComponent},
      { path: 'room', component: RoomComponent}
    ]
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch:'full'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
