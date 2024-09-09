import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Item } from '../invoice-summary/invoice-summary.model';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './invoice-form.component.html',
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.invoiceForm = this.fb.group({
      items: this.fb.array([]), // FormArray for dynamic items
    });
  }

  ngOnInit(): void {
    this.ensureAtLeastOneItem();
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem(): void {
    const itemForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      count: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
      price: [
        1,
        [Validators.required, Validators.min(1), Validators.max(1000000)],
      ],
    });

    this.items.push(itemForm);
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
    this.ensureAtLeastOneItem();
  }

  ensureAtLeastOneItem(): void {
    if (this.items.length === 0) {
      this.addItem();
    }
  }

  onSubmit(): void {
    this.errorMessage = null;
    // Check if at least one item is valid
    const hasValidItem = this.items.controls.some((item) => item.valid);

    if (!hasValidItem) {
      this.invoiceForm.markAllAsTouched(); // Highlight errors for all items
      this.errorMessage = 'Please add at least one valid item';
      return;
    }

    // Filter out invalid items
    const validItems = this.items.controls
      .filter((item) => item.valid)
      .map((item) => item.value as Item);

    sessionStorage.setItem('invoiceItems', JSON.stringify(validItems)); // Navigate to the summary page if there is at least one valid item
    this.router.navigate(['/invoice-summary']);
  }

  getNameError(index: number): string {
    const control = this.items.at(index).get('name');
    if (control?.hasError('required')) return 'Name is required';
    if (control?.hasError('minlength')) return 'Minimum 3 characters';
    if (control?.hasError('maxlength')) return 'Maximum 30 characters';
    return '';
  }

  getCountError(index: number): string {
    const control = this.items.at(index).get('count');
    if (control?.hasError('required')) return 'Count is required';
    if (control?.hasError('min')) return 'Minimum 1';
    if (control?.hasError('max')) return 'Maximum 100';
    return '';
  }

  getPriceError(index: number): string {
    const control = this.items.at(index).get('price');
    if (control?.hasError('required')) return 'Price is required';
    if (control?.hasError('min')) return 'Minimum price is 1';
    if (control?.hasError('max')) return 'Maximum price is 1,000,000';
    return '';
  }
}
