import {
  Component,
  DestroyRef,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Company, CompanyResponse, Item } from './invoice-summary.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-invoice-summary',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './invoice-summary.component.html',
})
export class InvoiceSummaryComponent implements OnInit, OnDestroy {
  company: Company | null = null;
  items: Item[] = [];
  totalAmount: number = 0;
  tableHeaders = ['Name', 'Count', 'Price'];
  private destroyerRef = inject(DestroyRef);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCompanyData();
    this.loadItems();
  }

  loadCompanyData() {
    const headers = new HttpHeaders({
      'X-Master-Key': environment.apiKey,
    });

    // Load company info from the backend
    return this.http
      .get<CompanyResponse>(environment.apiUrl, { headers })
      .pipe(takeUntilDestroyed(this.destroyerRef))
      .subscribe(
        (data) => (this.company = data.record),
        (error) => console.error('Error loading company info', error),
      );
  }

  loadItems(): void {
    const storedItems = sessionStorage.getItem('invoiceItems');
    if (storedItems) {
      this.items = JSON.parse(storedItems);
      this.calculateTotalAmount();
    }
  }

  calculateTotalAmount(): void {
    this.totalAmount = this.items.reduce(
      (sum, item) => sum + item.count * item.price,
      0,
    );
  }

  resetData(): void {
    sessionStorage.removeItem('invoiceItems');
    this.items = [];
    this.totalAmount = 0;
  }

  ngOnDestroy(): void {
    this.resetData();
  }
}
