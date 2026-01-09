import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { TabsModule } from 'primeng/tabs';
import { MessageService } from 'primeng/api';

import {
  BusinessType,
  CertificationUpload,
  CERTIFICATION_TYPES,
  EMPLOYEE_RANGES,
  INDUSTRIES
} from './models/supplier-registration.model';

@Component({
  selector: 'app-supplier-onboarding-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    DatePickerModule,
    FileUploadModule,
    CheckboxModule,
    MessageModule,
    ToastModule,
    TabsModule
  ],
  providers: [MessageService],
  templateUrl: './supplier-onboarding.page.html',
  styleUrls: ['./supplier-onboarding.page.scss']
})
export class SupplierOnboardingPage implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private messageService = inject(MessageService);

  companyForm!: FormGroup;
  contactForm!: FormGroup;
  certificationForm!: FormGroup;
  accountForm!: FormGroup;

  businessTypes = Object.values(BusinessType).map((value) => ({ label: value, value }));
  industries = INDUSTRIES.map((value) => ({ label: value, value }));
  employeeRanges = EMPLOYEE_RANGES.map((value) => ({ label: value, value }));
  certificationTypes = CERTIFICATION_TYPES.map((value) => ({ label: value, value }));

  activeIndex = 0;
  certifications: CertificationUpload[] = [];
  showCertificationForm = false;
  editingIndex = -1;

  ngOnInit(): void {
    this.initializeForms();
  }

  initializeForms(): void {
    this.companyForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.minLength(2)]],
      taxId: ['', [Validators.required, Validators.pattern(/^[A-Z0-9-]+$/)]],
      businessType: [null, Validators.required],
      industry: [null, Validators.required],
      yearEstablished: [
        null,
        [Validators.required, Validators.min(1800), Validators.max(new Date().getFullYear())]
      ],
      numberOfEmployees: [null, Validators.required],
      website: ['', Validators.pattern(/^https?:\/\/.+/)]
    });

    this.contactForm = this.fb.group({
      primaryContactName: ['', [Validators.required, Validators.minLength(2)]],
      primaryContactEmail: ['', [Validators.required, Validators.email]],
      primaryContactPhone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-()]+$/)]],
      primaryContactPosition: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^[A-Z0-9\s-]+$/i)]]
    });

    this.certificationForm = this.fb.group({
      type: [null, Validators.required],
      number: ['', Validators.required],
      issuedDate: [null, Validators.required],
      expiryDate: [null, Validators.required],
      issuingAuthority: ['', Validators.required],
      file: [null, Validators.required]
    });

    this.accountForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(4)]],
        password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
        confirmPassword: ['', Validators.required],
        termsAccepted: [false, Validators.requiredTrue]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasNumber = /[0-9]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasSpecial = /[!@#$%^&*]/.test(value);

    return hasNumber && hasUpper && hasLower && hasSpecial ? null : { passwordStrength: true };
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  nextStep(): void {
    const forms = [this.companyForm, this.contactForm, null, this.accountForm];
    const currentForm = forms[this.activeIndex];

    if (currentForm && currentForm.invalid) {
      currentForm.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please fill in all required fields correctly.'
      });
      return;
    }

    this.activeIndex++;
  }

  previousStep(): void {
    this.activeIndex--;
  }

  getCertificationMessage(): string {
    const businessType = this.companyForm.get('businessType')?.value as BusinessType | null;
    if (businessType === BusinessType.MANUFACTURER || businessType === BusinessType.DISTRIBUTOR) {
      return 'Certifications are optional now but recommended for Manufacturers and Distributors.';
    }
    return 'Certifications are optional but improve visibility in sourcing events.';
  }

  openCertificationForm(): void {
    this.showCertificationForm = true;
    this.certificationForm.reset();
    this.editingIndex = -1;
  }

  editCertification(cert: CertificationUpload, index: number): void {
    this.showCertificationForm = true;
    this.editingIndex = index;

    this.certificationForm.patchValue({
      type: cert.type,
      number: cert.number,
      issuedDate: cert.issuedDate,
      expiryDate: cert.expiryDate,
      issuingAuthority: cert.issuingAuthority
    });
  }

  cancelCertificationForm(): void {
    this.showCertificationForm = false;
    this.certificationForm.reset();
    this.editingIndex = -1;
  }

  onFileSelect(event: any): void {
    const file = event.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      this.messageService.add({
        severity: 'error',
        summary: 'File Too Large',
        detail: 'File size must be less than 10MB.'
      });
      return;
    }

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid File Type',
        detail: 'Only PDF, JPG, and PNG files are allowed.'
      });
      return;
    }

    this.certificationForm.patchValue({ file });
  }

  saveCertification(): void {
    if (this.certificationForm.invalid) {
      this.certificationForm.markAllAsTouched();
      return;
    }

    const formValue = this.certificationForm.value;
    const file = formValue.file as File;
    const certification: CertificationUpload = {
      id: this.editingIndex >= 0 ? this.certifications[this.editingIndex].id : this.generateId(),
      type: formValue.type,
      number: formValue.number,
      issuedDate: formValue.issuedDate,
      expiryDate: formValue.expiryDate,
      issuingAuthority: formValue.issuingAuthority,
      file,
      fileName: file?.name,
      fileSize: file?.size
    };

    if (this.editingIndex >= 0) {
      this.certifications[this.editingIndex] = certification;
      this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Certification updated.' });
    } else {
      this.certifications.push(certification);
      this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Certification added.' });
    }

    this.cancelCertificationForm();
  }

  removeCertification(index: number): void {
    this.certifications.splice(index, 1);
    this.messageService.add({ severity: 'info', summary: 'Removed', detail: 'Certification removed.' });
  }

  formatFileSize(bytes: number): string {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`;
  }

  submitRegistration(): void {
    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();
      return;
    }

    this.messageService.add({
      severity: 'success',
      summary: 'Registration Submitted',
      detail: 'Your supplier profile has been submitted for review.'
    });

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }

  generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(form: FormGroup, fieldName: string): string {
    const field = form.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return 'This field is required';
    if (field.errors['email']) return 'Invalid email format';
    if (field.errors['minlength']) return `Minimum ${field.errors['minlength'].requiredLength} characters required`;
    if (field.errors['pattern']) return 'Invalid format';
    if (field.errors['min']) return `Minimum value is ${field.errors['min'].min}`;
    if (field.errors['max']) return `Maximum value is ${field.errors['max'].max}`;
    if (field.errors['passwordStrength']) {
      return 'Password must contain uppercase, lowercase, number, and special character';
    }

    return 'Invalid value';
  }
}
