import { Routes } from '@angular/router';
import { InvoiceSummaryComponent } from './components/invoice-summary/invoice-summary.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/invoice-form', pathMatch: 'full' },
  {
    path: 'invoice-form',
    component: InvoiceFormComponent,
    data: { title: 'Invoice Form' },
  },
  {
    path: 'invoice-summary',
    component: InvoiceSummaryComponent,
    data: { title: 'Invoice Summary' },
  },
];
