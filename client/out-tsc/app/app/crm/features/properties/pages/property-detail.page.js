import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { PropertyDataService } from '../services/property-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';
import { CrmEventsService } from '../../../../core/realtime/crm-events.service';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
import * as i3 from "primeng/skeleton";
import * as i4 from "primeng/api";
import * as i5 from "primeng/dialog";
import * as i6 from "@angular/forms";
import * as i7 from "primeng/inputtext";
import * as i8 from "primeng/inputnumber";
import * as i9 from "primeng/textarea";
import * as i10 from "primeng/select";
import * as i11 from "primeng/datepicker";
import * as i12 from "primeng/inputgroup";
import * as i13 from "primeng/inputgroupaddon";
import * as i14 from "primeng/tag";
import * as i15 from "primeng/table";
const _c0 = () => ({ width: "400px" });
const _c1 = () => ({ width: "500px" });
const _c2 = () => ({ standalone: true });
const _c3 = () => ({ width: "520px" });
const _c4 = a0 => ["/app/properties", a0, "edit"];
const _c5 = a0 => ["/app/settings/users", a0];
const _c6 = a0 => ["/app/customers", a0];
const _c7 = a0 => ["/app/contacts", a0];
const _c8 = () => [1, 2, 3, 4, 5];
const _c9 = () => ({ width: "420px" });
function PropertyDetailPage_div_5_ng_container_1_a_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 146);
    i0.ɵɵelement(1, "i", 56);
    i0.ɵɵtext(2, " Edit ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵproperty("routerLink", "/app/properties/" + prop_r3.id + "/edit");
} }
function PropertyDetailPage_div_5_ng_container_1_span_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 147);
    i0.ɵɵelement(1, "i", 148);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" MLS ", prop_r3.mlsNumber, " ");
} }
function PropertyDetailPage_div_5_ng_container_1_span_19_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(", ", prop_r3.province);
} }
function PropertyDetailPage_div_5_ng_container_1_span_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 149);
    i0.ɵɵelement(1, "i", 150);
    i0.ɵɵtext(2);
    i0.ɵɵtemplate(3, PropertyDetailPage_div_5_ng_container_1_span_19_ng_container_3_Template, 2, 1, "ng-container", 98);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", prop_r3.city);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r3.province);
} }
function PropertyDetailPage_div_5_ng_container_1_div_20_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 151)(1, "button", 152);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_div_20_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r4); const ctx_r4 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r4.onChangeStatus()); });
    i0.ɵɵelementStart(2, "span", 153);
    i0.ɵɵelement(3, "i", 154);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5, "Change Status");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "button", 155);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_div_20_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r4); const ctx_r4 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r4.onLogShowing()); });
    i0.ɵɵelementStart(7, "span", 153);
    i0.ɵɵelement(8, "i", 156);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10, "Log Showing");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "button", 157);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_div_20_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r4); const ctx_r4 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r4.onUploadDocument()); });
    i0.ɵɵelementStart(12, "span", 153);
    i0.ɵɵelement(13, "i", 158);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span");
    i0.ɵɵtext(15, "Upload Document");
    i0.ɵɵelementEnd()()();
} }
function PropertyDetailPage_div_5_ng_container_1_div_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 159)(1, "span", 160);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 161);
    i0.ɵɵtext(4, "Sale Price");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext().ngIf;
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r4.formatCurrency(prop_r3.salePrice, prop_r3.currency));
} }
function PropertyDetailPage_div_5_ng_container_1_section_28_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 172)(1, "div", 173);
    i0.ɵɵelement(2, "i", 174);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 175)(4, "span", 176);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 177);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "button", 178);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_section_28_div_11_Template_button_click_9_listener() { const alert_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r4 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r4.dismissAlert(alert_r8.id)); });
    i0.ɵɵelement(10, "i", 169);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const alert_r8 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("ngClass", "live-alert--" + alert_r8.type);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r4.alertTypeIcon(alert_r8.type));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", alert_r8.icon);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(alert_r8.message);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(8, 5, alert_r8.timestamp, "shortTime"));
} }
function PropertyDetailPage_div_5_ng_container_1_section_28_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 162)(1, "div", 163)(2, "div", 164);
    i0.ɵɵelement(3, "span", 165);
    i0.ɵɵelementStart(4, "span", 166);
    i0.ɵɵtext(5, "Live Updates");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 167);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 168);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_section_28_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r6); const ctx_r4 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r4.clearAllAlerts()); });
    i0.ɵɵelement(9, "i", 169);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 170);
    i0.ɵɵtemplate(11, PropertyDetailPage_div_5_ng_container_1_section_28_div_11_Template, 11, 8, "div", 171);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r4.liveAlerts().length);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r4.liveAlerts());
} }
function PropertyDetailPage_div_5_ng_container_1_section_29_div_5_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 187);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_section_29_div_5_div_1_Template_div_click_0_listener() { const i_r10 = i0.ɵɵrestoreView(_r9).index; const ctx_r4 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r4.openLightbox(i_r10)); });
    i0.ɵɵelement(1, "img", 188);
    i0.ɵɵelementStart(2, "div", 189);
    i0.ɵɵelement(3, "i", 190);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const url_r11 = ctx.$implicit;
    const i_r10 = ctx.index;
    const prop_r3 = i0.ɵɵnextContext(3).ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", url_r11, i0.ɵɵsanitizeUrl)("alt", "Photo " + (i_r10 + 1) + " of " + prop_r3.address);
} }
function PropertyDetailPage_div_5_ng_container_1_section_29_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 185);
    i0.ɵɵtemplate(1, PropertyDetailPage_div_5_ng_container_1_section_29_div_5_div_1_Template, 4, 2, "div", 186);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r4.photoUrlList());
} }
function PropertyDetailPage_div_5_ng_container_1_section_29_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 191)(1, "a", 192);
    i0.ɵɵelement(2, "i", 193);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "View Virtual Tour");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(5, "i", 194);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("href", prop_r3.virtualTourUrl, i0.ɵɵsanitizeUrl);
} }
function PropertyDetailPage_div_5_ng_container_1_section_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 179)(1, "div", 180)(2, "h2", 181);
    i0.ɵɵelement(3, "i", 182);
    i0.ɵɵtext(4, " Photos & Media");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, PropertyDetailPage_div_5_ng_container_1_section_29_div_5_Template, 2, 1, "div", 183)(6, PropertyDetailPage_div_5_ng_container_1_section_29_div_6_Template, 6, 1, "div", 184);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext().ngIf;
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r4.photoUrlList().length > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r3.virtualTourUrl);
} }
function PropertyDetailPage_div_5_ng_container_1_span_79_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 195);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r4.showings().length);
} }
function PropertyDetailPage_div_5_ng_container_1_span_83_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 195);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r4.documents().length);
} }
function PropertyDetailPage_div_5_ng_container_1_span_87_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 195);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r4.priceHistory().length);
} }
function PropertyDetailPage_div_5_ng_container_1_span_91_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 195);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r4.activities().length);
} }
function PropertyDetailPage_div_5_ng_container_1_span_98_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 195);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r4.signatureRequests().length);
} }
function PropertyDetailPage_div_5_ng_container_1_span_102_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 195);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r4.alertRules().length);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_span_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 234);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Listed ", i0.ɵɵpipeBind2(2, 1, prop_r3.listingDateUtc || prop_r3.createdAtUtc, "MMM d, yyyy"), " ");
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_span_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 234);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Built ", prop_r3.yearBuilt);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 210)(1, "span", 207);
    i0.ɵɵtext(2, "City");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 208);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(prop_r3.city);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 210)(1, "span", 207);
    i0.ɵɵtext(2, "Province");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 208);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(prop_r3.province);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 210)(1, "span", 207);
    i0.ɵɵtext(2, "Postal Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 208);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(prop_r3.postalCode);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 210)(1, "span", 207);
    i0.ɵɵtext(2, "Country");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 208);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(prop_r3.country);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 210)(1, "span", 207);
    i0.ɵɵtext(2, "Neighborhood");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 208);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(prop_r3.neighborhood);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 210)(1, "span", 207);
    i0.ɵɵtext(2, "MLS #");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 208);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(prop_r3.mlsNumber);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 210)(1, "span", 207);
    i0.ɵɵtext(2, "Bedrooms");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 208);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(prop_r3.bedrooms);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 210)(1, "span", 207);
    i0.ɵɵtext(2, "Bathrooms");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 208);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(prop_r3.bathrooms);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 210)(1, "span", 207);
    i0.ɵɵtext(2, "Square Feet");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 208);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "number");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 1, prop_r3.squareFeet));
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 210)(1, "span", 207);
    i0.ɵɵtext(2, "Lot Size");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 208);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "number");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(5, 1, prop_r3.lotSizeSqFt), " sqft");
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 210)(1, "span", 207);
    i0.ɵɵtext(2, "Year Built");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 208);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(prop_r3.yearBuilt);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 210)(1, "span", 207);
    i0.ɵɵtext(2, "Garage Spaces");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 208);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(prop_r3.garageSpaces);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 235)(1, "span", 207);
    i0.ɵɵtext(2, "Features & Amenities");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 208);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(prop_r3.features);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_54_button_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 239);
    i0.ɵɵelement(1, "i", 56);
    i0.ɵɵtext(2, " Add Details ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(3).ngIf;
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(1, _c4, prop_r3.id));
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 236)(1, "p", 237);
    i0.ɵɵtext(2, "No feature details available.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, PropertyDetailPage_div_5_ng_container_1_div_103_div_54_button_3_Template, 3, 3, "button", 238);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r4.canEdit);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_section_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 198)(1, "div", 199)(2, "div", 200)(3, "div", 201)(4, "span", 202);
    i0.ɵɵtext(5, "Story");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h2", 181);
    i0.ɵɵelement(7, "i", 240);
    i0.ɵɵtext(8, " Description");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(9, "p", 241);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(prop_r3.description);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_72_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 218)(1, "span", 219);
    i0.ɵɵtext(2, "Sale Price");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong", 242);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(2).ngIf;
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r4.formatCurrency(prop_r3.salePrice, prop_r3.currency));
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_79_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 210)(1, "span", 207);
    i0.ɵɵtext(2, "Price / SqFt");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 208);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(2).ngIf;
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r4.formatCurrency(ctx_r4.pricePerSqFt(), prop_r3.currency));
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_80_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 210)(1, "span", 207);
    i0.ɵɵtext(2, "Buyer Agent");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 208);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(3).ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", prop_r3.buyerAgentCommission, "%");
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_80_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 210)(1, "span", 207);
    i0.ɵɵtext(2, "Seller Agent");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 208);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(3).ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", prop_r3.sellerAgentCommission, "%");
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_80_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 210)(1, "span", 207);
    i0.ɵɵtext(2, "Co-Listing Agent");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 208);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(3).ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(prop_r3.coListingAgentName);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_80_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 248)(1, "span", 249);
    i0.ɵɵtext(2, "Est. Total Commission");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 250);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(3).ngIf;
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r4.formatCurrency(prop_r3.listPrice * prop_r3.commissionRate / 100, prop_r3.currency));
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_80_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 243)(1, "h3", 244);
    i0.ɵɵelement(2, "i", 245);
    i0.ɵɵtext(3, " Commission Split");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 205)(5, "div", 210)(6, "span", 207);
    i0.ɵɵtext(7, "Total Rate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 246);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(10, PropertyDetailPage_div_5_ng_container_1_div_103_div_80_div_10_Template, 5, 1, "div", 209)(11, PropertyDetailPage_div_5_ng_container_1_div_103_div_80_div_11_Template, 5, 1, "div", 209)(12, PropertyDetailPage_div_5_ng_container_1_div_103_div_80_div_12_Template, 5, 1, "div", 209);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, PropertyDetailPage_div_5_ng_container_1_div_103_div_80_div_13_Template, 5, 1, "div", 247);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate1("", prop_r3.commissionRate, "%");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r3.buyerAgentCommission != null);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r3.sellerAgentCommission != null);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r3.coListingAgentName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r3.listPrice && prop_r3.commissionRate);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_91_a_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 253);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(3).ngIf;
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(2, _c5, prop_r3.ownerId));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(prop_r3.ownerName);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_91_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 208);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(3).ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(prop_r3.ownerName);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_91_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 210)(1, "span", 207);
    i0.ɵɵtext(2, "Owner");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, PropertyDetailPage_div_5_ng_container_1_div_103_div_91_a_3_Template, 2, 4, "a", 251)(4, PropertyDetailPage_div_5_ng_container_1_div_103_div_91_span_4_Template, 2, 1, "span", 252);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", prop_r3.ownerId);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !prop_r3.ownerId);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_92_a_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 253);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(3).ngIf;
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(2, _c6, prop_r3.accountId));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(prop_r3.accountName);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_92_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 208);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(3).ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(prop_r3.accountName);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_92_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 210)(1, "span", 207);
    i0.ɵɵtext(2, "Account");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, PropertyDetailPage_div_5_ng_container_1_div_103_div_92_a_3_Template, 2, 4, "a", 251)(4, PropertyDetailPage_div_5_ng_container_1_div_103_div_92_span_4_Template, 2, 1, "span", 252);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", prop_r3.accountId);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !prop_r3.accountId);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_93_a_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 253);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(3).ngIf;
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(2, _c7, prop_r3.primaryContactId));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(prop_r3.primaryContactName);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_93_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 208);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(3).ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(prop_r3.primaryContactName);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_93_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 210)(1, "span", 207);
    i0.ɵɵtext(2, "Primary Contact");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, PropertyDetailPage_div_5_ng_container_1_div_103_div_93_a_3_Template, 2, 4, "a", 251)(4, PropertyDetailPage_div_5_ng_container_1_div_103_div_93_span_4_Template, 2, 1, "span", 252);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", prop_r3.primaryContactId);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !prop_r3.primaryContactId);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_94_button_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 239);
    i0.ɵɵelement(1, "i", 50);
    i0.ɵɵtext(2, " Link Contact ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext(3).ngIf;
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(1, _c4, prop_r3.id));
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_94_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 236)(1, "p", 237);
    i0.ɵɵtext(2, "No owner or contact linked.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, PropertyDetailPage_div_5_ng_container_1_div_103_div_94_button_3_Template, 3, 3, "button", 238);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r4.canEdit);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_120_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 264);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_120_p_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 265);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const evt_r12 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(evt_r12.description);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_120_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "div", 254)(2, "span", 255);
    i0.ɵɵelement(3, "i", 174);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, PropertyDetailPage_div_5_ng_container_1_div_103_div_120_span_4_Template, 1, 0, "span", 256);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 257)(6, "div", 258)(7, "span", 259);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 260)(12, "span", 261);
    i0.ɵɵelement(13, "i", 137);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "span", 262);
    i0.ɵɵelement(17, "i", 40);
    i0.ɵɵtext(18);
    i0.ɵɵpipe(19, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(20, PropertyDetailPage_div_5_ng_container_1_div_103_div_120_p_20_Template, 2, 1, "p", 263);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const evt_r12 = ctx.$implicit;
    const last_r13 = ctx.last;
    i0.ɵɵclassMap("timeline-event timeline-event--" + evt_r12.variant);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngClass", evt_r12.icon);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !last_r13);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(evt_r12.label);
    i0.ɵɵadvance();
    i0.ɵɵclassMap("timeline-type-badge timeline-type-badge--" + evt_r12.variant);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(evt_r12.eventType);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(15, 11, evt_r12.occurredAtUtc, "MMM d, yyyy"), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(19, 14, evt_r12.occurredAtUtc, "h:mm a"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", evt_r12.description);
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_div_121_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 266);
    i0.ɵɵelement(1, "i", 267);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "No timeline events recorded yet.");
    i0.ɵɵelementEnd()();
} }
function PropertyDetailPage_div_5_ng_container_1_div_103_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 196)(1, "div", 197)(2, "section", 198)(3, "div", 199)(4, "div", 200)(5, "div", 201)(6, "span", 202);
    i0.ɵɵtext(7, "Property Snapshot");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "h2", 181);
    i0.ɵɵelement(9, "i", 110);
    i0.ɵɵtext(10, " Property Details");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 203);
    i0.ɵɵtemplate(12, PropertyDetailPage_div_5_ng_container_1_div_103_span_12_Template, 3, 4, "span", 204)(13, PropertyDetailPage_div_5_ng_container_1_div_103_span_13_Template, 2, 1, "span", 204);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "div", 205)(15, "div", 206)(16, "span", 207);
    i0.ɵɵtext(17, "Address");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span", 208);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(20, PropertyDetailPage_div_5_ng_container_1_div_103_div_20_Template, 5, 1, "div", 209)(21, PropertyDetailPage_div_5_ng_container_1_div_103_div_21_Template, 5, 1, "div", 209)(22, PropertyDetailPage_div_5_ng_container_1_div_103_div_22_Template, 5, 1, "div", 209)(23, PropertyDetailPage_div_5_ng_container_1_div_103_div_23_Template, 5, 1, "div", 209)(24, PropertyDetailPage_div_5_ng_container_1_div_103_div_24_Template, 5, 1, "div", 209)(25, PropertyDetailPage_div_5_ng_container_1_div_103_div_25_Template, 5, 1, "div", 209);
    i0.ɵɵelementStart(26, "div", 210)(27, "span", 207);
    i0.ɵɵtext(28, "Property Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "span", 208);
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(31, "div", 210)(32, "span", 207);
    i0.ɵɵtext(33, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "span", 208)(35, "span", 211);
    i0.ɵɵtext(36);
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(37, "section", 198)(38, "div", 199)(39, "div", 200)(40, "div", 201)(41, "span", 202);
    i0.ɵɵtext(42, "Interior & Exterior");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "h2", 181);
    i0.ɵɵelement(44, "i", 212);
    i0.ɵɵtext(45, " Features & Specs");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(46, "div", 213);
    i0.ɵɵtemplate(47, PropertyDetailPage_div_5_ng_container_1_div_103_div_47_Template, 5, 1, "div", 209)(48, PropertyDetailPage_div_5_ng_container_1_div_103_div_48_Template, 5, 1, "div", 209)(49, PropertyDetailPage_div_5_ng_container_1_div_103_div_49_Template, 6, 3, "div", 209)(50, PropertyDetailPage_div_5_ng_container_1_div_103_div_50_Template, 6, 3, "div", 209)(51, PropertyDetailPage_div_5_ng_container_1_div_103_div_51_Template, 5, 1, "div", 209)(52, PropertyDetailPage_div_5_ng_container_1_div_103_div_52_Template, 5, 1, "div", 209);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(53, PropertyDetailPage_div_5_ng_container_1_div_103_div_53_Template, 5, 1, "div", 214)(54, PropertyDetailPage_div_5_ng_container_1_div_103_div_54_Template, 4, 1, "div", 215);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(55, PropertyDetailPage_div_5_ng_container_1_div_103_section_55_Template, 11, 1, "section", 216);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "div", 197)(57, "section", 198)(58, "div", 199)(59, "div", 200)(60, "div", 201)(61, "span", 202);
    i0.ɵɵtext(62, "Commercials");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "h2", 181);
    i0.ɵɵelement(64, "i", 87);
    i0.ɵɵtext(65, " Pricing & Commission");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(66, "div", 217)(67, "div", 218)(68, "span", 219);
    i0.ɵɵtext(69, "List Price");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(70, "strong", 220);
    i0.ɵɵtext(71);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(72, PropertyDetailPage_div_5_ng_container_1_div_103_div_72_Template, 5, 1, "div", 221);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(73, "div", 222)(74, "div", 210)(75, "span", 207);
    i0.ɵɵtext(76, "Currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(77, "span", 208);
    i0.ɵɵtext(78);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(79, PropertyDetailPage_div_5_ng_container_1_div_103_div_79_Template, 5, 1, "div", 209);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(80, PropertyDetailPage_div_5_ng_container_1_div_103_div_80_Template, 14, 5, "div", 223);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(81, "section", 198)(82, "div", 199)(83, "div", 200)(84, "div", 201)(85, "span", 202);
    i0.ɵɵtext(86, "CRM Relationships");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(87, "h2", 181);
    i0.ɵɵelement(88, "i", 26);
    i0.ɵɵtext(89, " Ownership & Links");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(90, "div", 224);
    i0.ɵɵtemplate(91, PropertyDetailPage_div_5_ng_container_1_div_103_div_91_Template, 5, 2, "div", 209)(92, PropertyDetailPage_div_5_ng_container_1_div_103_div_92_Template, 5, 2, "div", 209)(93, PropertyDetailPage_div_5_ng_container_1_div_103_div_93_Template, 5, 2, "div", 209);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(94, PropertyDetailPage_div_5_ng_container_1_div_103_div_94_Template, 4, 1, "div", 215);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(95, "section", 198)(96, "div", 199)(97, "div", 200)(98, "div", 201)(99, "span", 202);
    i0.ɵɵtext(100, "Lifecycle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(101, "h2", 181);
    i0.ɵɵelement(102, "i", 137);
    i0.ɵɵtext(103, " Timeline");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(104, "div", 203)(105, "span", 225);
    i0.ɵɵelement(106, "i", 226);
    i0.ɵɵtext(107);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(108, "div", 227)(109, "div", 228)(110, "span", 229);
    i0.ɵɵtext(111);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(112, "span", 230);
    i0.ɵɵtext(113, "Events");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(114, "div", 228)(115, "span", 229);
    i0.ɵɵtext(116);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(117, "span", 230);
    i0.ɵɵtext(118, "Days Listed");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(119, "div", 231);
    i0.ɵɵtemplate(120, PropertyDetailPage_div_5_ng_container_1_div_103_div_120_Template, 21, 17, "div", 232);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(121, PropertyDetailPage_div_5_ng_container_1_div_103_div_121_Template, 4, 0, "div", 233);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const prop_r3 = i0.ɵɵnextContext().ngIf;
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(12);
    i0.ɵɵproperty("ngIf", prop_r3.listingDateUtc || prop_r3.createdAtUtc);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r3.yearBuilt);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(prop_r3.address);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r3.city);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r3.province);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r3.postalCode);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r3.country);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r3.neighborhood);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r3.mlsNumber);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r4.typeLabel(prop_r3.propertyType));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngClass", ctx_r4.statusClass(prop_r3.status));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(prop_r3.status);
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("ngIf", prop_r3.bedrooms != null);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r3.bathrooms != null);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r3.squareFeet != null);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r3.lotSizeSqFt != null);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r3.yearBuilt != null);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r3.garageSpaces != null);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r3.features);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r3.bedrooms == null && prop_r3.bathrooms == null && prop_r3.squareFeet == null);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r3.description);
    i0.ɵɵadvance(16);
    i0.ɵɵtextInterpolate(ctx_r4.formatCurrency(prop_r3.listPrice, prop_r3.currency));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r3.salePrice != null);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(prop_r3.currency);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.pricePerSqFt() !== null);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r3.commissionRate != null);
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("ngIf", prop_r3.ownerName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r3.accountName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r3.primaryContactName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !prop_r3.ownerName && !prop_r3.accountName && !prop_r3.primaryContactName);
    i0.ɵɵadvance(13);
    i0.ɵɵtextInterpolate1(" ", ctx_r4.daysSinceListed(), " days on market ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r4.timelineEvents().length);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r4.daysSinceListed());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r4.timelineEvents());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.timelineEvents().length === 0);
} }
function PropertyDetailPage_div_5_ng_container_1_section_104_button_6_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 152);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_section_104_button_6_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r4 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r4.onLogShowing()); });
    i0.ɵɵelementStart(1, "span", 153);
    i0.ɵɵelement(2, "i", 272);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Schedule Showing");
    i0.ɵɵelementEnd()();
} }
function PropertyDetailPage_div_5_ng_container_1_section_104_div_7_tr_17_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 283);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r15 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(s_r15.visitorEmail);
} }
function PropertyDetailPage_div_5_ng_container_1_section_104_div_7_tr_17_span_14_i_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 286);
} if (rf & 2) {
    const i_r16 = ctx.index;
    const s_r15 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵclassProp("star-active", i_r16 < (s_r15.rating || 0));
} }
function PropertyDetailPage_div_5_ng_container_1_section_104_div_7_tr_17_span_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 284);
    i0.ɵɵtemplate(1, PropertyDetailPage_div_5_ng_container_1_section_104_div_7_tr_17_span_14_i_1_Template, 1, 2, "i", 285);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c8));
} }
function PropertyDetailPage_div_5_ng_container_1_section_104_div_7_tr_17_span_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "\u2014");
    i0.ɵɵelementEnd();
} }
function PropertyDetailPage_div_5_ng_container_1_section_104_div_7_tr_17_span_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 287);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r15 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(s_r15.feedback);
} }
function PropertyDetailPage_div_5_ng_container_1_section_104_div_7_tr_17_span_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "\u2014");
    i0.ɵɵelementEnd();
} }
function PropertyDetailPage_div_5_ng_container_1_section_104_div_7_tr_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 276)(1, "td")(2, "div", 277)(3, "span", 278);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, PropertyDetailPage_div_5_ng_container_1_section_104_div_7_tr_17_span_5_Template, 2, 1, "span", 279);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵelement(12, "p-tag", 280);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td");
    i0.ɵɵtemplate(14, PropertyDetailPage_div_5_ng_container_1_section_104_div_7_tr_17_span_14_Template, 2, 2, "span", 281)(15, PropertyDetailPage_div_5_ng_container_1_section_104_div_7_tr_17_span_15_Template, 2, 0, "span", 98);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td");
    i0.ɵɵtemplate(17, PropertyDetailPage_div_5_ng_container_1_section_104_div_7_tr_17_span_17_Template, 2, 1, "span", 282)(18, PropertyDetailPage_div_5_ng_container_1_section_104_div_7_tr_17_span_18_Template, 2, 0, "span", 98);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const s_r15 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(s_r15.visitorName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", s_r15.visitorEmail);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(8, 10, s_r15.scheduledAtUtc, "MMM d, yyyy h:mm a"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(s_r15.durationMinutes ? s_r15.durationMinutes + " min" : "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", s_r15.status)("severity", ctx_r4.showingSeverity(s_r15.status));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", s_r15.rating);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !s_r15.rating);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", s_r15.feedback);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !s_r15.feedback);
} }
function PropertyDetailPage_div_5_ng_container_1_section_104_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 273)(1, "table", 274)(2, "thead")(3, "tr")(4, "th");
    i0.ɵɵtext(5, "Visitor");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "th");
    i0.ɵɵtext(7, "Date & Time");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th");
    i0.ɵɵtext(9, "Duration");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th");
    i0.ɵɵtext(11, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th");
    i0.ɵɵtext(13, "Rating");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th");
    i0.ɵɵtext(15, "Feedback");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(16, "tbody");
    i0.ɵɵtemplate(17, PropertyDetailPage_div_5_ng_container_1_section_104_div_7_tr_17_Template, 19, 13, "tr", 275);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(17);
    i0.ɵɵproperty("ngForOf", ctx_r4.showings());
} }
function PropertyDetailPage_div_5_ng_container_1_section_104_ng_template_8_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 152);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_section_104_ng_template_8_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r17); const ctx_r4 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r4.onLogShowing()); });
    i0.ɵɵelementStart(1, "span", 153);
    i0.ɵɵelement(2, "i", 272);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Schedule First Showing");
    i0.ɵɵelementEnd()();
} }
function PropertyDetailPage_div_5_ng_container_1_section_104_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 288);
    i0.ɵɵelement(1, "i", 289);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No showings scheduled yet.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, PropertyDetailPage_div_5_ng_container_1_section_104_ng_template_8_button_4_Template, 5, 0, "button", 270);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r4.canEdit);
} }
function PropertyDetailPage_div_5_ng_container_1_section_104_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 268)(1, "div", 198)(2, "div", 269)(3, "h2", 181);
    i0.ɵɵelement(4, "i", 137);
    i0.ɵɵtext(5, " Showing Log");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, PropertyDetailPage_div_5_ng_container_1_section_104_button_6_Template, 5, 0, "button", 270);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, PropertyDetailPage_div_5_ng_container_1_section_104_div_7_Template, 18, 1, "div", 271)(8, PropertyDetailPage_div_5_ng_container_1_section_104_ng_template_8_Template, 5, 1, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const noShowings_r18 = i0.ɵɵreference(9);
    const ctx_r4 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r4.canEdit);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.showings().length)("ngIfElse", noShowings_r18);
} }
function PropertyDetailPage_div_5_ng_container_1_section_105_button_6_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 152);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_section_105_button_6_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r19); const ctx_r4 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r4.onUploadDocument()); });
    i0.ɵɵelementStart(1, "span", 153);
    i0.ɵɵelement(2, "i", 158);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Upload Document");
    i0.ɵɵelementEnd()();
} }
function PropertyDetailPage_div_5_ng_container_1_section_105_div_7_div_1_span_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 304);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const doc_r20 = i0.ɵɵnextContext().$implicit;
    const ctx_r4 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r4.formatFileSize(doc_r20.fileSize));
} }
function PropertyDetailPage_div_5_ng_container_1_section_105_div_7_div_1_span_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 305);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const doc_r20 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("By ", doc_r20.uploadedBy);
} }
function PropertyDetailPage_div_5_ng_container_1_section_105_div_7_div_1_button_15_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 306);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_section_105_div_7_div_1_button_15_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r21); const doc_r20 = i0.ɵɵnextContext().$implicit; const ctx_r4 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r4.onDeleteDocument(doc_r20.id)); });
    i0.ɵɵelement(1, "i", 307);
    i0.ɵɵelementEnd();
} }
function PropertyDetailPage_div_5_ng_container_1_section_105_div_7_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 293)(1, "div", 294);
    i0.ɵɵelement(2, "i", 174);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 295)(4, "span", 296);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 297)(7, "span", 298);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, PropertyDetailPage_div_5_ng_container_1_section_105_div_7_div_1_span_9_Template, 2, 1, "span", 299);
    i0.ɵɵelementStart(10, "span", 300);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(13, PropertyDetailPage_div_5_ng_container_1_section_105_div_7_div_1_span_13_Template, 2, 1, "span", 301);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 302);
    i0.ɵɵtemplate(15, PropertyDetailPage_div_5_ng_container_1_section_105_div_7_div_1_button_15_Template, 2, 0, "button", 303);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const doc_r20 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r4.docCategoryIcon(doc_r20.category));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(doc_r20.fileName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(doc_r20.category);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", doc_r20.fileSize);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(12, 7, doc_r20.uploadedAtUtc, "MMM d, yyyy"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", doc_r20.uploadedBy);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r4.canEdit);
} }
function PropertyDetailPage_div_5_ng_container_1_section_105_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 291);
    i0.ɵɵtemplate(1, PropertyDetailPage_div_5_ng_container_1_section_105_div_7_div_1_Template, 16, 10, "div", 292);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r4.documents());
} }
function PropertyDetailPage_div_5_ng_container_1_section_105_ng_template_8_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 152);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_section_105_ng_template_8_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r22); const ctx_r4 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r4.onUploadDocument()); });
    i0.ɵɵelementStart(1, "span", 153);
    i0.ɵɵelement(2, "i", 158);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Upload First Document");
    i0.ɵɵelementEnd()();
} }
function PropertyDetailPage_div_5_ng_container_1_section_105_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 288);
    i0.ɵɵelement(1, "i", 308);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No documents uploaded yet.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, PropertyDetailPage_div_5_ng_container_1_section_105_ng_template_8_button_4_Template, 5, 0, "button", 270);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r4.canEdit);
} }
function PropertyDetailPage_div_5_ng_container_1_section_105_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 268)(1, "div", 198)(2, "div", 269)(3, "h2", 181);
    i0.ɵɵelement(4, "i", 44);
    i0.ɵɵtext(5, " Documents & Attachments");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, PropertyDetailPage_div_5_ng_container_1_section_105_button_6_Template, 5, 0, "button", 270);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, PropertyDetailPage_div_5_ng_container_1_section_105_div_7_Template, 2, 1, "div", 290)(8, PropertyDetailPage_div_5_ng_container_1_section_105_ng_template_8_Template, 5, 1, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const noDocs_r23 = i0.ɵɵreference(9);
    const ctx_r4 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r4.canEdit);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.documents().length)("ngIfElse", noDocs_r23);
} }
function PropertyDetailPage_div_5_ng_container_1_section_106_div_6_div_1_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 326);
} }
function PropertyDetailPage_div_5_ng_container_1_section_106_div_6_div_1_span_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 327);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const pc_r24 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("by ", pc_r24.changedBy);
} }
function PropertyDetailPage_div_5_ng_container_1_section_106_div_6_div_1_span_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 328);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const pc_r24 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(pc_r24.reason);
} }
function PropertyDetailPage_div_5_ng_container_1_section_106_div_6_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 312)(1, "div", 313)(2, "span", 314);
    i0.ɵɵelement(3, "i", 174);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, PropertyDetailPage_div_5_ng_container_1_section_106_div_6_div_1_span_4_Template, 1, 0, "span", 315);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 316)(6, "div", 317)(7, "span", 318);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(9, "i", 319);
    i0.ɵɵelementStart(10, "span", 320);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span", 321);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 322)(15, "span", 323);
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(18, PropertyDetailPage_div_5_ng_container_1_section_106_div_6_div_1_span_18_Template, 2, 1, "span", 324);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(19, PropertyDetailPage_div_5_ng_container_1_section_106_div_6_div_1_span_19_Template, 2, 1, "span", 325);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const pc_r24 = ctx.$implicit;
    const last_r25 = ctx.last;
    const prop_r3 = i0.ɵɵnextContext(3).ngIf;
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("price-event--up", ctx_r4.priceChangeDirection(pc_r24) === "up")("price-event--down", ctx_r4.priceChangeDirection(pc_r24) === "down");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngClass", ctx_r4.priceChangeDirection(pc_r24) === "up" ? "pi-arrow-up" : "pi-arrow-down");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !last_r25);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r4.formatCurrency(pc_r24.previousPrice, prop_r3.currency));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r4.formatCurrency(pc_r24.newPrice, prop_r3.currency));
    i0.ɵɵadvance();
    i0.ɵɵclassProp("pct-up", ctx_r4.priceChangeDirection(pc_r24) === "up")("pct-down", ctx_r4.priceChangeDirection(pc_r24) === "down");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", ctx_r4.priceChangeDirection(pc_r24) === "up" ? "+" : "-", "", ctx_r4.priceChangePct(pc_r24), "% ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(17, 17, pc_r24.changedAtUtc, "MMM d, yyyy"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", pc_r24.changedBy);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", pc_r24.reason);
} }
function PropertyDetailPage_div_5_ng_container_1_section_106_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 310);
    i0.ɵɵtemplate(1, PropertyDetailPage_div_5_ng_container_1_section_106_div_6_div_1_Template, 20, 20, "div", 311);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r4.priceHistory());
} }
function PropertyDetailPage_div_5_ng_container_1_section_106_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 288);
    i0.ɵɵelement(1, "i", 329);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No price changes recorded.");
    i0.ɵɵelementEnd()();
} }
function PropertyDetailPage_div_5_ng_container_1_section_106_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 268)(1, "div", 198)(2, "div", 269)(3, "h2", 181);
    i0.ɵɵelement(4, "i", 139);
    i0.ɵɵtext(5, " Price Change History");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, PropertyDetailPage_div_5_ng_container_1_section_106_div_6_Template, 2, 1, "div", 309)(7, PropertyDetailPage_div_5_ng_container_1_section_106_ng_template_7_Template, 4, 0, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const noPriceHistory_r26 = i0.ɵɵreference(8);
    const ctx_r4 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r4.priceHistory().length)("ngIfElse", noPriceHistory_r26);
} }
function PropertyDetailPage_div_5_ng_container_1_section_107_button_6_Template(rf, ctx) { if (rf & 1) {
    const _r27 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 152);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_section_107_button_6_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r27); const ctx_r4 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r4.onAddActivity()); });
    i0.ɵɵelementStart(1, "span", 153);
    i0.ɵɵelement(2, "i", 272);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Add Activity");
    i0.ɵɵelementEnd()();
} }
function PropertyDetailPage_div_5_ng_container_1_section_107_div_7_div_1_span_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 345);
    i0.ɵɵelement(1, "i", 137);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const act_r28 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" Due ", i0.ɵɵpipeBind2(3, 1, act_r28.dueDate, "MMM d, yyyy"), " ");
} }
function PropertyDetailPage_div_5_ng_container_1_section_107_div_7_div_1_p_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 346);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const act_r28 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(act_r28.description);
} }
function PropertyDetailPage_div_5_ng_container_1_section_107_div_7_div_1_div_17_Template(rf, ctx) { if (rf & 1) {
    const _r29 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 347)(1, "button", 348);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_section_107_div_7_div_1_div_17_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r29); const act_r28 = i0.ɵɵnextContext().$implicit; const ctx_r4 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r4.completeActivity(act_r28.id)); });
    i0.ɵɵelement(2, "i", 349);
    i0.ɵɵelementEnd()();
} }
function PropertyDetailPage_div_5_ng_container_1_section_107_div_7_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 333)(1, "div", 334);
    i0.ɵɵelement(2, "i", 174);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 335)(4, "div", 336)(5, "span", 337);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(7, "p-tag", 338);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 339)(9, "span", 340);
    i0.ɵɵelement(10, "i", 174);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(12, PropertyDetailPage_div_5_ng_container_1_section_107_div_7_div_1_span_12_Template, 4, 4, "span", 341);
    i0.ɵɵelementStart(13, "span", 342);
    i0.ɵɵelement(14, "i", 174);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(16, PropertyDetailPage_div_5_ng_container_1_section_107_div_7_div_1_p_16_Template, 2, 1, "p", 343);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(17, PropertyDetailPage_div_5_ng_container_1_section_107_div_7_div_1_div_17_Template, 3, 0, "div", 344);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const act_r28 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext(5);
    i0.ɵɵclassProp("activity-item--completed", act_r28.status === "Completed");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", "activity-icon--" + act_r28.type.toLowerCase());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r4.activityTypeIcon(act_r28.type));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(act_r28.subject);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", act_r28.priority)("severity", ctx_r4.prioritySeverity(act_r28.priority));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngClass", ctx_r4.activityTypeIcon(act_r28.type));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r4.activityTypeLabel(act_r28.type));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", act_r28.dueDate);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", act_r28.status === "Completed" ? "pi-check-circle" : "pi-clock");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", act_r28.status, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", act_r28.description);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.canEdit && act_r28.status !== "Completed");
} }
function PropertyDetailPage_div_5_ng_container_1_section_107_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 331);
    i0.ɵɵtemplate(1, PropertyDetailPage_div_5_ng_container_1_section_107_div_7_div_1_Template, 18, 14, "div", 332);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r4.activities());
} }
function PropertyDetailPage_div_5_ng_container_1_section_107_ng_template_8_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r30 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 152);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_section_107_ng_template_8_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r30); const ctx_r4 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r4.onAddActivity()); });
    i0.ɵɵelementStart(1, "span", 153);
    i0.ɵɵelement(2, "i", 272);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Add First Activity");
    i0.ɵɵelementEnd()();
} }
function PropertyDetailPage_div_5_ng_container_1_section_107_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 288);
    i0.ɵɵelement(1, "i", 350);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No activities logged yet.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, PropertyDetailPage_div_5_ng_container_1_section_107_ng_template_8_button_4_Template, 5, 0, "button", 270);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r4.canEdit);
} }
function PropertyDetailPage_div_5_ng_container_1_section_107_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 268)(1, "div", 198)(2, "div", 269)(3, "h2", 181);
    i0.ɵɵelement(4, "i", 140);
    i0.ɵɵtext(5, " Activities & Tasks");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, PropertyDetailPage_div_5_ng_container_1_section_107_button_6_Template, 5, 0, "button", 270);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, PropertyDetailPage_div_5_ng_container_1_section_107_div_7_Template, 2, 1, "div", 330)(8, PropertyDetailPage_div_5_ng_container_1_section_107_ng_template_8_Template, 5, 1, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const noActivities_r31 = i0.ɵɵreference(9);
    const ctx_r4 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r4.canEdit);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.activities().length)("ngIfElse", noActivities_r31);
} }
function PropertyDetailPage_div_5_ng_container_1_section_108_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 355);
    i0.ɵɵelement(1, "p-skeleton", 356)(2, "p-skeleton", 357);
    i0.ɵɵelementEnd();
} }
function PropertyDetailPage_div_5_ng_container_1_section_108_ng_container_12_ng_template_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Address");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "List Price");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Sale Price");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Sqft");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "$/Sqft");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th");
    i0.ɵɵtext(16, "Bed/Bath");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "th");
    i0.ɵɵtext(18, "Days");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "th");
    i0.ɵɵtext(20, "Dist");
    i0.ɵɵelementEnd()();
} }
function PropertyDetailPage_div_5_ng_container_1_section_108_ng_container_12_ng_template_29_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 371);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const comp_r33 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(comp_r33.city);
} }
function PropertyDetailPage_div_5_ng_container_1_section_108_ng_container_12_ng_template_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "span", 368);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, PropertyDetailPage_div_5_ng_container_1_section_108_ng_container_12_ng_template_29_span_4_Template, 2, 1, "span", 369);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵelement(8, "p-tag", 370);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td");
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "td");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "td");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "td");
    i0.ɵɵtext(23);
    i0.ɵɵpipe(24, "number");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const comp_r33 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(comp_r33.address);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", comp_r33.city);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r4.typeLabel(comp_r33.propertyType));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", comp_r33.status)("severity", ctx_r4.cmaStatusSeverity(comp_r33.status))("rounded", true);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r4.formatCurrency(comp_r33.listPrice, "CAD"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(comp_r33.salePrice ? ctx_r4.formatCurrency(comp_r33.salePrice, "CAD") : "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(15, 14, comp_r33.squareFeet, "1.0-0"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(comp_r33.pricePerSqFt ? ctx_r4.formatCurrency(comp_r33.pricePerSqFt, "CAD") : "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", comp_r33.bedrooms, "/", comp_r33.bathrooms);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(comp_r33.daysOnMarket);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(24, 17, comp_r33.distanceMiles, "1.1-1"), " mi");
} }
function PropertyDetailPage_div_5_ng_container_1_section_108_ng_container_12_ng_template_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 372);
    i0.ɵɵtext(2, "No comparables found.");
    i0.ɵɵelementEnd()();
} }
function PropertyDetailPage_div_5_ng_container_1_section_108_ng_container_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 358)(2, "div", 359)(3, "span", 360);
    i0.ɵɵtext(4, "Suggested Price");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "strong", 361);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 359)(8, "span", 360);
    i0.ɵɵtext(9, "Avg Sale Price");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "strong", 362);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 359)(13, "span", 360);
    i0.ɵɵtext(14, "Avg $/sqft");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "strong", 362);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div", 359)(18, "span", 360);
    i0.ɵɵtext(19, "Avg Days on Market");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "strong", 362);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "div", 359)(23, "span", 360);
    i0.ɵɵtext(24, "Market Trend");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(25, "p-tag", 280);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div", 363)(27, "p-table", 364);
    i0.ɵɵtemplate(28, PropertyDetailPage_div_5_ng_container_1_section_108_ng_container_12_ng_template_28_Template, 21, 0, "ng-template", 365)(29, PropertyDetailPage_div_5_ng_container_1_section_108_ng_container_12_ng_template_29_Template, 25, 20, "ng-template", 366)(30, PropertyDetailPage_div_5_ng_container_1_section_108_ng_container_12_ng_template_30_Template, 3, 0, "ng-template", 367);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const report_r34 = ctx.ngIf;
    const ctx_r4 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r4.formatCurrency(report_r34.summary.suggestedPrice, "CAD"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r4.formatCurrency(report_r34.summary.avgSalePrice, "CAD"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r4.formatCurrency(report_r34.summary.avgPricePerSqFt, "CAD"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(report_r34.summary.avgDaysOnMarket);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", report_r34.summary.marketTrend)("severity", ctx_r4.marketTrendSeverity(report_r34.summary.marketTrend));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", report_r34.comparables)("rows", 10);
} }
function PropertyDetailPage_div_5_ng_container_1_section_108_div_13_Template(rf, ctx) { if (rf & 1) {
    const _r35 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 288);
    i0.ɵɵelement(1, "i", 373);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No CMA report generated yet.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 152);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_section_108_div_13_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r35); const ctx_r4 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r4.generateCma()); });
    i0.ɵɵelementStart(5, "span", 153);
    i0.ɵɵelement(6, "i", 141);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8, "Generate CMA Report");
    i0.ɵɵelementEnd()()();
} }
function PropertyDetailPage_div_5_ng_container_1_section_108_Template(rf, ctx) { if (rf & 1) {
    const _r32 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 268)(1, "div", 198)(2, "div", 269)(3, "h2", 181);
    i0.ɵɵelement(4, "i", 141);
    i0.ɵɵtext(5, " Comparable Market Analysis");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 351);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_section_108_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r32); const ctx_r4 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r4.generateCma()); });
    i0.ɵɵelementStart(7, "span", 153);
    i0.ɵɵelement(8, "i", 352);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10, "Generate CMA");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(11, PropertyDetailPage_div_5_ng_container_1_section_108_div_11_Template, 3, 0, "div", 353)(12, PropertyDetailPage_div_5_ng_container_1_section_108_ng_container_12_Template, 31, 8, "ng-container", 98)(13, PropertyDetailPage_div_5_ng_container_1_section_108_div_13_Template, 9, 0, "div", 354);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("ngIf", ctx_r4.cmaLoading());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r4.cmaLoading() && ctx_r4.cmaReport());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r4.cmaLoading() && !ctx_r4.cmaReport());
} }
function PropertyDetailPage_div_5_ng_container_1_section_109_button_6_Template(rf, ctx) { if (rf & 1) {
    const _r37 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 152);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_section_109_button_6_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r37); const ctx_r4 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r4.onAddSignatureRequest()); });
    i0.ɵɵelementStart(1, "span", 153);
    i0.ɵɵelement(2, "i", 272);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Send for Signature");
    i0.ɵɵelementEnd()();
} }
function PropertyDetailPage_div_5_ng_container_1_section_109_div_7_div_1_span_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "i", 394);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const req_r38 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" Sent ", i0.ɵɵpipeBind2(3, 1, req_r38.sentAtUtc, "MMM d, yyyy"));
} }
function PropertyDetailPage_div_5_ng_container_1_section_109_div_7_div_1_span_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "i", 395);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const req_r38 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" Completed ", i0.ɵɵpipeBind2(3, 1, req_r38.completedAtUtc, "MMM d, yyyy"));
} }
function PropertyDetailPage_div_5_ng_container_1_section_109_div_7_div_1_div_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 396)(1, "div", 397)(2, "span", 398);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 399);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 400);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(8, "p-tag", 401);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const signer_r39 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext(6);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(signer_r39.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(signer_r39.email);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(signer_r39.role);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", signer_r39.status)("severity", ctx_r4.signatureStatusSeverity(signer_r39.status))("rounded", true);
} }
function PropertyDetailPage_div_5_ng_container_1_section_109_div_7_div_1_div_23_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r40 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 407);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_section_109_div_7_div_1_div_23_button_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r40); const req_r38 = i0.ɵɵnextContext(2).$implicit; const ctx_r4 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r4.sendEnvelope(req_r38.id)); });
    i0.ɵɵelement(1, "i", 394);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const req_r38 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r4 = i0.ɵɵnextContext(5);
    i0.ɵɵproperty("disabled", ctx_r4.sigActionLoading() === req_r38.id);
} }
function PropertyDetailPage_div_5_ng_container_1_section_109_div_7_div_1_div_23_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r41 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 408);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_section_109_div_7_div_1_div_23_button_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r41); const req_r38 = i0.ɵɵnextContext(2).$implicit; const ctx_r4 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r4.refreshSignatureStatus(req_r38.id)); });
    i0.ɵɵelement(1, "i", 352);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const req_r38 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r4 = i0.ɵɵnextContext(5);
    i0.ɵɵproperty("disabled", ctx_r4.sigActionLoading() === req_r38.id);
} }
function PropertyDetailPage_div_5_ng_container_1_section_109_div_7_div_1_div_23_button_3_Template(rf, ctx) { if (rf & 1) {
    const _r42 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 409);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_section_109_div_7_div_1_div_23_button_3_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r42); const req_r38 = i0.ɵɵnextContext(2).$implicit; const ctx_r4 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r4.openVoidDialog(req_r38.id)); });
    i0.ɵɵelement(1, "i", 410);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const req_r38 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r4 = i0.ɵɵnextContext(5);
    i0.ɵɵproperty("disabled", ctx_r4.sigActionLoading() === req_r38.id);
} }
function PropertyDetailPage_div_5_ng_container_1_section_109_div_7_div_1_div_23_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r43 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 411);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_section_109_div_7_div_1_div_23_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r43); const req_r38 = i0.ɵɵnextContext(2).$implicit; const ctx_r4 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r4.downloadSignedDocument(req_r38.id, req_r38.documentName)); });
    i0.ɵɵelement(1, "i", 412);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const req_r38 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r4 = i0.ɵɵnextContext(5);
    i0.ɵɵproperty("disabled", ctx_r4.sigActionLoading() === req_r38.id);
} }
function PropertyDetailPage_div_5_ng_container_1_section_109_div_7_div_1_div_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 402);
    i0.ɵɵtemplate(1, PropertyDetailPage_div_5_ng_container_1_section_109_div_7_div_1_div_23_button_1_Template, 2, 1, "button", 403)(2, PropertyDetailPage_div_5_ng_container_1_section_109_div_7_div_1_div_23_button_2_Template, 2, 1, "button", 404)(3, PropertyDetailPage_div_5_ng_container_1_section_109_div_7_div_1_div_23_button_3_Template, 2, 1, "button", 405)(4, PropertyDetailPage_div_5_ng_container_1_section_109_div_7_div_1_div_23_button_4_Template, 2, 1, "button", 406);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const req_r38 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", req_r38.status === "Draft");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", req_r38.status === "Sent" || req_r38.status === "Viewed");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", req_r38.status === "Sent" || req_r38.status === "Viewed");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", req_r38.status === "Signed");
} }
function PropertyDetailPage_div_5_ng_container_1_section_109_div_7_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 382)(1, "div", 383)(2, "div", 384);
    i0.ɵɵelement(3, "i", 385);
    i0.ɵɵelementStart(4, "div")(5, "strong", 386);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 387);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelement(9, "p-tag", 370);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 388)(11, "span");
    i0.ɵɵelement(12, "i", 389);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, PropertyDetailPage_div_5_ng_container_1_section_109_div_7_div_1_span_14_Template, 4, 4, "span", 98)(15, PropertyDetailPage_div_5_ng_container_1_section_109_div_7_div_1_span_15_Template, 4, 4, "span", 98);
    i0.ɵɵelementStart(16, "span");
    i0.ɵɵelement(17, "i", 26);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 390)(20, "h4", 391);
    i0.ɵɵtext(21, "Signers");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(22, PropertyDetailPage_div_5_ng_container_1_section_109_div_7_div_1_div_22_Template, 9, 6, "div", 392);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(23, PropertyDetailPage_div_5_ng_container_1_section_109_div_7_div_1_div_23_Template, 5, 4, "div", 393);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const req_r38 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(req_r38.documentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(req_r38.documentType);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", req_r38.status)("severity", ctx_r4.signatureStatusSeverity(req_r38.status))("rounded", true);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", req_r38.provider);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", req_r38.sentAtUtc);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", req_r38.completedAtUtc);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", req_r38.createdByName);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", req_r38.signers);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.canEdit);
} }
function PropertyDetailPage_div_5_ng_container_1_section_109_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 380);
    i0.ɵɵtemplate(1, PropertyDetailPage_div_5_ng_container_1_section_109_div_7_div_1_Template, 24, 11, "div", 381);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r4.signatureRequests());
} }
function PropertyDetailPage_div_5_ng_container_1_section_109_ng_template_8_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r44 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 152);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_section_109_ng_template_8_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r44); const ctx_r4 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r4.onAddSignatureRequest()); });
    i0.ɵɵelementStart(1, "span", 153);
    i0.ɵɵelement(2, "i", 272);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Send First Document");
    i0.ɵɵelementEnd()();
} }
function PropertyDetailPage_div_5_ng_container_1_section_109_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 288);
    i0.ɵɵelement(1, "i", 413);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No signature requests yet.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, PropertyDetailPage_div_5_ng_container_1_section_109_ng_template_8_button_4_Template, 5, 0, "button", 270);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r4.canEdit);
} }
function PropertyDetailPage_div_5_ng_container_1_section_109_ng_template_17_Template(rf, ctx) { if (rf & 1) {
    const _r45 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 414);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_section_109_ng_template_17_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r45); const ctx_r4 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r4.showVoidDialog.set(false)); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2, "Cancel");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(3, "button", 415);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_section_109_ng_template_17_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r45); const ctx_r4 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r4.confirmVoid()); });
    i0.ɵɵelementStart(4, "span", 153);
    i0.ɵɵelement(5, "i", 410);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7, "Void Envelope");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", !ctx_r4.voidReason());
} }
function PropertyDetailPage_div_5_ng_container_1_section_109_Template(rf, ctx) { if (rf & 1) {
    const _r36 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 268)(1, "div", 198)(2, "div", 269)(3, "h2", 181);
    i0.ɵɵelement(4, "i", 142);
    i0.ɵɵtext(5, " E-Signature Requests");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, PropertyDetailPage_div_5_ng_container_1_section_109_button_6_Template, 5, 0, "button", 270);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, PropertyDetailPage_div_5_ng_container_1_section_109_div_7_Template, 2, 1, "div", 374)(8, PropertyDetailPage_div_5_ng_container_1_section_109_ng_template_8_Template, 5, 1, "ng-template", null, 5, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p-dialog", 375);
    i0.ɵɵlistener("visibleChange", function PropertyDetailPage_div_5_ng_container_1_section_109_Template_p_dialog_visibleChange_10_listener($event) { i0.ɵɵrestoreView(_r36); const ctx_r4 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r4.showVoidDialog.set($event)); });
    i0.ɵɵelementStart(11, "p", 376);
    i0.ɵɵtext(12, "Are you sure you want to void this envelope? This will cancel the signature request for all signers.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 377)(14, "label", 378);
    i0.ɵɵtext(15, "Reason");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "input", 379);
    i0.ɵɵlistener("ngModelChange", function PropertyDetailPage_div_5_ng_container_1_section_109_Template_input_ngModelChange_16_listener($event) { i0.ɵɵrestoreView(_r36); const ctx_r4 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r4.voidReason.set($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(17, PropertyDetailPage_div_5_ng_container_1_section_109_ng_template_17_Template, 8, 1, "ng-template", 20);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const noSignatures_r46 = i0.ɵɵreference(9);
    const ctx_r4 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r4.canEdit);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.signatureRequests().length)("ngIfElse", noSignatures_r46);
    i0.ɵɵadvance(3);
    i0.ɵɵstyleMap(i0.ɵɵpureFunction0(9, _c9));
    i0.ɵɵproperty("visible", ctx_r4.showVoidDialog())("modal", true)("closable", true);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", ctx_r4.voidReason());
} }
function PropertyDetailPage_div_5_ng_container_1_section_110_button_6_Template(rf, ctx) { if (rf & 1) {
    const _r47 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 152);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_section_110_button_6_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r47); const ctx_r4 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r4.onAddAlertRule()); });
    i0.ɵɵelementStart(1, "span", 153);
    i0.ɵɵelement(2, "i", 272);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Add Alert Rule");
    i0.ɵɵelementEnd()();
} }
function PropertyDetailPage_div_5_ng_container_1_section_110_div_7_div_1_span_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "i", 87);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const rule_r49 = i0.ɵɵnextContext().$implicit;
    const ctx_r4 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", rule_r49.criteria.minPrice ? ctx_r4.formatCurrency(rule_r49.criteria.minPrice, "CAD") : "Any", " \u2013 ", rule_r49.criteria.maxPrice ? ctx_r4.formatCurrency(rule_r49.criteria.maxPrice, "CAD") : "Any", " ");
} }
function PropertyDetailPage_div_5_ng_container_1_section_110_div_7_div_1_span_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "i", 94);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const rule_r49 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", rule_r49.criteria.minBedrooms, "+ beds");
} }
function PropertyDetailPage_div_5_ng_container_1_section_110_div_7_div_1_div_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 431)(1, "span", 432);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "date");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const rule_r49 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Last sent ", i0.ɵɵpipeBind2(3, 1, rule_r49.lastNotifiedAtUtc, "MMM d, yyyy h:mm a"));
} }
function PropertyDetailPage_div_5_ng_container_1_section_110_div_7_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r48 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 420)(1, "div", 421)(2, "div", 422)(3, "div", 423);
    i0.ɵɵelement(4, "img", 424);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div")(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 425);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "div", 426)(11, "button", 427);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_section_110_div_7_div_1_Template_button_click_11_listener() { const rule_r49 = i0.ɵɵrestoreView(_r48).$implicit; const ctx_r4 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r4.toggleAlertRule(rule_r49.id, !rule_r49.isActive)); });
    i0.ɵɵelement(12, "span", 428);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "div", 429);
    i0.ɵɵtemplate(14, PropertyDetailPage_div_5_ng_container_1_section_110_div_7_div_1_span_14_Template, 3, 2, "span", 98)(15, PropertyDetailPage_div_5_ng_container_1_section_110_div_7_div_1_span_15_Template, 3, 1, "span", 98);
    i0.ɵɵelementStart(16, "span");
    i0.ɵɵelement(17, "i", 40);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span");
    i0.ɵɵelement(20, "i", 143);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(22, PropertyDetailPage_div_5_ng_container_1_section_110_div_7_div_1_div_22_Template, 4, 4, "div", 430);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const rule_r49 = ctx.$implicit;
    i0.ɵɵclassProp("alert-rule-card--inactive", !rule_r49.isActive);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("src", rule_r49.profilePictureUrl || "https://i.pravatar.cc/150?u=" + (rule_r49.clientEmail || rule_r49.clientId || rule_r49.id), i0.ɵɵsanitizeUrl)("alt", rule_r49.clientName + " avatar")("title", rule_r49.clientName + " avatar");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(rule_r49.clientName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(rule_r49.clientEmail);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("toggle-btn--active", rule_r49.isActive);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", rule_r49.criteria.minPrice || rule_r49.criteria.maxPrice);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", rule_r49.criteria.minBedrooms);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", rule_r49.frequency);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", rule_r49.matchCount, " matches");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", rule_r49.lastNotifiedAtUtc);
} }
function PropertyDetailPage_div_5_ng_container_1_section_110_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 418);
    i0.ɵɵtemplate(1, PropertyDetailPage_div_5_ng_container_1_section_110_div_7_div_1_Template, 23, 14, "div", 419);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r4.alertRules());
} }
function PropertyDetailPage_div_5_ng_container_1_section_110_ng_template_8_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r50 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 152);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_section_110_ng_template_8_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r50); const ctx_r4 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r4.onAddAlertRule()); });
    i0.ɵɵelementStart(1, "span", 153);
    i0.ɵɵelement(2, "i", 272);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Create First Alert Rule");
    i0.ɵɵelementEnd()();
} }
function PropertyDetailPage_div_5_ng_container_1_section_110_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 288);
    i0.ɵɵelement(1, "i", 433);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No alert rules configured.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, PropertyDetailPage_div_5_ng_container_1_section_110_ng_template_8_button_4_Template, 5, 0, "button", 270);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r4.canEdit);
} }
function PropertyDetailPage_div_5_ng_container_1_section_110_div_10_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 437)(1, "div", 438);
    i0.ɵɵelement(2, "i", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 439)(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 440);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 441);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(11, "p-tag", 370);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const notif_r51 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(notif_r51.clientName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", notif_r51.clientEmail, " \u00B7 ", notif_r51.matchedProperties, " properties matched");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(10, 7, notif_r51.sentAtUtc, "MMM d, yyyy h:mm a"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", notif_r51.status)("severity", ctx_r4.alertNotifStatusSeverity(notif_r51.status))("rounded", true);
} }
function PropertyDetailPage_div_5_ng_container_1_section_110_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 434)(1, "h2", 181);
    i0.ɵɵelement(2, "i", 129);
    i0.ɵɵtext(3, " Notification History");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 435);
    i0.ɵɵtemplate(5, PropertyDetailPage_div_5_ng_container_1_section_110_div_10_div_5_Template, 12, 10, "div", 436);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r4.alertNotifications());
} }
function PropertyDetailPage_div_5_ng_container_1_section_110_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 268)(1, "div", 198)(2, "div", 269)(3, "h2", 181);
    i0.ɵɵelement(4, "i", 143);
    i0.ɵɵtext(5, " Property Alert Rules");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, PropertyDetailPage_div_5_ng_container_1_section_110_button_6_Template, 5, 0, "button", 270);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, PropertyDetailPage_div_5_ng_container_1_section_110_div_7_Template, 2, 1, "div", 416)(8, PropertyDetailPage_div_5_ng_container_1_section_110_ng_template_8_Template, 5, 1, "ng-template", null, 6, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, PropertyDetailPage_div_5_ng_container_1_section_110_div_10_Template, 6, 1, "div", 417);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const noAlertRules_r52 = i0.ɵɵreference(9);
    const ctx_r4 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r4.canEdit);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.alertRules().length)("ngIfElse", noAlertRules_r52);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r4.alertNotifications().length);
} }
function PropertyDetailPage_div_5_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "header", 99)(2, "div", 100);
    i0.ɵɵelement(3, "app-breadcrumbs");
    i0.ɵɵelementStart(4, "div", 101)(5, "a", 102);
    i0.ɵɵelement(6, "i", 103);
    i0.ɵɵtext(7, " Properties ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, PropertyDetailPage_div_5_ng_container_1_a_8_Template, 3, 1, "a", 104);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "h1", 105)(10, "span", 106);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 107)(13, "span", 108);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span", 109);
    i0.ɵɵelement(16, "i", 110);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(18, PropertyDetailPage_div_5_ng_container_1_span_18_Template, 3, 1, "span", 111)(19, PropertyDetailPage_div_5_ng_container_1_span_19_Template, 4, 2, "span", 112);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(20, PropertyDetailPage_div_5_ng_container_1_div_20_Template, 16, 0, "div", 113);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div", 114)(22, "div", 115)(23, "span", 116);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "span", 117);
    i0.ɵɵtext(26, "List Price");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(27, PropertyDetailPage_div_5_ng_container_1_div_27_Template, 5, 1, "div", 118);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(28, PropertyDetailPage_div_5_ng_container_1_section_28_Template, 12, 2, "section", 119)(29, PropertyDetailPage_div_5_ng_container_1_section_29_Template, 7, 2, "section", 120);
    i0.ɵɵelementStart(30, "section", 121)(31, "div", 122)(32, "div", 123);
    i0.ɵɵelement(33, "i", 124);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "div", 125)(35, "span", 126);
    i0.ɵɵtext(36, "Square Feet");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "strong", 127);
    i0.ɵɵtext(38);
    i0.ɵɵpipe(39, "number");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(40, "div", 128)(41, "div", 123);
    i0.ɵɵelement(42, "i", 129);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "div", 125)(44, "span", 126);
    i0.ɵɵtext(45, "Bedrooms");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "strong", 127);
    i0.ɵɵtext(47);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(48, "div", 130)(49, "div", 123);
    i0.ɵɵelement(50, "i", 131);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "div", 125)(52, "span", 126);
    i0.ɵɵtext(53, "Bathrooms");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "strong", 127);
    i0.ɵɵtext(55);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(56, "div", 132)(57, "div", 123);
    i0.ɵɵelement(58, "i", 133);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(59, "div", 125)(60, "span", 126);
    i0.ɵɵtext(61, "Days Listed");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(62, "strong", 127);
    i0.ɵɵtext(63);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(64, "div", 134)(65, "div", 123);
    i0.ɵɵelement(66, "i", 87);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(67, "div", 125)(68, "span", 126);
    i0.ɵɵtext(69, "Price/SqFt");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(70, "strong", 127);
    i0.ɵɵtext(71);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(72, "nav", 135)(73, "button", 136);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_Template_button_click_73_listener() { i0.ɵɵrestoreView(_r2); const ctx_r4 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r4.setTab("details")); });
    i0.ɵɵelement(74, "i", 110);
    i0.ɵɵtext(75, " Details ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(76, "button", 136);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_Template_button_click_76_listener() { i0.ɵɵrestoreView(_r2); const ctx_r4 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r4.setTab("showings")); });
    i0.ɵɵelement(77, "i", 137);
    i0.ɵɵtext(78, " Showings ");
    i0.ɵɵtemplate(79, PropertyDetailPage_div_5_ng_container_1_span_79_Template, 2, 1, "span", 138);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(80, "button", 136);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_Template_button_click_80_listener() { i0.ɵɵrestoreView(_r2); const ctx_r4 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r4.setTab("documents")); });
    i0.ɵɵelement(81, "i", 44);
    i0.ɵɵtext(82, " Documents ");
    i0.ɵɵtemplate(83, PropertyDetailPage_div_5_ng_container_1_span_83_Template, 2, 1, "span", 138);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(84, "button", 136);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_Template_button_click_84_listener() { i0.ɵɵrestoreView(_r2); const ctx_r4 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r4.setTab("priceHistory")); });
    i0.ɵɵelement(85, "i", 139);
    i0.ɵɵtext(86, " Price History ");
    i0.ɵɵtemplate(87, PropertyDetailPage_div_5_ng_container_1_span_87_Template, 2, 1, "span", 138);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(88, "button", 136);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_Template_button_click_88_listener() { i0.ɵɵrestoreView(_r2); const ctx_r4 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r4.setTab("activities")); });
    i0.ɵɵelement(89, "i", 140);
    i0.ɵɵtext(90, " Activities ");
    i0.ɵɵtemplate(91, PropertyDetailPage_div_5_ng_container_1_span_91_Template, 2, 1, "span", 138);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(92, "button", 136);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_Template_button_click_92_listener() { i0.ɵɵrestoreView(_r2); const ctx_r4 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r4.setTab("cma")); });
    i0.ɵɵelement(93, "i", 141);
    i0.ɵɵtext(94, " CMA ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(95, "button", 136);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_Template_button_click_95_listener() { i0.ɵɵrestoreView(_r2); const ctx_r4 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r4.setTab("esign")); });
    i0.ɵɵelement(96, "i", 142);
    i0.ɵɵtext(97, " E-Signature ");
    i0.ɵɵtemplate(98, PropertyDetailPage_div_5_ng_container_1_span_98_Template, 2, 1, "span", 138);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(99, "button", 136);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_5_ng_container_1_Template_button_click_99_listener() { i0.ɵɵrestoreView(_r2); const ctx_r4 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r4.setTab("alerts")); });
    i0.ɵɵelement(100, "i", 143);
    i0.ɵɵtext(101, " Alerts ");
    i0.ɵɵtemplate(102, PropertyDetailPage_div_5_ng_container_1_span_102_Template, 2, 1, "span", 138);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(103, PropertyDetailPage_div_5_ng_container_1_div_103_Template, 122, 35, "div", 144)(104, PropertyDetailPage_div_5_ng_container_1_section_104_Template, 10, 3, "section", 145)(105, PropertyDetailPage_div_5_ng_container_1_section_105_Template, 10, 3, "section", 145)(106, PropertyDetailPage_div_5_ng_container_1_section_106_Template, 9, 2, "section", 145)(107, PropertyDetailPage_div_5_ng_container_1_section_107_Template, 10, 3, "section", 145)(108, PropertyDetailPage_div_5_ng_container_1_section_108_Template, 14, 3, "section", 145)(109, PropertyDetailPage_div_5_ng_container_1_section_109_Template, 18, 10, "section", 145)(110, PropertyDetailPage_div_5_ng_container_1_section_110_Template, 11, 4, "section", 145);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const prop_r3 = ctx.ngIf;
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngIf", ctx_r4.canEdit);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(prop_r3.address);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r4.statusClass(prop_r3.status));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(prop_r3.status);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r4.typeLabel(prop_r3.propertyType), " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r3.mlsNumber);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r3.city);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.canEdit);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r4.formatCurrency(prop_r3.listPrice, prop_r3.currency));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", prop_r3.salePrice);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.showLiveBanner());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.photoUrlList().length > 0 || prop_r3.virtualTourUrl);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(prop_r3.squareFeet ? i0.ɵɵpipeBind1(39, 47, prop_r3.squareFeet) : "\u2014");
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(prop_r3.bedrooms ?? "\u2014");
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(prop_r3.bathrooms ?? "\u2014");
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate1("", ctx_r4.daysSinceListed(), "d");
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r4.pricePerSqFt() !== null ? ctx_r4.formatCurrency(ctx_r4.pricePerSqFt(), prop_r3.currency) : "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("tab-btn--active", ctx_r4.activeTab() === "details");
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("tab-btn--active", ctx_r4.activeTab() === "showings");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r4.showings().length);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("tab-btn--active", ctx_r4.activeTab() === "documents");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r4.documents().length);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("tab-btn--active", ctx_r4.activeTab() === "priceHistory");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r4.priceHistory().length);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("tab-btn--active", ctx_r4.activeTab() === "activities");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r4.activities().length);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("tab-btn--active", ctx_r4.activeTab() === "cma");
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("tab-btn--active", ctx_r4.activeTab() === "esign");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r4.signatureRequests().length);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("tab-btn--active", ctx_r4.activeTab() === "alerts");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r4.alertRules().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.activeTab() === "details");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.activeTab() === "showings");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.activeTab() === "documents");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.activeTab() === "priceHistory");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.activeTab() === "activities");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.activeTab() === "cma");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.activeTab() === "esign");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.activeTab() === "alerts");
} }
function PropertyDetailPage_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 97);
    i0.ɵɵtemplate(1, PropertyDetailPage_div_5_ng_container_1_Template, 111, 49, "ng-container", 98);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.property());
} }
function PropertyDetailPage_ng_template_6_p_skeleton_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-skeleton", 449);
} }
function PropertyDetailPage_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 442);
    i0.ɵɵelement(1, "p-skeleton", 443)(2, "p-skeleton", 444);
    i0.ɵɵelementStart(3, "div", 445);
    i0.ɵɵtemplate(4, PropertyDetailPage_ng_template_6_p_skeleton_4_Template, 1, 0, "p-skeleton", 446);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 447);
    i0.ɵɵelement(6, "p-skeleton", 448)(7, "p-skeleton", 448);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c8));
} }
function PropertyDetailPage_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 450);
    i0.ɵɵelement(1, "i", 174);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r53 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r53.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r53.label);
} }
function PropertyDetailPage_ng_template_15_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 450);
    i0.ɵɵelement(1, "i", 174);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r54 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r54.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r54.label);
} }
function PropertyDetailPage_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, PropertyDetailPage_ng_template_15_div_0_Template, 4, 2, "div", 451);
} if (rf & 2) {
    const option_r54 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r54);
} }
function PropertyDetailPage_ng_template_16_Template(rf, ctx) { if (rf & 1) {
    const _r55 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 452);
    i0.ɵɵlistener("click", function PropertyDetailPage_ng_template_16_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r55); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.showStatusDialog.set(false)); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2, "Cancel");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(3, "button", 152);
    i0.ɵɵlistener("click", function PropertyDetailPage_ng_template_16_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r55); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.confirmStatusChange()); });
    i0.ɵɵelementStart(4, "span", 153);
    i0.ɵɵelement(5, "i", 349);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7, "Confirm");
    i0.ɵɵelementEnd()();
} }
function PropertyDetailPage_ng_template_55_Template(rf, ctx) { if (rf & 1) {
    const _r56 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 452);
    i0.ɵɵlistener("click", function PropertyDetailPage_ng_template_55_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r56); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.showShowingDialog.set(false)); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2, "Cancel");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(3, "button", 152);
    i0.ɵɵlistener("click", function PropertyDetailPage_ng_template_55_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r56); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.submitShowing()); });
    i0.ɵɵelementStart(4, "span", 153);
    i0.ɵɵelement(5, "i", 349);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7, "Schedule");
    i0.ɵɵelementEnd()();
} }
function PropertyDetailPage_ng_template_78_Template(rf, ctx) { if (rf & 1) {
    const _r57 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 452);
    i0.ɵɵlistener("click", function PropertyDetailPage_ng_template_78_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r57); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.showDocumentDialog.set(false)); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2, "Cancel");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(3, "button", 152);
    i0.ɵɵlistener("click", function PropertyDetailPage_ng_template_78_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r57); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.submitDocument()); });
    i0.ɵɵelementStart(4, "span", 153);
    i0.ɵɵelement(5, "i", 158);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7, "Upload");
    i0.ɵɵelementEnd()();
} }
function PropertyDetailPage_ng_template_85_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 450);
    i0.ɵɵelement(1, "i", 174);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r58 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r58.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r58.label);
} }
function PropertyDetailPage_ng_template_86_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 450);
    i0.ɵɵelement(1, "i", 174);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r59 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r59.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r59.label);
} }
function PropertyDetailPage_ng_template_86_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, PropertyDetailPage_ng_template_86_div_0_Template, 4, 2, "div", 451);
} if (rf & 2) {
    const option_r59 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r59);
} }
function PropertyDetailPage_ng_template_108_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 450);
    i0.ɵɵelement(1, "i", 174);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r60 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r60.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r60.label);
} }
function PropertyDetailPage_ng_template_109_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 450);
    i0.ɵɵelement(1, "i", 174);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r61 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r61.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r61.label);
} }
function PropertyDetailPage_ng_template_109_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, PropertyDetailPage_ng_template_109_div_0_Template, 4, 2, "div", 451);
} if (rf & 2) {
    const option_r61 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r61);
} }
function PropertyDetailPage_ng_template_110_Template(rf, ctx) { if (rf & 1) {
    const _r62 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 452);
    i0.ɵɵlistener("click", function PropertyDetailPage_ng_template_110_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r62); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.showActivityDialog.set(false)); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2, "Cancel");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(3, "button", 152);
    i0.ɵɵlistener("click", function PropertyDetailPage_ng_template_110_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r62); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.submitActivity()); });
    i0.ɵɵelementStart(4, "span", 153);
    i0.ɵɵelement(5, "i", 349);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7, "Create");
    i0.ɵɵelementEnd()();
} }
function PropertyDetailPage_ng_template_126_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 450);
    i0.ɵɵelement(1, "i", 174);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r63 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r63.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r63.label);
} }
function PropertyDetailPage_ng_template_127_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 450);
    i0.ɵɵelement(1, "i", 174);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r64 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r64.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r64.label);
} }
function PropertyDetailPage_ng_template_127_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, PropertyDetailPage_ng_template_127_div_0_Template, 4, 2, "div", 451);
} if (rf & 2) {
    const option_r64 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r64);
} }
function PropertyDetailPage_ng_template_132_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 450);
    i0.ɵɵelement(1, "i", 174);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r65 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r65.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r65.label);
} }
function PropertyDetailPage_ng_template_133_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 450);
    i0.ɵɵelement(1, "i", 174);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r66 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r66.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r66.label);
} }
function PropertyDetailPage_ng_template_133_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, PropertyDetailPage_ng_template_133_div_0_Template, 4, 2, "div", 451);
} if (rf & 2) {
    const option_r66 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r66);
} }
function PropertyDetailPage_ng_template_156_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 450);
    i0.ɵɵelement(1, "i", 174);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r67 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r67.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r67.label);
} }
function PropertyDetailPage_ng_template_157_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 450);
    i0.ɵɵelement(1, "i", 174);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r68 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r68.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r68.label);
} }
function PropertyDetailPage_ng_template_157_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, PropertyDetailPage_ng_template_157_div_0_Template, 4, 2, "div", 451);
} if (rf & 2) {
    const option_r68 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r68);
} }
function PropertyDetailPage_ng_template_158_Template(rf, ctx) { if (rf & 1) {
    const _r69 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 452);
    i0.ɵɵlistener("click", function PropertyDetailPage_ng_template_158_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r69); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.showSignatureDialog.set(false)); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2, "Cancel");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(3, "button", 152);
    i0.ɵɵlistener("click", function PropertyDetailPage_ng_template_158_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r69); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.submitSignatureRequest()); });
    i0.ɵɵelementStart(4, "span", 153);
    i0.ɵɵelement(5, "i", 394);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7, "Send");
    i0.ɵɵelementEnd()();
} }
function PropertyDetailPage_ng_template_183_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 450);
    i0.ɵɵelement(1, "i", 174);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r70 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r70.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r70.label);
} }
function PropertyDetailPage_ng_template_184_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 450);
    i0.ɵɵelement(1, "i", 174);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r71 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r71.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r71.label);
} }
function PropertyDetailPage_ng_template_184_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, PropertyDetailPage_ng_template_184_div_0_Template, 4, 2, "div", 451);
} if (rf & 2) {
    const option_r71 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r71);
} }
function PropertyDetailPage_ng_template_206_Template(rf, ctx) { if (rf & 1) {
    const _r72 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 452);
    i0.ɵɵlistener("click", function PropertyDetailPage_ng_template_206_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r72); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.showAlertDialog.set(false)); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2, "Cancel");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(3, "button", 152);
    i0.ɵɵlistener("click", function PropertyDetailPage_ng_template_206_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r72); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.submitAlertRule()); });
    i0.ɵɵelementStart(4, "span", 153);
    i0.ɵɵelement(5, "i", 349);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7, "Create Rule");
    i0.ɵɵelementEnd()();
} }
function PropertyDetailPage_div_207_button_3_Template(rf, ctx) { if (rf & 1) {
    const _r74 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 460);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_207_button_3_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r74); const ctx_r4 = i0.ɵɵnextContext(2); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r4.lightboxPrev()); });
    i0.ɵɵelement(1, "i", 461);
    i0.ɵɵelementEnd();
} }
function PropertyDetailPage_div_207_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r75 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 462);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_207_button_8_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r75); const ctx_r4 = i0.ɵɵnextContext(2); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r4.lightboxNext()); });
    i0.ɵɵelement(1, "i", 463);
    i0.ɵɵelementEnd();
} }
function PropertyDetailPage_div_207_Template(rf, ctx) { if (rf & 1) {
    const _r73 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 453);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_207_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r73); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.closeLightbox()); });
    i0.ɵɵelementStart(1, "button", 454);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_207_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r73); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.closeLightbox()); });
    i0.ɵɵelement(2, "i", 169);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, PropertyDetailPage_div_207_button_3_Template, 2, 0, "button", 455);
    i0.ɵɵelementStart(4, "div", 456);
    i0.ɵɵlistener("click", function PropertyDetailPage_div_207_Template_div_click_4_listener($event) { i0.ɵɵrestoreView(_r73); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelement(5, "img", 457);
    i0.ɵɵelementStart(6, "div", 458);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(8, PropertyDetailPage_div_207_button_8_Template, 2, 0, "button", 459);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r4.photoUrlList().length > 1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", ctx_r4.photoUrlList()[ctx_r4.lightboxIndex()], i0.ɵɵsanitizeUrl)("alt", "Photo " + (ctx_r4.lightboxIndex() + 1));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", ctx_r4.lightboxIndex() + 1, " / ", ctx_r4.photoUrlList().length, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.photoUrlList().length > 1);
} }
export class PropertyDetailPage {
    route = inject(ActivatedRoute);
    router = inject(Router);
    propertyData = inject(PropertyDataService);
    fb = inject(FormBuilder);
    toast = inject(AppToastService);
    crmEvents = inject(CrmEventsService);
    eventSub;
    propertyId = '';
    // Live alerts (X9)
    liveAlerts = signal([], ...(ngDevMode ? [{ debugName: "liveAlerts" }] : []));
    showLiveBanner = computed(() => this.liveAlerts().length > 0, ...(ngDevMode ? [{ debugName: "showLiveBanner" }] : []));
    property = signal(null, ...(ngDevMode ? [{ debugName: "property" }] : []));
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    activeTab = signal('details', ...(ngDevMode ? [{ debugName: "activeTab" }] : []));
    // Sub-resource data
    priceHistory = signal([], ...(ngDevMode ? [{ debugName: "priceHistory" }] : []));
    showings = signal([], ...(ngDevMode ? [{ debugName: "showings" }] : []));
    documents = signal([], ...(ngDevMode ? [{ debugName: "documents" }] : []));
    activities = signal([], ...(ngDevMode ? [{ debugName: "activities" }] : []));
    timeline = signal([], ...(ngDevMode ? [{ debugName: "timeline" }] : []));
    // CMA (G3)
    cmaReport = signal(null, ...(ngDevMode ? [{ debugName: "cmaReport" }] : []));
    cmaLoading = signal(false, ...(ngDevMode ? [{ debugName: "cmaLoading" }] : []));
    // E-Signature (G4)
    signatureRequests = signal([], ...(ngDevMode ? [{ debugName: "signatureRequests" }] : []));
    showSignatureDialog = signal(false, ...(ngDevMode ? [{ debugName: "showSignatureDialog" }] : []));
    showVoidDialog = signal(false, ...(ngDevMode ? [{ debugName: "showVoidDialog" }] : []));
    voidTargetId = signal(null, ...(ngDevMode ? [{ debugName: "voidTargetId" }] : []));
    voidReason = signal('', ...(ngDevMode ? [{ debugName: "voidReason" }] : []));
    sigActionLoading = signal(null, ...(ngDevMode ? [{ debugName: "sigActionLoading" }] : [])); // tracks which signature action is loading
    // Photo lightbox
    lightboxOpen = signal(false, ...(ngDevMode ? [{ debugName: "lightboxOpen" }] : []));
    lightboxIndex = signal(0, ...(ngDevMode ? [{ debugName: "lightboxIndex" }] : []));
    // Alerts (G5)
    alertRules = signal([], ...(ngDevMode ? [{ debugName: "alertRules" }] : []));
    alertNotifications = signal([], ...(ngDevMode ? [{ debugName: "alertNotifications" }] : []));
    showAlertDialog = signal(false, ...(ngDevMode ? [{ debugName: "showAlertDialog" }] : []));
    // Dialogs
    showShowingDialog = signal(false, ...(ngDevMode ? [{ debugName: "showShowingDialog" }] : []));
    showDocumentDialog = signal(false, ...(ngDevMode ? [{ debugName: "showDocumentDialog" }] : []));
    showStatusDialog = signal(false, ...(ngDevMode ? [{ debugName: "showStatusDialog" }] : []));
    showActivityDialog = signal(false, ...(ngDevMode ? [{ debugName: "showActivityDialog" }] : []));
    showingScheduledAtLocal = '';
    // Quick action forms
    showingForm = this.fb.group({
        visitorName: ['', Validators.required],
        visitorEmail: [''],
        visitorPhone: [''],
        scheduledAtUtc: [null, Validators.required],
        durationMinutes: [30]
    });
    documentForm = this.fb.group({
        fileName: ['', Validators.required],
        category: ['Other'],
        fileUrl: ['']
    });
    activityForm = this.fb.group({
        type: ['Task'],
        subject: ['', Validators.required],
        description: [''],
        dueDate: [null],
        priority: ['Medium']
    });
    // E-Signature form (G4)
    signatureForm = this.fb.group({
        documentName: ['', Validators.required],
        documentType: ['ListingAgreement'],
        provider: ['DocuSign'],
        signerName: ['', Validators.required],
        signerEmail: ['', [Validators.required, Validators.email]],
        signerRole: ['Buyer']
    });
    // Alert rule form (G5)
    alertForm = this.fb.group({
        clientName: ['', Validators.required],
        clientEmail: ['', [Validators.required, Validators.email]],
        frequency: ['Daily'],
        minPrice: [null],
        maxPrice: [null],
        minBedrooms: [null]
    });
    statusOptions = [
        { label: 'Draft', value: 'Draft', icon: 'pi-file-edit' },
        { label: 'Active', value: 'Active', icon: 'pi-check-circle' },
        { label: 'Conditional', value: 'Conditional', icon: 'pi-clock' },
        { label: 'Sold', value: 'Sold', icon: 'pi-star-fill' },
        { label: 'Terminated', value: 'Terminated', icon: 'pi-times-circle' },
        { label: 'Expired', value: 'Expired', icon: 'pi-calendar-times' },
        { label: 'Delisted', value: 'Delisted', icon: 'pi-minus-circle' }
    ];
    documentCategories = [
        { label: 'Photo', value: 'Photo' },
        { label: 'Floor Plan', value: 'FloorPlan' },
        { label: 'Contract', value: 'Contract' },
        { label: 'Inspection', value: 'Inspection' },
        { label: 'Appraisal', value: 'Appraisal' },
        { label: 'Disclosure', value: 'Disclosure' },
        { label: 'Other', value: 'Other' }
    ];
    activityTypes = [
        { label: 'Task', value: 'Task', icon: 'pi-check-square' },
        { label: 'Call', value: 'Call', icon: 'pi-phone' },
        { label: 'Email', value: 'Email', icon: 'pi-envelope' },
        { label: 'Meeting', value: 'Meeting', icon: 'pi-users' },
        { label: 'Note', value: 'Note', icon: 'pi-pencil' },
        { label: 'Follow Up', value: 'FollowUp', icon: 'pi-replay' }
    ];
    activityPriorities = [
        { label: 'Low', value: 'Low', icon: 'pi-minus' },
        { label: 'Medium', value: 'Medium', icon: 'pi-equals' },
        { label: 'High', value: 'High', icon: 'pi-exclamation-triangle' },
        { label: 'Urgent', value: 'Urgent', icon: 'pi-bolt' }
    ];
    signatureDocTypes = [
        { label: 'Purchase Agreement', value: 'PurchaseAgreement', icon: 'pi-file' },
        { label: 'Listing Agreement', value: 'ListingAgreement', icon: 'pi-list' },
        { label: 'Amendment', value: 'Amendment', icon: 'pi-pencil' },
        { label: 'Disclosure', value: 'Disclosure', icon: 'pi-info-circle' },
        { label: 'Other', value: 'Other', icon: 'pi-paperclip' }
    ];
    signatureProviders = [
        { label: 'DocuSign', value: 'DocuSign', icon: 'pi-verified' },
        { label: 'HelloSign', value: 'HelloSign', icon: 'pi-check-circle' },
        { label: 'Adobe Sign', value: 'AdobeSign', icon: 'pi-file-pdf' }
    ];
    signerRoles = [
        { label: 'Buyer', value: 'Buyer', icon: 'pi-user' },
        { label: 'Seller', value: 'Seller', icon: 'pi-user' },
        { label: 'Agent', value: 'Agent', icon: 'pi-briefcase' },
        { label: 'Lawyer', value: 'Lawyer', icon: 'pi-shield' },
        { label: 'Witness', value: 'Witness', icon: 'pi-eye' }
    ];
    alertFrequencies = [
        { label: 'Instant', value: 'Instant', icon: 'pi-bolt' },
        { label: 'Daily', value: 'Daily', icon: 'pi-calendar' },
        { label: 'Weekly', value: 'Weekly', icon: 'pi-calendar-clock' }
    ];
    selectedStatus = signal('', ...(ngDevMode ? [{ debugName: "selectedStatus" }] : []));
    canEdit = tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.propertiesManage);
    daysSinceListed = computed(() => {
        const prop = this.property();
        if (!prop)
            return 0;
        const ref = prop.listingDateUtc || prop.createdAtUtc;
        const diffMs = Date.now() - new Date(ref).getTime();
        return Math.max(Math.round(diffMs / 86_400_000), 0);
    }, ...(ngDevMode ? [{ debugName: "daysSinceListed" }] : []));
    timelineEvents = computed(() => this.timeline(), ...(ngDevMode ? [{ debugName: "timelineEvents" }] : []));
    pricePerSqFt = computed(() => {
        const prop = this.property();
        if (!prop?.listPrice || !prop?.squareFeet || prop.squareFeet === 0)
            return null;
        return Math.round(prop.listPrice / prop.squareFeet);
    }, ...(ngDevMode ? [{ debugName: "pricePerSqFt" }] : []));
    photoUrlList = computed(() => {
        const prop = this.property();
        const manualUrls = (prop?.photoUrls ?? '')
            .split(',')
            .map((u) => u.trim())
            .filter((u) => u.length > 0);
        const uploadedUrls = this.documents()
            .filter((doc) => doc.category === 'Photo' && !!doc.fileUrl)
            .map((doc) => this.resolveMediaUrl(doc.fileUrl));
        return Array.from(new Set([...uploadedUrls, ...manualUrls.map((url) => this.resolveMediaUrl(url))]));
    }, ...(ngDevMode ? [{ debugName: "photoUrlList" }] : []));
    priceChangeDirection = (pc) => pc.newPrice > pc.previousPrice ? 'up' : 'down';
    priceChangePct = (pc) => Math.abs(((pc.newPrice - pc.previousPrice) / pc.previousPrice) * 100).toFixed(1);
    showingSeverity(status) {
        switch (status) {
            case 'Completed': return 'success';
            case 'Scheduled': return 'info';
            case 'Cancelled': return 'warn';
            case 'NoShow': return 'danger';
            default: return 'secondary';
        }
    }
    docCategoryIcon(cat) {
        switch (cat) {
            case 'Photo': return 'pi-image';
            case 'FloorPlan': return 'pi-map';
            case 'Contract': return 'pi-file';
            case 'Inspection': return 'pi-search';
            case 'Appraisal': return 'pi-chart-line';
            case 'Disclosure': return 'pi-info-circle';
            default: return 'pi-paperclip';
        }
    }
    formatFileSize(bytes) {
        if (!bytes)
            return '—';
        if (bytes < 1024)
            return bytes + ' B';
        if (bytes < 1048576)
            return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1048576).toFixed(1) + ' MB';
    }
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) {
            this.router.navigate(['/app/properties']);
            return;
        }
        this.propertyId = id;
        this.loadProperty(id);
        this.subscribeToLiveEvents(id);
    }
    ngOnDestroy() {
        this.eventSub?.unsubscribe();
        if (this.propertyId) {
            this.crmEvents.leaveRecordPresence('property', this.propertyId);
        }
    }
    subscribeToLiveEvents(propertyId) {
        this.crmEvents.joinRecordPresence('property', propertyId);
        this.eventSub = this.crmEvents.events$.subscribe((ev) => {
            const payload = ev.payload;
            const entityId = payload?.['entityId'];
            // Only process events relevant to this property
            if (entityId && entityId !== propertyId)
                return;
            const alert = this.mapEventToAlert(ev.eventType, payload, ev.occurredAtUtc);
            if (alert) {
                this.liveAlerts.update((prev) => [alert, ...prev].slice(0, 20));
            }
        });
    }
    mapEventToAlert(eventType, payload, occurredAt) {
        const id = crypto.randomUUID();
        switch (eventType) {
            case 'entity.crud.changed':
                if (String(payload?.['entityType'] ?? '').toLowerCase() !== 'property')
                    return null;
                return { id, type: 'info', message: `Property record updated by ${payload?.['userName'] || 'another user'}`, timestamp: occurredAt, icon: 'pi-refresh' };
            case 'property.price.changed':
                return { id, type: 'price', message: `Price changed to ${payload?.['newPrice'] || 'a new value'}`, timestamp: occurredAt, icon: 'pi-dollar' };
            case 'property.showing.scheduled':
                return { id, type: 'showing', message: `New showing scheduled for ${payload?.['visitorName'] || 'a visitor'}`, timestamp: occurredAt, icon: 'pi-calendar' };
            case 'property.status.changed':
                return { id, type: 'status', message: `Status changed to ${payload?.['newStatus'] || 'unknown'}`, timestamp: occurredAt, icon: 'pi-sync' };
            case 'property.document.uploaded':
                return { id, type: 'document', message: `New document uploaded: ${payload?.['fileName'] || 'file'}`, timestamp: occurredAt, icon: 'pi-file' };
            case 'property.activity.created':
                return { id, type: 'activity', message: `New activity: ${payload?.['subject'] || 'task'}`, timestamp: occurredAt, icon: 'pi-bell' };
            default:
                return null;
        }
    }
    dismissAlert(alertId) {
        this.liveAlerts.update((prev) => prev.filter((a) => a.id !== alertId));
    }
    clearAllAlerts() {
        this.liveAlerts.set([]);
    }
    alertTypeIcon(type) {
        switch (type) {
            case 'price': return 'alert-icon--price';
            case 'showing': return 'alert-icon--showing';
            case 'status': return 'alert-icon--status';
            case 'document': return 'alert-icon--document';
            case 'activity': return 'alert-icon--activity';
            default: return 'alert-icon--info';
        }
    }
    loadProperty(id) {
        this.loading.set(true);
        this.propertyData.getById(id).subscribe({
            next: (prop) => {
                this.property.set(prop);
                this.selectedStatus.set(prop.status);
                this.loading.set(false);
                this.loadSubResources(id);
            },
            error: () => {
                this.router.navigate(['/app/properties']);
            }
        });
    }
    loadSubResources(id) {
        this.propertyData.getTimeline(id).subscribe({ next: (data) => this.timeline.set(data) });
        this.propertyData.getPriceHistory(id).subscribe({ next: (data) => this.priceHistory.set(data) });
        this.propertyData.getShowings(id).subscribe({ next: (data) => this.showings.set(data) });
        this.propertyData.getDocuments(id).subscribe({ next: (data) => this.documents.set(data) });
        this.propertyData.getActivities(id).subscribe({ next: (data) => this.activities.set(data) });
        this.propertyData.getSignatureRequests(id).subscribe({ next: (data) => this.signatureRequests.set(data) });
        this.propertyData.getAlertRules(id).subscribe({ next: (data) => this.alertRules.set(data) });
        this.propertyData.getAlertNotifications(id).subscribe({ next: (data) => this.alertNotifications.set(data) });
    }
    setTab(tab) {
        this.activeTab.set(tab);
        if (tab === 'cma' && !this.cmaReport()) {
            this.loadCmaReport();
        }
    }
    // Quick Actions (X12)
    onChangeStatus() {
        this.showStatusDialog.set(true);
    }
    confirmStatusChange() {
        const prop = this.property();
        if (!prop)
            return;
        this.propertyData.update(prop.id, {
            mlsNumber: prop.mlsNumber,
            address: prop.address,
            city: prop.city,
            province: prop.province,
            postalCode: prop.postalCode,
            country: prop.country,
            listPrice: prop.listPrice,
            salePrice: prop.salePrice,
            currency: prop.currency,
            listingDateUtc: prop.listingDateUtc,
            soldDateUtc: prop.soldDateUtc,
            status: this.selectedStatus(),
            propertyType: prop.propertyType,
            bedrooms: prop.bedrooms,
            bathrooms: prop.bathrooms,
            squareFeet: prop.squareFeet,
            lotSizeSqFt: prop.lotSizeSqFt,
            yearBuilt: prop.yearBuilt,
            garageSpaces: prop.garageSpaces,
            description: prop.description,
            features: prop.features,
            neighborhood: prop.neighborhood,
            photoUrls: prop.photoUrls,
            virtualTourUrl: prop.virtualTourUrl,
            commissionRate: prop.commissionRate,
            buyerAgentCommission: prop.buyerAgentCommission,
            sellerAgentCommission: prop.sellerAgentCommission,
            coListingAgentId: prop.coListingAgentId,
            ownerId: prop.ownerId,
            accountId: prop.accountId,
            primaryContactId: prop.primaryContactId,
            opportunityId: prop.opportunityId
        }).subscribe({
            next: () => {
                this.loadProperty(prop.id);
                this.showStatusDialog.set(false);
                this.toast.show('success', 'Status updated.', 3000);
            }
        });
    }
    onLogShowing() {
        this.showingForm.reset({ visitorName: '', visitorEmail: '', visitorPhone: '', scheduledAtUtc: null, durationMinutes: 30 });
        this.showingScheduledAtLocal = '';
        this.showShowingDialog.set(true);
    }
    submitShowing() {
        const scheduledAt = this.parseLocalDateTime(this.showingScheduledAtLocal) ?? this.resolveShowingScheduledAt();
        if (scheduledAt) {
            this.showingForm.patchValue({ scheduledAtUtc: scheduledAt }, { emitEvent: false });
        }
        this.showingForm.markAllAsTouched();
        if (this.showingForm.invalid)
            return;
        const prop = this.property();
        if (!prop)
            return;
        const v = this.showingForm.getRawValue();
        this.propertyData.createShowing(prop.id, {
            visitorName: v.visitorName,
            visitorEmail: v.visitorEmail || undefined,
            visitorPhone: v.visitorPhone || undefined,
            scheduledAtUtc: v.scheduledAtUtc?.toISOString(),
            durationMinutes: v.durationMinutes,
            status: 'Scheduled'
        }).subscribe({
            next: () => {
                this.showShowingDialog.set(false);
                this.loadSubResources(prop.id);
                this.toast.show('success', 'Showing scheduled.', 3000);
            }
        });
    }
    onShowingScheduledAtChange(value) {
        this.showingScheduledAtLocal = value;
        const scheduledAt = this.parseLocalDateTime(value);
        this.showingForm.patchValue({ scheduledAtUtc: scheduledAt }, { emitEvent: false });
        this.showingForm.get('scheduledAtUtc')?.markAsDirty();
        this.showingForm.get('scheduledAtUtc')?.updateValueAndValidity({ emitEvent: false });
    }
    resolveShowingScheduledAt() {
        const controlValue = this.showingForm.get('scheduledAtUtc')?.value;
        if (controlValue instanceof Date && !Number.isNaN(controlValue.getTime())) {
            return controlValue;
        }
        if (typeof document === 'undefined') {
            return null;
        }
        const rawValue = document.querySelector('#showing-date input')?.value?.trim();
        if (!rawValue) {
            return null;
        }
        const directParse = new Date(rawValue);
        if (!Number.isNaN(directParse.getTime())) {
            return directParse;
        }
        const match = rawValue.match(/^(?<month>\d{1,2})\/(?<day>\d{1,2})\/(?<year>\d{4})(?:,\s*|\s+)(?<hour>\d{1,2}):(?<minute>\d{2})\s*(?<meridiem>AM|PM)$/i);
        if (!match?.groups) {
            return null;
        }
        const month = Number(match.groups['month']);
        const day = Number(match.groups['day']);
        const year = Number(match.groups['year']);
        let hour = Number(match.groups['hour']);
        const minute = Number(match.groups['minute']);
        const meridiem = match.groups['meridiem'].toUpperCase();
        if (meridiem === 'PM' && hour < 12) {
            hour += 12;
        }
        else if (meridiem === 'AM' && hour === 12) {
            hour = 0;
        }
        const parsed = new Date(year, month - 1, day, hour, minute, 0, 0);
        return Number.isNaN(parsed.getTime()) ? null : parsed;
    }
    parseLocalDateTime(rawValue) {
        if (!rawValue) {
            return null;
        }
        const match = rawValue.match(/^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})T(?<hour>\d{2}):(?<minute>\d{2})$/);
        if (!match?.groups) {
            return null;
        }
        const year = Number(match.groups['year']);
        const month = Number(match.groups['month']);
        const day = Number(match.groups['day']);
        const hour = Number(match.groups['hour']);
        const minute = Number(match.groups['minute']);
        const parsed = new Date(year, month - 1, day, hour, minute, 0, 0);
        return Number.isNaN(parsed.getTime()) ? null : parsed;
    }
    onUploadDocument() {
        this.documentForm.reset({ fileName: '', category: 'Other', fileUrl: '' });
        this.showDocumentDialog.set(true);
    }
    submitDocument() {
        this.documentForm.markAllAsTouched();
        if (this.documentForm.invalid)
            return;
        const prop = this.property();
        if (!prop)
            return;
        const v = this.documentForm.getRawValue();
        this.propertyData.uploadDocument(prop.id, {
            fileName: v.fileName,
            category: v.category,
            fileUrl: v.fileUrl || undefined,
            uploadedBy: prop.ownerName
        }).subscribe({
            next: () => {
                this.showDocumentDialog.set(false);
                this.loadSubResources(prop.id);
                this.toast.show('success', 'Document uploaded.', 3000);
            }
        });
    }
    onDeleteDocument(docId) {
        const prop = this.property();
        if (!prop)
            return;
        this.propertyData.deleteDocument(prop.id, docId).subscribe({
            next: () => {
                this.documents.set(this.documents().filter(d => d.id !== docId));
                this.propertyData.getTimeline(prop.id).subscribe({ next: (data) => this.timeline.set(data) });
                this.toast.show('success', 'Document deleted.', 3000);
            }
        });
    }
    formatCurrency(amount, currency) {
        if (amount == null)
            return '—';
        try {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency || 'CAD', maximumFractionDigits: 0 }).format(amount);
        }
        catch {
            return `$${amount.toLocaleString()}`;
        }
    }
    // Activity actions (X2)
    onAddActivity() {
        this.activityForm.reset({ type: 'Task', subject: '', description: '', dueDate: null, priority: 'Medium' });
        this.showActivityDialog.set(true);
    }
    submitActivity() {
        this.activityForm.markAllAsTouched();
        if (this.activityForm.invalid)
            return;
        const prop = this.property();
        if (!prop)
            return;
        const v = this.activityForm.getRawValue();
        this.propertyData.createActivity(prop.id, {
            type: v.type,
            subject: v.subject,
            description: v.description || undefined,
            dueDate: v.dueDate?.toISOString(),
            priority: v.priority,
            status: 'Open'
        }).subscribe({
            next: () => {
                this.showActivityDialog.set(false);
                this.propertyData.getActivities(prop.id).subscribe({ next: (data) => this.activities.set(data) });
                this.propertyData.getTimeline(prop.id).subscribe({ next: (data) => this.timeline.set(data) });
                this.toast.show('success', 'Activity created.', 3000);
            }
        });
    }
    completeActivity(activityId) {
        const prop = this.property();
        if (!prop)
            return;
        this.propertyData.updateActivity(prop.id, activityId, { status: 'Completed', completedDate: new Date().toISOString() }).subscribe({
            next: () => {
                this.activities.set(this.activities().map(a => a.id === activityId ? { ...a, status: 'Completed', completedDate: new Date().toISOString() } : a));
                this.propertyData.getTimeline(prop.id).subscribe({ next: (data) => this.timeline.set(data) });
                this.toast.show('success', 'Activity completed.', 3000);
            }
        });
    }
    activityTypeIcon(type) {
        switch (type) {
            case 'Task': return 'pi-check-square';
            case 'Call': return 'pi-phone';
            case 'Email': return 'pi-envelope';
            case 'Meeting': return 'pi-users';
            case 'Note': return 'pi-pencil';
            case 'FollowUp': return 'pi-replay';
            default: return 'pi-list';
        }
    }
    activityTypeLabel(type) {
        switch (type) {
            case 'FollowUp': return 'Follow Up';
            default: return type;
        }
    }
    prioritySeverity(priority) {
        switch (priority) {
            case 'Urgent': return 'danger';
            case 'High': return 'warn';
            case 'Medium': return 'info';
            case 'Low': return 'secondary';
            default: return 'info';
        }
    }
    statusClass(status) {
        switch (status) {
            case 'Active': return 'status--active';
            case 'Conditional': return 'status--conditional';
            case 'Sold': return 'status--sold';
            case 'Draft': return 'status--draft';
            case 'Terminated':
            case 'Expired':
            case 'Delisted': return 'status--inactive';
            default: return 'status--default';
        }
    }
    typeLabel(type) {
        const map = {
            SemiDetached: 'Semi-Detached',
            MultiFamily: 'Multi-Family'
        };
        return map[type] || type;
    }
    // ── CMA (G3) ──
    loadCmaReport() {
        const prop = this.property();
        if (!prop)
            return;
        this.cmaLoading.set(true);
        this.propertyData.getCmaReport(prop.id).subscribe({
            next: (r) => { this.cmaReport.set(r); this.cmaLoading.set(false); },
            error: () => this.cmaLoading.set(false)
        });
    }
    generateCma() {
        const prop = this.property();
        if (!prop)
            return;
        this.cmaLoading.set(true);
        this.propertyData.generateCmaReport(prop.id, 5).subscribe({
            next: (r) => { this.cmaReport.set(r); this.cmaLoading.set(false); this.toast.show('success', 'CMA report generated.', 3000); },
            error: () => this.cmaLoading.set(false)
        });
    }
    marketTrendSeverity(trend) {
        switch (trend) {
            case 'Rising': return 'success';
            case 'Declining': return 'danger';
            default: return 'info';
        }
    }
    cmaStatusSeverity(status) {
        switch (status) {
            case 'Sold': return 'success';
            case 'Active': return 'info';
            case 'Pending': return 'warn';
            default: return 'secondary';
        }
    }
    // ── E-Signature (G4) ──
    onAddSignatureRequest() {
        this.signatureForm.reset({ documentName: '', documentType: 'PurchaseAgreement', provider: 'DocuSign', signerName: '', signerEmail: '', signerRole: 'Buyer' });
        this.showSignatureDialog.set(true);
    }
    submitSignatureRequest() {
        this.signatureForm.markAllAsTouched();
        if (this.signatureForm.invalid)
            return;
        const prop = this.property();
        if (!prop)
            return;
        const v = this.signatureForm.getRawValue();
        this.propertyData.createSignatureRequest(prop.id, {
            documentName: v.documentName,
            documentType: v.documentType,
            provider: v.provider,
            signers: [{ name: v.signerName, email: v.signerEmail, role: v.signerRole, status: 'Pending' }]
        }).subscribe({
            next: () => {
                this.showSignatureDialog.set(false);
                this.propertyData.getSignatureRequests(prop.id).subscribe({ next: (d) => this.signatureRequests.set(d) });
                this.toast.show('success', 'Signature request sent.', 3000);
            }
        });
    }
    signatureStatusSeverity(status) {
        switch (status) {
            case 'Signed': return 'success';
            case 'Sent':
            case 'Viewed': return 'info';
            case 'Draft': return 'secondary';
            case 'Declined': return 'danger';
            case 'Expired': return 'warn';
            default: return 'secondary';
        }
    }
    sendEnvelope(signatureId) {
        const prop = this.property();
        if (!prop)
            return;
        this.sigActionLoading.set(signatureId);
        this.propertyData.sendSignatureRequest(prop.id, signatureId).subscribe({
            next: () => {
                this.propertyData.getSignatureRequests(prop.id).subscribe({ next: (d) => this.signatureRequests.set(d) });
                this.sigActionLoading.set(null);
                this.toast.show('success', 'Envelope sent via DocuSign.', 3000);
            },
            error: () => { this.sigActionLoading.set(null); this.toast.show('error', 'Failed to send envelope.', 3000); }
        });
    }
    refreshSignatureStatus(signatureId) {
        const prop = this.property();
        if (!prop)
            return;
        this.sigActionLoading.set(signatureId);
        this.propertyData.refreshSignatureStatus(prop.id, signatureId).subscribe({
            next: () => {
                this.propertyData.getSignatureRequests(prop.id).subscribe({ next: (d) => this.signatureRequests.set(d) });
                this.sigActionLoading.set(null);
                this.toast.show('success', 'Signature status refreshed.', 3000);
            },
            error: () => { this.sigActionLoading.set(null); this.toast.show('error', 'Failed to refresh status.', 3000); }
        });
    }
    openVoidDialog(signatureId) {
        this.voidTargetId.set(signatureId);
        this.voidReason.set('');
        this.showVoidDialog.set(true);
    }
    confirmVoid() {
        const prop = this.property();
        const sigId = this.voidTargetId();
        if (!prop || !sigId)
            return;
        this.sigActionLoading.set(sigId);
        this.propertyData.voidSignatureRequest(prop.id, sigId, this.voidReason()).subscribe({
            next: () => {
                this.showVoidDialog.set(false);
                this.propertyData.getSignatureRequests(prop.id).subscribe({ next: (d) => this.signatureRequests.set(d) });
                this.sigActionLoading.set(null);
                this.toast.show('success', 'Envelope voided.', 3000);
            },
            error: () => { this.sigActionLoading.set(null); this.toast.show('error', 'Failed to void envelope.', 3000); }
        });
    }
    downloadSignedDocument(signatureId, documentName) {
        const prop = this.property();
        if (!prop)
            return;
        this.sigActionLoading.set(signatureId);
        this.propertyData.downloadSignedDocument(prop.id, signatureId).subscribe({
            next: (blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${documentName}-signed.pdf`;
                a.click();
                window.URL.revokeObjectURL(url);
                this.sigActionLoading.set(null);
                this.toast.show('success', 'Document downloaded.', 3000);
            },
            error: () => { this.sigActionLoading.set(null); this.toast.show('error', 'Failed to download document.', 3000); }
        });
    }
    // ── Property Alerts (G5) ──
    onAddAlertRule() {
        this.alertForm.reset({ clientName: '', clientEmail: '', frequency: 'Daily', minPrice: null, maxPrice: null, minBedrooms: null });
        this.showAlertDialog.set(true);
    }
    submitAlertRule() {
        this.alertForm.markAllAsTouched();
        if (this.alertForm.invalid)
            return;
        const prop = this.property();
        if (!prop)
            return;
        const v = this.alertForm.getRawValue();
        this.propertyData.createAlertRule(prop.id, {
            clientName: v.clientName,
            clientEmail: v.clientEmail,
            frequency: v.frequency,
            criteria: {
                minPrice: v.minPrice || undefined,
                maxPrice: v.maxPrice || undefined,
                minBedrooms: v.minBedrooms || undefined
            }
        }).subscribe({
            next: () => {
                this.showAlertDialog.set(false);
                this.propertyData.getAlertRules(prop.id).subscribe({ next: (d) => this.alertRules.set(d) });
                this.propertyData.getAlertNotifications(prop.id).subscribe({ next: (d) => this.alertNotifications.set(d) });
                this.propertyData.getTimeline(prop.id).subscribe({ next: (data) => this.timeline.set(data) });
                this.toast.show('success', 'Alert rule created.', 3000);
            }
        });
    }
    toggleAlertRule(ruleId, isActive) {
        const prop = this.property();
        if (!prop)
            return;
        this.propertyData.toggleAlertRule(prop.id, ruleId, isActive).subscribe({
            next: () => {
                this.alertRules.set(this.alertRules().map(r => r.id === ruleId ? { ...r, isActive } : r));
                this.propertyData.getTimeline(prop.id).subscribe({ next: (data) => this.timeline.set(data) });
                this.toast.show('success', isActive ? 'Alert activated.' : 'Alert paused.', 3000);
            }
        });
    }
    alertNotifStatusSeverity(status) {
        switch (status) {
            case 'Clicked': return 'success';
            case 'Opened':
            case 'Sent': return 'info';
            case 'Bounced': return 'danger';
            default: return 'secondary';
        }
    }
    openLightbox(index) {
        this.lightboxIndex.set(index);
        this.lightboxOpen.set(true);
    }
    closeLightbox() {
        this.lightboxOpen.set(false);
    }
    lightboxPrev() {
        const total = this.photoUrlList().length;
        if (total === 0)
            return;
        this.lightboxIndex.set((this.lightboxIndex() - 1 + total) % total);
    }
    lightboxNext() {
        const total = this.photoUrlList().length;
        if (total === 0)
            return;
        this.lightboxIndex.set((this.lightboxIndex() + 1) % total);
    }
    onKeydown(e) {
        if (!this.lightboxOpen())
            return;
        if (e.key === 'Escape')
            this.closeLightbox();
        else if (e.key === 'ArrowLeft')
            this.lightboxPrev();
        else if (e.key === 'ArrowRight')
            this.lightboxNext();
    }
    resolveMediaUrl(url) {
        if (!url) {
            return '';
        }
        if (/^https?:\/\//i.test(url)) {
            return url;
        }
        return `${environment.apiUrl}${url.startsWith('/') ? '' : '/'}${url}`;
    }
    static ɵfac = function PropertyDetailPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PropertyDetailPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PropertyDetailPage, selectors: [["app-property-detail"]], hostBindings: function PropertyDetailPage_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("keydown", function PropertyDetailPage_keydown_HostBindingHandler($event) { return ctx.onKeydown($event); }, i0.ɵɵresolveDocument);
        } }, decls: 208, vars: 55, consts: [["pageLoading", ""], ["noShowings", ""], ["noDocs", ""], ["noPriceHistory", ""], ["noActivities", ""], ["noSignatures", ""], ["noAlertRules", ""], [1, "page-container"], [1, "bg-orbs"], [1, "orb", "orb-1"], [1, "orb", "orb-2"], [1, "orb", "orb-3"], ["class", "page-content", 4, "ngIf", "ngIfElse"], ["header", "Change Property Status", 3, "visibleChange", "visible", "modal"], [1, "dialog-body"], [1, "form-field"], ["for", "status-select"], ["id", "status-select", "optionLabel", "label", "optionValue", "value", "placeholder", "Select status", "appendTo", "body", 1, "w-full", 3, "ngModelChange", "options", "ngModel"], ["pTemplate", "item"], ["pTemplate", "selectedItem"], ["pTemplate", "footer"], ["header", "Schedule Showing", 3, "visibleChange", "visible", "modal"], [1, "dialog-body", 3, "formGroup"], ["for", "showing-visitor"], [1, "required"], [1, "icon-addon", "icon-addon--name"], [1, "pi", "pi-user"], ["pInputText", "", "id", "showing-visitor", "formControlName", "visitorName", "placeholder", "Enter visitor name"], ["for", "showing-email"], [1, "icon-addon", "icon-addon--email"], [1, "pi", "pi-envelope"], ["pInputText", "", "id", "showing-email", "formControlName", "visitorEmail", "placeholder", "visitor@email.com"], ["for", "showing-phone"], [1, "icon-addon", "icon-addon--phone"], [1, "pi", "pi-phone"], ["pInputText", "", "id", "showing-phone", "formControlName", "visitorPhone", "placeholder", "+1 (555) 000-0000"], ["for", "showing-date"], ["pInputText", "", "id", "showing-date", "type", "datetime-local", 1, "w-full", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["for", "showing-duration"], [1, "icon-addon", "icon-addon--info"], [1, "pi", "pi-clock"], ["pInputText", "", "id", "showing-duration", "formControlName", "durationMinutes", "type", "number", "placeholder", "30"], ["header", "Upload Document", 3, "visibleChange", "visible", "modal"], ["for", "doc-name"], [1, "pi", "pi-file"], ["pInputText", "", "id", "doc-name", "formControlName", "fileName", "placeholder", "Enter file name"], ["for", "doc-category"], ["id", "doc-category", "optionLabel", "label", "optionValue", "value", "formControlName", "category", "placeholder", "Select category", "appendTo", "body", 1, "w-full", 3, "options"], ["for", "doc-url"], [1, "icon-addon", "icon-addon--website"], [1, "pi", "pi-link"], ["pInputText", "", "id", "doc-url", "formControlName", "fileUrl", "placeholder", "https://..."], ["header", "Add Activity", 3, "visibleChange", "visible", "modal"], ["for", "activity-type"], ["id", "activity-type", "optionLabel", "label", "optionValue", "value", "formControlName", "type", "placeholder", "Select type", "appendTo", "body", 1, "w-full", 3, "options"], ["for", "activity-subject"], [1, "pi", "pi-pencil"], ["pInputText", "", "id", "activity-subject", "formControlName", "subject", "placeholder", "Enter subject"], ["for", "activity-description"], ["pTextarea", "", "id", "activity-description", "formControlName", "description", "rows", "3", "placeholder", "Optional details..."], ["for", "activity-due"], ["id", "activity-due", "formControlName", "dueDate", "appendTo", "body", "placeholder", "Select due date", 1, "w-full", 3, "showTime"], ["for", "activity-priority"], ["id", "activity-priority", "optionLabel", "label", "optionValue", "value", "formControlName", "priority", "placeholder", "Select priority", "appendTo", "body", 1, "w-full", 3, "options"], ["header", "Send for Signature", 3, "visibleChange", "visible", "modal"], ["for", "sig-doc-name"], ["pInputText", "", "id", "sig-doc-name", "formControlName", "documentName", "placeholder", "e.g. Purchase Agreement"], ["for", "sig-doc-type"], ["id", "sig-doc-type", "optionLabel", "label", "optionValue", "value", "formControlName", "documentType", "appendTo", "body", 1, "w-full", 3, "options"], ["for", "sig-provider"], ["id", "sig-provider", "optionLabel", "label", "optionValue", "value", "formControlName", "provider", "appendTo", "body", 1, "w-full", 3, "options"], ["for", "sig-signer-name"], [1, "icon-addon", "icon-addon--company"], ["pInputText", "", "id", "sig-signer-name", "formControlName", "signerName", "placeholder", "Full name"], ["for", "sig-signer-email"], ["pInputText", "", "id", "sig-signer-email", "formControlName", "signerEmail", "type", "email", "placeholder", "email@example.com"], ["for", "sig-signer-role"], ["id", "sig-signer-role", "optionLabel", "label", "optionValue", "value", "formControlName", "signerRole", "appendTo", "body", 1, "w-full", 3, "options"], ["header", "Create Alert Rule", 3, "visibleChange", "visible", "modal"], ["for", "alert-client-name"], ["pInputText", "", "id", "alert-client-name", "formControlName", "clientName", "placeholder", "Client full name"], ["for", "alert-client-email"], ["pInputText", "", "id", "alert-client-email", "formControlName", "clientEmail", "type", "email", "placeholder", "email@example.com"], ["for", "alert-frequency"], ["id", "alert-frequency", "optionLabel", "label", "optionValue", "value", "formControlName", "frequency", "appendTo", "body", 1, "w-full", 3, "options"], ["for", "alert-min-price"], [1, "icon-addon", "icon-addon--success"], [1, "pi", "pi-dollar"], ["id", "alert-min-price", "formControlName", "minPrice", "mode", "currency", "currency", "CAD", "placeholder", "Minimum price", 3, "maxFractionDigits"], ["for", "alert-max-price"], [1, "icon-addon", "icon-addon--warning"], ["id", "alert-max-price", "formControlName", "maxPrice", "mode", "currency", "currency", "CAD", "placeholder", "Maximum price", 3, "maxFractionDigits"], ["for", "alert-bedrooms"], [1, "icon-addon", "icon-addon--industry"], [1, "pi", "pi-th-large"], ["id", "alert-bedrooms", "formControlName", "minBedrooms", "placeholder", "Min bedrooms", 3, "min", "max"], ["class", "lightbox-overlay", 3, "click", 4, "ngIf"], [1, "page-content"], [4, "ngIf"], [1, "hero-section"], [1, "hero-left"], [1, "hero-nav"], ["routerLink", "/app/properties", 1, "back-link"], [1, "pi", "pi-arrow-left"], ["class", "edit-link", 3, "routerLink", 4, "ngIf"], [1, "hero-title"], [1, "title-gradient"], [1, "hero-meta"], [1, "hero-badge", 3, "ngClass"], [1, "hero-type"], [1, "pi", "pi-home"], ["class", "hero-mls", 4, "ngIf"], ["class", "hero-location", 4, "ngIf"], ["class", "hero-actions", 4, "ngIf"], [1, "hero-right"], [1, "hero-price"], [1, "hero-price-value"], [1, "hero-price-label"], ["class", "hero-sale-price", 4, "ngIf"], ["class", "live-alerts-section", 4, "ngIf"], ["class", "gallery-section", 4, "ngIf"], [1, "kpi-section"], [1, "kpi-card", "kpi-card--sqft"], [1, "kpi-icon"], [1, "pi", "pi-expand"], [1, "kpi-content"], [1, "kpi-label"], [1, "kpi-value"], [1, "kpi-card", "kpi-card--beds"], [1, "pi", "pi-inbox"], [1, "kpi-card", "kpi-card--baths"], [1, "pi", "pi-sun"], [1, "kpi-card", "kpi-card--age"], [1, "pi", "pi-stopwatch"], [1, "kpi-card", "kpi-card--ppsqft"], [1, "tab-nav"], ["type", "button", 1, "tab-btn", 3, "click"], [1, "pi", "pi-calendar"], ["class", "tab-count", 4, "ngIf"], [1, "pi", "pi-chart-line"], [1, "pi", "pi-list-check"], [1, "pi", "pi-chart-bar"], [1, "pi", "pi-pen-to-square"], [1, "pi", "pi-bell"], ["class", "detail-grid", 4, "ngIf"], ["class", "tab-panel", 4, "ngIf"], [1, "edit-link", 3, "routerLink"], [1, "hero-mls"], [1, "pi", "pi-hashtag"], [1, "hero-location"], [1, "pi", "pi-map-marker"], [1, "hero-actions"], ["type", "button", 1, "action-btn", "action-btn--add", 3, "click"], [1, "action-btn__icon"], [1, "pi", "pi-sync"], ["type", "button", 1, "action-btn", "action-btn--import", 3, "click"], [1, "pi", "pi-calendar-plus"], ["type", "button", 1, "action-btn", "action-btn--export", 3, "click"], [1, "pi", "pi-upload"], [1, "hero-sale-price"], [1, "hero-sale-value"], [1, "hero-sale-label"], [1, "live-alerts-section"], [1, "live-alerts-card"], [1, "live-alerts-header"], [1, "live-dot"], [1, "live-label"], [1, "live-count"], ["type", "button", "title", "Dismiss all", 1, "live-clear", 3, "click"], [1, "pi", "pi-times"], [1, "live-alerts-list"], ["class", "live-alert", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "live-alert", 3, "ngClass"], [1, "alert-icon", 3, "ngClass"], [1, "pi", 3, "ngClass"], [1, "alert-body"], [1, "alert-message"], [1, "alert-time"], ["type", "button", "title", "Dismiss", 1, "alert-dismiss", 3, "click"], [1, "gallery-section"], [1, "gallery-card"], [1, "card-title"], [1, "pi", "pi-images"], ["class", "gallery-grid", 4, "ngIf"], ["class", "virtual-tour", 4, "ngIf"], [1, "gallery-grid"], ["class", "gallery-item", 3, "click", 4, "ngFor", "ngForOf"], [1, "gallery-item", 3, "click"], ["loading", "lazy", 3, "src", "alt"], [1, "gallery-item-overlay"], [1, "pi", "pi-search-plus"], [1, "virtual-tour"], ["target", "_blank", "rel", "noopener noreferrer", 1, "tour-link", 3, "href"], [1, "pi", "pi-video"], [1, "pi", "pi-external-link"], [1, "tab-count"], [1, "detail-grid"], [1, "detail-col"], [1, "detail-card"], [1, "card-shell"], [1, "card-header-detail"], [1, "card-header-copy"], [1, "card-kicker"], [1, "card-badge-stack"], ["class", "mini-badge", 4, "ngIf"], [1, "detail-fields"], [1, "detail-field", "detail-field--span-2", "detail-field--spotlight"], [1, "field-label"], [1, "field-value"], ["class", "detail-field", 4, "ngIf"], [1, "detail-field"], [1, "status-pill", 3, "ngClass"], [1, "pi", "pi-sliders-h"], [1, "detail-fields", "detail-fields--specs"], ["class", "features-text", 4, "ngIf"], ["class", "empty-state-cta", 4, "ngIf"], ["class", "detail-card", 4, "ngIf"], [1, "pricing-hero"], [1, "pricing-hero__item"], [1, "pricing-hero__label"], [1, "pricing-hero__value"], ["class", "pricing-hero__item", 4, "ngIf"], [1, "detail-fields", "detail-fields--pricing"], ["class", "commission-block", 4, "ngIf"], [1, "detail-fields", "detail-fields--links"], [1, "mini-badge", "mini-badge--accent"], [1, "pi", "pi-clock", 2, "font-size", "0.7rem"], [1, "timeline-summary"], [1, "timeline-summary-stat"], [1, "summary-value"], [1, "summary-label"], [1, "status-timeline"], [3, "class", 4, "ngFor", "ngForOf"], ["class", "timeline-empty", 4, "ngIf"], [1, "mini-badge"], [1, "features-text"], [1, "empty-state-cta"], [1, "empty-text"], ["type", "button", "class", "cta-link", 3, "routerLink", 4, "ngIf"], ["type", "button", 1, "cta-link", 3, "routerLink"], [1, "pi", "pi-align-left"], [1, "description-text"], [1, "pricing-hero__value", "pricing-hero__value--success"], [1, "commission-block"], [1, "commission-title"], [1, "pi", "pi-percentage"], [1, "field-value", "field-value--commission"], ["class", "commission-estimate", 4, "ngIf"], [1, "commission-estimate"], [1, "estimate-label"], [1, "estimate-value"], ["class", "field-link", 3, "routerLink", 4, "ngIf"], ["class", "field-value", 4, "ngIf"], [1, "field-link", 3, "routerLink"], [1, "timeline-marker"], [1, "marker-dot"], ["class", "marker-line", 4, "ngIf"], [1, "timeline-card"], [1, "timeline-card-header"], [1, "timeline-label"], [1, "timeline-meta"], [1, "timeline-date"], [1, "timeline-time"], ["class", "timeline-description", 4, "ngIf"], [1, "marker-line"], [1, "timeline-description"], [1, "timeline-empty"], [1, "pi", "pi-info-circle"], [1, "tab-panel"], [1, "card-header-bar"], ["type", "button", "class", "action-btn action-btn--add", 3, "click", 4, "ngIf"], ["class", "showings-table", 4, "ngIf", "ngIfElse"], [1, "pi", "pi-plus"], [1, "showings-table"], [1, "data-table"], ["class", "table-row", 4, "ngFor", "ngForOf"], [1, "table-row"], [1, "visitor-info"], [1, "visitor-name"], ["class", "visitor-email", 4, "ngIf"], [3, "value", "severity"], ["class", "rating-stars", 4, "ngIf"], ["class", "feedback-text", 4, "ngIf"], [1, "visitor-email"], [1, "rating-stars"], ["class", "pi pi-star-fill", 3, "star-active", 4, "ngFor", "ngForOf"], [1, "pi", "pi-star-fill"], [1, "feedback-text"], [1, "empty-state"], [1, "pi", "pi-calendar", "empty-icon"], ["class", "documents-grid", 4, "ngIf", "ngIfElse"], [1, "documents-grid"], ["class", "document-card", 4, "ngFor", "ngForOf"], [1, "document-card"], [1, "doc-icon"], [1, "doc-info"], [1, "doc-name"], [1, "doc-meta"], [1, "doc-category"], ["class", "doc-size", 4, "ngIf"], [1, "doc-date"], ["class", "doc-uploader", 4, "ngIf"], [1, "doc-actions"], ["type", "button", "class", "row-action-btn row-action-btn--delete", "title", "Delete", 3, "click", 4, "ngIf"], [1, "doc-size"], [1, "doc-uploader"], ["type", "button", "title", "Delete", 1, "row-action-btn", "row-action-btn--delete", 3, "click"], [1, "pi", "pi-trash"], [1, "pi", "pi-file", "empty-icon"], ["class", "price-timeline", 4, "ngIf", "ngIfElse"], [1, "price-timeline"], ["class", "price-event", 3, "price-event--up", "price-event--down", 4, "ngFor", "ngForOf"], [1, "price-event"], [1, "price-marker"], [1, "price-dot"], ["class", "price-line", 4, "ngIf"], [1, "price-body"], [1, "price-change-row"], [1, "price-from"], [1, "pi", "pi-arrow-right"], [1, "price-to"], [1, "price-pct"], [1, "price-meta"], [1, "price-date"], ["class", "price-by", 4, "ngIf"], ["class", "price-reason", 4, "ngIf"], [1, "price-line"], [1, "price-by"], [1, "price-reason"], [1, "pi", "pi-chart-line", "empty-icon"], ["class", "activities-list", 4, "ngIf", "ngIfElse"], [1, "activities-list"], ["class", "activity-item", 3, "activity-item--completed", 4, "ngFor", "ngForOf"], [1, "activity-item"], [1, "activity-icon", 3, "ngClass"], [1, "activity-body"], [1, "activity-header"], [1, "activity-subject"], [1, "activity-priority", 3, "value", "severity"], [1, "activity-meta"], [1, "activity-type"], ["class", "activity-date", 4, "ngIf"], [1, "activity-status"], ["class", "activity-description", 4, "ngIf"], ["class", "activity-actions", 4, "ngIf"], [1, "activity-date"], [1, "activity-description"], [1, "activity-actions"], ["type", "button", "title", "Mark Complete", 1, "row-action-btn", "row-action-btn--complete", 3, "click"], [1, "pi", "pi-check"], [1, "pi", "pi-list-check", "empty-icon"], ["type", "button", 1, "action-btn", "action-btn--refresh", 3, "click"], [1, "pi", "pi-refresh"], ["class", "cma-loading", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], [1, "cma-loading"], ["width", "100%", "height", "5rem", "styleClass", "mb-3"], ["width", "100%", "height", "12rem"], [1, "cma-summary"], [1, "cma-kpi"], [1, "cma-kpi__label"], [1, "cma-kpi__value", "cma-kpi__value--primary"], [1, "cma-kpi__value"], [1, "cma-table-wrap"], ["styleClass", "p-datatable-sm", "responsiveLayout", "scroll", 3, "value", "rows"], ["pTemplate", "header"], ["pTemplate", "body"], ["pTemplate", "emptymessage"], [1, "comp-address"], ["class", "comp-city", 4, "ngIf"], [3, "value", "severity", "rounded"], [1, "comp-city"], ["colspan", "10", 1, "text-center", "p-4"], [1, "pi", "pi-chart-bar", "empty-icon"], ["class", "esign-list", 4, "ngIf", "ngIfElse"], ["header", "Void Envelope", 3, "visibleChange", "visible", "modal", "closable"], [1, "void-dialog-text"], [1, "form-field", 2, "margin-top", "1rem"], ["for", "void-reason"], ["pInputText", "", "id", "void-reason", "placeholder", "Enter reason for voiding", 2, "width", "100%", 3, "ngModelChange", "ngModel"], [1, "esign-list"], ["class", "esign-card", 4, "ngFor", "ngForOf"], [1, "esign-card"], [1, "esign-card__header"], [1, "esign-doc-info"], [1, "pi", "pi-file-pdf", "esign-doc-icon"], [1, "esign-doc-name"], [1, "esign-doc-type"], [1, "esign-card__meta"], [1, "pi", "pi-building"], [1, "esign-signers"], [1, "esign-signers__title"], ["class", "signer-row", 4, "ngFor", "ngForOf"], ["class", "esign-card__actions", 4, "ngIf"], [1, "pi", "pi-send"], [1, "pi", "pi-check-circle"], [1, "signer-row"], [1, "signer-info"], [1, "signer-name"], [1, "signer-email"], [1, "signer-role"], [1, "signer-status", 3, "value", "severity", "rounded"], [1, "esign-card__actions"], ["type", "button", "class", "row-action-btn row-action-btn--complete", "title", "Send via DocuSign", 3, "disabled", "click", 4, "ngIf"], ["type", "button", "class", "row-action-btn row-action-btn--view", "title", "Refresh Status", 3, "disabled", "click", 4, "ngIf"], ["type", "button", "class", "row-action-btn row-action-btn--delete", "title", "Void Envelope", 3, "disabled", "click", 4, "ngIf"], ["type", "button", "class", "row-action-btn row-action-btn--view", "title", "Download Signed Document", 3, "disabled", "click", 4, "ngIf"], ["type", "button", "title", "Send via DocuSign", 1, "row-action-btn", "row-action-btn--complete", 3, "click", "disabled"], ["type", "button", "title", "Refresh Status", 1, "row-action-btn", "row-action-btn--view", 3, "click", "disabled"], ["type", "button", "title", "Void Envelope", 1, "row-action-btn", "row-action-btn--delete", 3, "click", "disabled"], [1, "pi", "pi-ban"], ["type", "button", "title", "Download Signed Document", 1, "row-action-btn", "row-action-btn--view", 3, "click", "disabled"], [1, "pi", "pi-download"], [1, "pi", "pi-pen-to-square", "empty-icon"], ["type", "button", 1, "action-btn", "action-btn--back", 3, "click"], ["type", "button", 1, "action-btn", "action-btn--delete", 3, "click", "disabled"], ["class", "alert-rules-list", 4, "ngIf", "ngIfElse"], ["class", "detail-card mt-4", 4, "ngIf"], [1, "alert-rules-list"], ["class", "alert-rule-card", 3, "alert-rule-card--inactive", 4, "ngFor", "ngForOf"], [1, "alert-rule-card"], [1, "alert-rule__header"], [1, "alert-rule__client"], [1, "alert-rule__avatar"], [3, "src", "alt", "title"], [1, "alert-rule__email"], [1, "alert-rule__toggle"], ["type", "button", "title", "Toggle alert", 1, "toggle-btn", 3, "click"], [1, "toggle-btn__slider"], [1, "alert-rule__criteria"], ["class", "alert-rule__footer", 4, "ngIf"], [1, "alert-rule__footer"], [1, "alert-rule__last-notified"], [1, "pi", "pi-bell", "empty-icon"], [1, "detail-card", "mt-4"], [1, "notification-list"], ["class", "notification-item", 4, "ngFor", "ngForOf"], [1, "notification-item"], [1, "notification-icon"], [1, "notification-body"], [1, "notification-meta"], [1, "notification-date"], [1, "page-loading"], ["width", "60%", "height", "2rem", "styleClass", "mb-3"], ["width", "40%", "height", "1.5rem", "styleClass", "mb-4"], [1, "kpi-skeleton"], ["width", "100%", "height", "5rem", 4, "ngFor", "ngForOf"], [1, "grid-skeleton"], ["width", "100%", "height", "20rem"], ["width", "100%", "height", "5rem"], [1, "select-option"], ["class", "select-option", 4, "ngIf"], ["type", "button", 1, "action-btn", "action-btn--settings", 3, "click"], [1, "lightbox-overlay", 3, "click"], ["title", "Close (Esc)", 1, "lightbox-close", 3, "click"], ["class", "lightbox-nav lightbox-nav--prev", "title", "Previous (\u2190)", 3, "click", 4, "ngIf"], [1, "lightbox-content", 3, "click"], [1, "lightbox-image", 3, "src", "alt"], [1, "lightbox-counter"], ["class", "lightbox-nav lightbox-nav--next", "title", "Next (\u2192)", 3, "click", 4, "ngIf"], ["title", "Previous (\u2190)", 1, "lightbox-nav", "lightbox-nav--prev", 3, "click"], [1, "pi", "pi-chevron-left"], ["title", "Next (\u2192)", 1, "lightbox-nav", "lightbox-nav--next", 3, "click"], [1, "pi", "pi-chevron-right"]], template: function PropertyDetailPage_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 7)(1, "div", 8);
            i0.ɵɵelement(2, "div", 9)(3, "div", 10)(4, "div", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, PropertyDetailPage_div_5_Template, 2, 1, "div", 12)(6, PropertyDetailPage_ng_template_6_Template, 8, 2, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "p-dialog", 13);
            i0.ɵɵlistener("visibleChange", function PropertyDetailPage_Template_p_dialog_visibleChange_8_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.showStatusDialog.set($event)); });
            i0.ɵɵelementStart(9, "div", 14)(10, "div", 15)(11, "label", 16);
            i0.ɵɵtext(12, "New Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "p-select", 17);
            i0.ɵɵlistener("ngModelChange", function PropertyDetailPage_Template_p_select_ngModelChange_13_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.selectedStatus.set($event)); });
            i0.ɵɵtemplate(14, PropertyDetailPage_ng_template_14_Template, 4, 2, "ng-template", 18)(15, PropertyDetailPage_ng_template_15_Template, 1, 1, "ng-template", 19);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(16, PropertyDetailPage_ng_template_16_Template, 8, 0, "ng-template", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "p-dialog", 21);
            i0.ɵɵlistener("visibleChange", function PropertyDetailPage_Template_p_dialog_visibleChange_17_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.showShowingDialog.set($event)); });
            i0.ɵɵelementStart(18, "form", 22)(19, "div", 15)(20, "label", 23);
            i0.ɵɵtext(21, "Visitor Name ");
            i0.ɵɵelementStart(22, "span", 24);
            i0.ɵɵtext(23, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(24, "p-inputgroup")(25, "p-inputgroup-addon", 25);
            i0.ɵɵelement(26, "i", 26);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(27, "input", 27);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "div", 15)(29, "label", 28);
            i0.ɵɵtext(30, "Email");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "p-inputgroup")(32, "p-inputgroup-addon", 29);
            i0.ɵɵelement(33, "i", 30);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(34, "input", 31);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(35, "div", 15)(36, "label", 32);
            i0.ɵɵtext(37, "Phone");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "p-inputgroup")(39, "p-inputgroup-addon", 33);
            i0.ɵɵelement(40, "i", 34);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(41, "input", 35);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(42, "div", 15)(43, "label", 36);
            i0.ɵɵtext(44, "Date & Time ");
            i0.ɵɵelementStart(45, "span", 24);
            i0.ɵɵtext(46, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(47, "input", 37);
            i0.ɵɵlistener("ngModelChange", function PropertyDetailPage_Template_input_ngModelChange_47_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onShowingScheduledAtChange($event)); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(48, "div", 15)(49, "label", 38);
            i0.ɵɵtext(50, "Duration (min)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "p-inputgroup")(52, "p-inputgroup-addon", 39);
            i0.ɵɵelement(53, "i", 40);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(54, "input", 41);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(55, PropertyDetailPage_ng_template_55_Template, 8, 0, "ng-template", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(56, "p-dialog", 42);
            i0.ɵɵlistener("visibleChange", function PropertyDetailPage_Template_p_dialog_visibleChange_56_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.showDocumentDialog.set($event)); });
            i0.ɵɵelementStart(57, "form", 22)(58, "div", 15)(59, "label", 43);
            i0.ɵɵtext(60, "File Name ");
            i0.ɵɵelementStart(61, "span", 24);
            i0.ɵɵtext(62, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(63, "p-inputgroup")(64, "p-inputgroup-addon", 25);
            i0.ɵɵelement(65, "i", 44);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(66, "input", 45);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(67, "div", 15)(68, "label", 46);
            i0.ɵɵtext(69, "Category");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(70, "p-select", 47);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(71, "div", 15)(72, "label", 48);
            i0.ɵɵtext(73, "File URL");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(74, "p-inputgroup")(75, "p-inputgroup-addon", 49);
            i0.ɵɵelement(76, "i", 50);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(77, "input", 51);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(78, PropertyDetailPage_ng_template_78_Template, 8, 0, "ng-template", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(79, "p-dialog", 52);
            i0.ɵɵlistener("visibleChange", function PropertyDetailPage_Template_p_dialog_visibleChange_79_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.showActivityDialog.set($event)); });
            i0.ɵɵelementStart(80, "form", 22)(81, "div", 15)(82, "label", 53);
            i0.ɵɵtext(83, "Type");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(84, "p-select", 54);
            i0.ɵɵtemplate(85, PropertyDetailPage_ng_template_85_Template, 4, 2, "ng-template", 18)(86, PropertyDetailPage_ng_template_86_Template, 1, 1, "ng-template", 19);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(87, "div", 15)(88, "label", 55);
            i0.ɵɵtext(89, "Subject ");
            i0.ɵɵelementStart(90, "span", 24);
            i0.ɵɵtext(91, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(92, "p-inputgroup")(93, "p-inputgroup-addon", 25);
            i0.ɵɵelement(94, "i", 56);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(95, "input", 57);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(96, "div", 15)(97, "label", 58);
            i0.ɵɵtext(98, "Description");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(99, "textarea", 59);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(100, "div", 15)(101, "label", 60);
            i0.ɵɵtext(102, "Due Date");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(103, "p-datepicker", 61);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(104, "div", 15)(105, "label", 62);
            i0.ɵɵtext(106, "Priority");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(107, "p-select", 63);
            i0.ɵɵtemplate(108, PropertyDetailPage_ng_template_108_Template, 4, 2, "ng-template", 18)(109, PropertyDetailPage_ng_template_109_Template, 1, 1, "ng-template", 19);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(110, PropertyDetailPage_ng_template_110_Template, 8, 0, "ng-template", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(111, "p-dialog", 64);
            i0.ɵɵlistener("visibleChange", function PropertyDetailPage_Template_p_dialog_visibleChange_111_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.showSignatureDialog.set($event)); });
            i0.ɵɵelementStart(112, "form", 22)(113, "div", 15)(114, "label", 65);
            i0.ɵɵtext(115, "Document Name ");
            i0.ɵɵelementStart(116, "span", 24);
            i0.ɵɵtext(117, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(118, "p-inputgroup")(119, "p-inputgroup-addon", 25);
            i0.ɵɵelement(120, "i", 44);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(121, "input", 66);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(122, "div", 15)(123, "label", 67);
            i0.ɵɵtext(124, "Document Type");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(125, "p-select", 68);
            i0.ɵɵtemplate(126, PropertyDetailPage_ng_template_126_Template, 4, 2, "ng-template", 18)(127, PropertyDetailPage_ng_template_127_Template, 1, 1, "ng-template", 19);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(128, "div", 15)(129, "label", 69);
            i0.ɵɵtext(130, "Provider");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(131, "p-select", 70);
            i0.ɵɵtemplate(132, PropertyDetailPage_ng_template_132_Template, 4, 2, "ng-template", 18)(133, PropertyDetailPage_ng_template_133_Template, 1, 1, "ng-template", 19);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(134, "div", 15)(135, "label", 71);
            i0.ɵɵtext(136, "Signer Name ");
            i0.ɵɵelementStart(137, "span", 24);
            i0.ɵɵtext(138, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(139, "p-inputgroup")(140, "p-inputgroup-addon", 72);
            i0.ɵɵelement(141, "i", 26);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(142, "input", 73);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(143, "div", 15)(144, "label", 74);
            i0.ɵɵtext(145, "Signer Email ");
            i0.ɵɵelementStart(146, "span", 24);
            i0.ɵɵtext(147, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(148, "p-inputgroup")(149, "p-inputgroup-addon", 29);
            i0.ɵɵelement(150, "i", 30);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(151, "input", 75);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(152, "div", 15)(153, "label", 76);
            i0.ɵɵtext(154, "Role");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(155, "p-select", 77);
            i0.ɵɵtemplate(156, PropertyDetailPage_ng_template_156_Template, 4, 2, "ng-template", 18)(157, PropertyDetailPage_ng_template_157_Template, 1, 1, "ng-template", 19);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(158, PropertyDetailPage_ng_template_158_Template, 8, 0, "ng-template", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(159, "p-dialog", 78);
            i0.ɵɵlistener("visibleChange", function PropertyDetailPage_Template_p_dialog_visibleChange_159_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.showAlertDialog.set($event)); });
            i0.ɵɵelementStart(160, "form", 22)(161, "div", 15)(162, "label", 79);
            i0.ɵɵtext(163, "Client Name ");
            i0.ɵɵelementStart(164, "span", 24);
            i0.ɵɵtext(165, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(166, "p-inputgroup")(167, "p-inputgroup-addon", 72);
            i0.ɵɵelement(168, "i", 26);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(169, "input", 80);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(170, "div", 15)(171, "label", 81);
            i0.ɵɵtext(172, "Client Email ");
            i0.ɵɵelementStart(173, "span", 24);
            i0.ɵɵtext(174, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(175, "p-inputgroup")(176, "p-inputgroup-addon", 29);
            i0.ɵɵelement(177, "i", 30);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(178, "input", 82);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(179, "div", 15)(180, "label", 83);
            i0.ɵɵtext(181, "Frequency");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(182, "p-select", 84);
            i0.ɵɵtemplate(183, PropertyDetailPage_ng_template_183_Template, 4, 2, "ng-template", 18)(184, PropertyDetailPage_ng_template_184_Template, 1, 1, "ng-template", 19);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(185, "div", 15)(186, "label", 85);
            i0.ɵɵtext(187, "Min Price");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(188, "p-inputgroup")(189, "p-inputgroup-addon", 86);
            i0.ɵɵelement(190, "i", 87);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(191, "p-inputNumber", 88);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(192, "div", 15)(193, "label", 89);
            i0.ɵɵtext(194, "Max Price");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(195, "p-inputgroup")(196, "p-inputgroup-addon", 90);
            i0.ɵɵelement(197, "i", 87);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(198, "p-inputNumber", 91);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(199, "div", 15)(200, "label", 92);
            i0.ɵɵtext(201, "Min Bedrooms");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(202, "p-inputgroup")(203, "p-inputgroup-addon", 93);
            i0.ɵɵelement(204, "i", 94);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(205, "p-inputNumber", 95);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(206, PropertyDetailPage_ng_template_206_Template, 8, 0, "ng-template", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(207, PropertyDetailPage_div_207_Template, 9, 6, "div", 96);
        } if (rf & 2) {
            const pageLoading_r76 = i0.ɵɵreference(7);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", !ctx.loading())("ngIfElse", pageLoading_r76);
            i0.ɵɵadvance(3);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(48, _c0));
            i0.ɵɵproperty("visible", ctx.showStatusDialog())("modal", true);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("options", ctx.statusOptions)("ngModel", ctx.selectedStatus());
            i0.ɵɵadvance(4);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(49, _c1));
            i0.ɵɵproperty("visible", ctx.showShowingDialog())("modal", true);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.showingForm);
            i0.ɵɵadvance(29);
            i0.ɵɵproperty("ngModel", ctx.showingScheduledAtLocal)("ngModelOptions", i0.ɵɵpureFunction0(50, _c2));
            i0.ɵɵadvance(9);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(51, _c1));
            i0.ɵɵproperty("visible", ctx.showDocumentDialog())("modal", true);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.documentForm);
            i0.ɵɵadvance(13);
            i0.ɵɵproperty("options", ctx.documentCategories);
            i0.ɵɵadvance(9);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(52, _c1));
            i0.ɵɵproperty("visible", ctx.showActivityDialog())("modal", true);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.activityForm);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.activityTypes);
            i0.ɵɵadvance(19);
            i0.ɵɵproperty("showTime", false);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.activityPriorities);
            i0.ɵɵadvance(4);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(53, _c3));
            i0.ɵɵproperty("visible", ctx.showSignatureDialog())("modal", true);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.signatureForm);
            i0.ɵɵadvance(13);
            i0.ɵɵproperty("options", ctx.signatureDocTypes);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("options", ctx.signatureProviders);
            i0.ɵɵadvance(24);
            i0.ɵɵproperty("options", ctx.signerRoles);
            i0.ɵɵadvance(4);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(54, _c3));
            i0.ɵɵproperty("visible", ctx.showAlertDialog())("modal", true);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.alertForm);
            i0.ɵɵadvance(22);
            i0.ɵɵproperty("options", ctx.alertFrequencies);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("maxFractionDigits", 0);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("maxFractionDigits", 0);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("min", 0)("max", 10);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.lightboxOpen());
        } }, dependencies: [CommonModule, i1.NgClass, i1.NgForOf, i1.NgIf, RouterModule, i2.RouterLink, TooltipModule,
            SkeletonModule, i3.Skeleton, i4.PrimeTemplate, DialogModule, i5.Dialog, ReactiveFormsModule, i6.ɵNgNoValidate, i6.DefaultValueAccessor, i6.NumberValueAccessor, i6.NgControlStatus, i6.NgControlStatusGroup, i6.FormGroupDirective, i6.FormControlName, FormsModule, i6.NgModel, InputTextModule, i7.InputText, InputNumberModule, i8.InputNumber, TextareaModule, i9.Textarea, SelectModule, i10.Select, DatePickerModule, i11.DatePicker, InputGroupModule, i12.InputGroup, InputGroupAddonModule, i13.InputGroupAddon, TagModule, i14.Tag, TableModule, i15.Table, BreadcrumbsComponent, i1.DecimalPipe, i1.DatePipe], styles: ["@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   PAGE[_ngcontent-%COMP%]   CONTAINER\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.page-container[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100vh;\n  padding: $space-5 $space-6;\n  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 50%, #d8dde8 100%);\n  overflow-x: hidden;\n\n  @media (max-width: 768px) {\n    padding: $space-3;\n  }\n}\n\n.bg-orbs[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  z-index: 0;\n  overflow: hidden;\n}\n\n.orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(60px);\n  opacity: 0.4;\n  animation: _ngcontent-%COMP%_orb-float 20s ease-in-out infinite;\n\n  &.orb-1 { width: 600px; height: 600px; background: $primary-gradient; top: -200px; right: -100px; }\n  &.orb-2 { width: 400px; height: 400px; background: $cyan-gradient; bottom: 10%; left: -100px; animation-delay: -7s; }\n  &.orb-3 { width: 300px; height: 300px; background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); top: 40%; right: 20%; animation-delay: -14s; }\n}\n\n.page-content[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: 1400px;\n  margin: 0 auto;\n  animation: fade-in-up 0.5s ease-out;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   HERO[_ngcontent-%COMP%]   SECTION\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.hero-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: $space-6;\n  margin-bottom: $space-5;\n  animation: fade-in-up 0.5s ease-out;\n\n  @media (max-width: 1024px) {\n    grid-template-columns: 1fr;\n    gap: $space-4;\n  }\n}\n\n.hero-left[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.hero-nav[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  margin-bottom: $space-1;\n}\n\n.back-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $gray-500;\n  text-decoration: none;\n  transition: color 200ms;\n\n  &:hover { color: $primary; }\n\n  i { font-size: $font-size-sm; }\n}\n\n.edit-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $primary;\n  text-decoration: none;\n  padding: $space-1 $space-2;\n  background: rgba($primary, 0.08);\n  border-radius: $radius-md;\n  transition: all 200ms;\n\n  &:hover {\n    background: rgba($primary, 0.14);\n    transform: translateY(-1px);\n  }\n\n  i { font-size: $font-size-sm; }\n}\n\n.hero-title[_ngcontent-%COMP%] {\n  font-size: $font-size-4xl;\n  font-weight: 800;\n  letter-spacing: -0.5px;\n  line-height: 1.1;\n  margin: 0 0 $space-1;\n\n  .title-gradient {\n    background: $primary-gradient;\n    background-size: 200% auto;\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n    animation: _ngcontent-%COMP%_gradient-shift 4s ease-in-out infinite;\n  }\n\n  @media (max-width: 768px) {\n    font-size: $font-size-2xl;\n  }\n}\n\n.hero-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  flex-wrap: wrap;\n}\n\n.hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: $space-1 $space-3;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  border-radius: $radius-full;\n  text-transform: capitalize;\n\n  &.status--active { background: rgba(#22c55e, 0.15); color: color.adjust(#22c55e, $lightness: -15%); }\n  &.status--conditional { background: rgba(#f59e0b, 0.15); color: color.adjust(#f59e0b, $lightness: -15%); }\n  &.status--sold { background: rgba(#3b82f6, 0.15); color: color.adjust(#3b82f6, $lightness: -10%); }\n  &.status--draft { background: rgba($gray-500, 0.15); color: $gray-600; }\n  &.status--inactive { background: rgba(#ef4444, 0.15); color: color.adjust(#ef4444, $lightness: -10%); }\n  &.status--default { background: rgba($gray-400, 0.12); color: $gray-600; }\n}\n\n.hero-type[_ngcontent-%COMP%], \n.hero-mls[_ngcontent-%COMP%], \n.hero-location[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-sm;\n  color: $gray-500;\n\n  i { font-size: $font-size-sm; }\n}\n\n.hero-right[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: $space-3;\n  animation: _ngcontent-%COMP%_slide-in-right 0.6s ease-out 0.2s both;\n\n  @media (max-width: 1024px) {\n    flex-direction: row;\n    align-items: center;\n    gap: $space-6;\n  }\n}\n\n.hero-price[_ngcontent-%COMP%], \n.hero-sale-price[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 2px;\n\n  @media (max-width: 1024px) {\n    align-items: flex-start;\n  }\n}\n\n.hero-price-value[_ngcontent-%COMP%] {\n  font-size: $font-size-3xl;\n  font-weight: 800;\n  color: $gray-800;\n\n  @media (max-width: 768px) {\n    font-size: $font-size-2xl;\n  }\n}\n\n.hero-price-label[_ngcontent-%COMP%], \n.hero-sale-label[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: $gray-500;\n}\n\n.hero-sale-value[_ngcontent-%COMP%] {\n  font-size: $font-size-2xl;\n  font-weight: 700;\n  color: #22c55e;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   KPI[_ngcontent-%COMP%]   CARDS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.kpi-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: $space-3;\n  margin-bottom: $space-5;\n  animation: fade-in-up 0.5s ease-out 0.15s both;\n\n  @media (max-width: 1200px) { grid-template-columns: repeat(3, 1fr); }\n  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }\n  @media (max-width: 480px) { grid-template-columns: 1fr; }\n}\n\n.kpi-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: #ffffff;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: $radius-lg;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(0, 0, 0, 0.04);\n  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  animation: fade-in-up 0.5s ease-out backwards;\n\n  @for $i from 1 through 5 {\n    &:nth-child(#{$i}) { animation-delay: #{0.1 + $i * 0.05}s; }\n  }\n\n  &:hover {\n    transform: translateY(-4px);\n    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.05);\n\n    .kpi-icon { transform: scale(1.1) rotate(5deg); }\n  }\n}\n\n.kpi-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: $radius-md;\n  font-size: $font-size-lg;\n  color: white;\n  flex-shrink: 0;\n  transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1);\n\n  .kpi-card--sqft & { background: $primary-gradient; }\n  .kpi-card--beds & { background: $cyan-gradient; }\n  .kpi-card--baths & { background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); }\n  .kpi-card--age & { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }\n  .kpi-card--ppsqft & { background: $success-gradient; }\n}\n\n.kpi-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.kpi-label[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.kpi-value[_ngcontent-%COMP%] {\n  font-size: $font-size-2xl;\n  font-weight: 700;\n  color: $gray-800;\n\n  &--muted { color: $gray-400; }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   DETAIL[_ngcontent-%COMP%]   GRID\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.detail-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.2fr 0.8fr;\n  gap: $space-4;\n  animation: fade-in-up 0.5s ease-out 0.3s both;\n\n  @media (max-width: 1024px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.detail-col[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-4;\n}\n\n.detail-card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: $radius-xl;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 6px 20px rgba(0, 0, 0, 0.04);\n  padding: $space-4 $space-5;\n  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &:hover {\n    transform: translateY(-3px);\n    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.1), 0 6px 16px rgba(0, 0, 0, 0.05);\n  }\n\n  @media (max-width: 768px) {\n    padding: $space-3 $space-4;\n  }\n}\n\n.card-shell[_ngcontent-%COMP%] {\n  margin-bottom: $space-4;\n}\n\n.card-header-detail[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: $space-3;\n  padding-bottom: $space-3;\n  border-bottom: 1px solid rgba(15, 23, 42, 0.08);\n\n  @media (max-width: 768px) {\n    flex-direction: column;\n  }\n}\n\n.card-header-copy[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n}\n\n.card-kicker[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  width: fit-content;\n  padding: 0.35rem 0.7rem;\n  border-radius: $radius-full;\n  background: rgba(14, 116, 144, 0.1);\n  color: #0f766e;\n  font-size: $font-size-xs;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-lg;\n  font-weight: 600;\n  color: $gray-800;\n  margin: 0;\n\n  i {\n    font-size: $font-size-base;\n    color: #06b6d4;\n  }\n}\n\n.card-subtitle[_ngcontent-%COMP%] {\n  margin: 0;\n  max-width: 46rem;\n  font-size: $font-size-sm;\n  line-height: 1.55;\n  color: $gray-500;\n}\n\n.card-badge-stack[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: $space-2;\n\n  @media (max-width: 768px) {\n    justify-content: flex-start;\n  }\n}\n\n.mini-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.45rem 0.8rem;\n  border-radius: $radius-full;\n  background: rgba(102, 126, 234, 0.08);\n  border: 1px solid rgba(102, 126, 234, 0.14);\n  color: #4f46e5;\n  font-size: $font-size-xs;\n  font-weight: 700;\n  letter-spacing: 0.02em;\n\n  &--accent {\n    background: rgba(34, 197, 94, 0.1);\n    border-color: rgba(34, 197, 94, 0.18);\n    color: #15803d;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   DETAIL[_ngcontent-%COMP%]   FIELDS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.detail-fields[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: $space-3;\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.detail-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n  min-height: 5rem;\n  padding: $space-3;\n  border-radius: $radius-lg;\n  background:\n    linear-gradient(180deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.46));\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);\n\n  &--span-2 {\n    grid-column: span 2;\n\n    @media (max-width: 600px) {\n      grid-column: span 1;\n    }\n  }\n\n  &--spotlight {\n    background: linear-gradient(135deg, rgba(102, 126, 234, 0.12), rgba(6, 182, 212, 0.08));\n    border-color: rgba(102, 126, 234, 0.2);\n  }\n}\n\n.field-label[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: $gray-500;\n}\n\n.field-value[_ngcontent-%COMP%] {\n  font-size: $font-size-md;\n  font-weight: 600;\n  color: $gray-900;\n  line-height: 1.4;\n\n  &--price {\n    font-size: $font-size-lg;\n    font-weight: 700;\n    color: $gray-900;\n  }\n}\n\n.field-link[_ngcontent-%COMP%] {\n  font-size: $font-size-md;\n  font-weight: 600;\n  color: #667eea;\n  text-decoration: none;\n  transition: color 200ms;\n\n  &:hover {\n    color: #764ba2;\n    text-decoration: underline;\n  }\n}\n\n.features-text[_ngcontent-%COMP%] {\n  padding: $space-4;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n  margin-top: $space-2;\n  border-radius: $radius-lg;\n  background: rgba(255, 255, 255, 0.4);\n\n  .field-label {\n    display: block;\n    margin-bottom: $space-1;\n  }\n\n  .field-value {\n    white-space: pre-line;\n    line-height: 1.6;\n  }\n}\n\n.detail-fields--pricing[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.detail-fields--links[_ngcontent-%COMP%], \n.detail-fields--specs[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.pricing-hero[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: $space-3;\n  margin-bottom: $space-3;\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.pricing-hero__item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n  padding: $space-3 $space-4;\n  border-radius: $radius-xl;\n  background: linear-gradient(135deg, rgba(102, 126, 234, 0.12), rgba(6, 182, 212, 0.09));\n  border: 1px solid rgba(102, 126, 234, 0.16);\n}\n\n.pricing-hero__label[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: $gray-500;\n}\n\n.pricing-hero__value[_ngcontent-%COMP%] {\n  font-size: clamp(1.4rem, 2.6vw, 2rem);\n  line-height: 1.1;\n  font-weight: 800;\n  color: #1f2937;\n\n  &--success {\n    color: #15803d;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   STATUS[_ngcontent-%COMP%]   PILL\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.status-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 2px $space-2;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  border-radius: $radius-full;\n\n  &.status--active { background: rgba(#22c55e, 0.15); color: color.adjust(#22c55e, $lightness: -15%); }\n  &.status--conditional { background: rgba(#f59e0b, 0.15); color: color.adjust(#f59e0b, $lightness: -15%); }\n  &.status--sold { background: rgba(#3b82f6, 0.15); color: color.adjust(#3b82f6, $lightness: -10%); }\n  &.status--draft { background: rgba($gray-500, 0.15); color: $gray-600; }\n  &.status--inactive { background: rgba(#ef4444, 0.15); color: color.adjust(#ef4444, $lightness: -10%); }\n  &.status--default { background: rgba($gray-400, 0.12); color: $gray-600; }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   DESCRIPTION\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.description-text[_ngcontent-%COMP%] {\n  font-size: $font-size-md;\n  color: $gray-700;\n  line-height: 1.7;\n  margin: 0;\n  white-space: pre-wrap;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   EMPTY[_ngcontent-%COMP%]   STATE[_ngcontent-%COMP%]   CTA\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.empty-state-cta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: $space-4;\n  text-align: center;\n}\n\n.empty-text[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $gray-400;\n  margin: 0 0 $space-2;\n}\n\n.cta-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  padding: $space-1 $space-3;\n  background: rgba($primary, 0.08);\n  border: none;\n  border-radius: $radius-md;\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $primary;\n  cursor: pointer;\n  transition: all 200ms;\n  text-decoration: none;\n\n  &:hover {\n    background: rgba($primary, 0.14);\n    transform: translateY(-1px);\n  }\n\n  i { font-size: $font-size-sm; }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   LIVE[_ngcontent-%COMP%]   ALERTS[_ngcontent-%COMP%]   (X9 \u2013 SignalR)\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.live-alerts-section[_ngcontent-%COMP%] {\n  margin-bottom: $space-4;\n  animation: fade-in-up 0.4s ease-out;\n}\n\n.live-alerts-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.9);\n  backdrop-filter: blur(20px);\n  border: 1px solid rgba(59, 130, 246, 0.2);\n  border-radius: $radius-lg;\n  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.08);\n  overflow: hidden;\n}\n\n.live-alerts-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n  background: linear-gradient(135deg, rgba(59, 130, 246, 0.06) 0%, rgba(99, 102, 241, 0.04) 100%);\n}\n\n.live-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  background: #22c55e;\n  border-radius: 50%;\n  animation: pulse-glow 2s ease-in-out infinite;\n}\n\n.live-label[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: #3b82f6;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.live-count[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.12);\n  color: #3b82f6;\n  font-size: 0.75rem;\n  font-weight: 700;\n  padding: 1px 8px;\n  border-radius: $radius-full;\n}\n\n.live-clear[_ngcontent-%COMP%] {\n  margin-left: auto;\n  background: none;\n  border: none;\n  color: $gray-400;\n  cursor: pointer;\n  padding: $space-1;\n  border-radius: $radius-sm;\n  transition: all 200ms;\n\n  &:hover {\n    color: $gray-600;\n    background: rgba(0, 0, 0, 0.05);\n  }\n}\n\n.live-alerts-list[_ngcontent-%COMP%] {\n  max-height: 200px;\n  overflow-y: auto;\n}\n\n.live-alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-2 $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.03);\n  animation: fade-in-up 0.3s ease-out;\n  transition: background 150ms;\n\n  &:last-child { border-bottom: none; }\n  &:hover { background: rgba(0, 0, 0, 0.02); }\n}\n\n.alert-icon[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: $radius-sm;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: $font-size-sm;\n  color: white;\n  flex-shrink: 0;\n\n  &--price { background: linear-gradient(135deg, #22c55e, #16a34a); }\n  &--showing { background: linear-gradient(135deg, #3b82f6, #2563eb); }\n  &--status { background: linear-gradient(135deg, #a855f7, #9333ea); }\n  &--document { background: linear-gradient(135deg, #f59e0b, #d97706); }\n  &--activity { background: linear-gradient(135deg, #06b6d4, #0891b2); }\n  &--info { background: linear-gradient(135deg, #6366f1, #4f46e5); }\n}\n\n.alert-body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n\n.alert-message[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $gray-700;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.alert-time[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-400;\n}\n\n.alert-dismiss[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: $gray-300;\n  cursor: pointer;\n  padding: 4px;\n  border-radius: $radius-sm;\n  opacity: 0;\n  transition: all 200ms;\n  flex-shrink: 0;\n\n  .live-alert:hover & { opacity: 1; }\n\n  &:hover {\n    color: $gray-600;\n    background: rgba(0, 0, 0, 0.05);\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   PHOTO[_ngcontent-%COMP%]   GALLERY\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.gallery-section[_ngcontent-%COMP%] {\n  margin-bottom: $space-5;\n  animation: fade-in-up 0.5s ease-out 0.15s both;\n}\n\n.gallery-card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: $radius-2xl;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 6px 20px rgba(0, 0, 0, 0.04);\n  padding: $space-4;\n  overflow: hidden;\n  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &:hover {\n    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.1), 0 6px 16px rgba(0, 0, 0, 0.05);\n  }\n}\n\n.gallery-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: $space-3;\n  margin-top: $space-3;\n\n  @media (max-width: 600px) {\n    grid-template-columns: repeat(2, 1fr);\n    gap: $space-2;\n  }\n}\n\n.gallery-item[_ngcontent-%COMP%] {\n  position: relative;\n  border-radius: $radius-lg;\n  overflow: hidden;\n  aspect-ratio: 4 / 3;\n  background: $gray-100;\n  cursor: pointer;\n  transition: transform 250ms, box-shadow 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n\n    .gallery-item-overlay {\n      opacity: 1;\n    }\n  }\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    display: block;\n  }\n}\n\n.gallery-item-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(0, 0, 0, 0.3);\n  opacity: 0;\n  transition: opacity 250ms;\n\n  i {\n    color: #fff;\n    font-size: 1.5rem;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550[_ngcontent-%COMP%]   PHOTO[_ngcontent-%COMP%]   LIGHTBOX[_ngcontent-%COMP%]   \u2550\u2550\u2550\n.lightbox-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 10000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(0, 0, 0, 0.92);\n  animation: _ngcontent-%COMP%_lightbox-fade-in 200ms ease-out;\n}\n\n.lightbox-close[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 1rem;\n  right: 1rem;\n  z-index: 2;\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(255, 255, 255, 0.12);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 50%;\n  color: #fff;\n  font-size: 1.25rem;\n  cursor: pointer;\n  transition: background 200ms, transform 200ms;\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.25);\n    transform: scale(1.1);\n  }\n}\n\n.lightbox-nav[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  z-index: 2;\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 50%;\n  color: #fff;\n  font-size: 1.25rem;\n  cursor: pointer;\n  transition: background 200ms, transform 200ms;\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.25);\n    transform: translateY(-50%) scale(1.1);\n  }\n\n  &--prev { left: 1.5rem; }\n  &--next { right: 1.5rem; }\n}\n\n.lightbox-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  max-width: 90vw;\n  max-height: 90vh;\n}\n\n.lightbox-image[_ngcontent-%COMP%] {\n  max-width: 90vw;\n  max-height: 82vh;\n  object-fit: contain;\n  border-radius: $radius-md;\n  animation: _ngcontent-%COMP%_lightbox-zoom-in 250ms ease-out;\n}\n\n.lightbox-counter[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n  padding: 0.25rem 1rem;\n  background: rgba(255, 255, 255, 0.12);\n  border-radius: $radius-full;\n  color: rgba(255, 255, 255, 0.8);\n  font-size: $font-size-sm;\n  font-weight: 500;\n  letter-spacing: 0.05em;\n}\n\n@keyframes _ngcontent-%COMP%_lightbox-fade-in {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n@keyframes _ngcontent-%COMP%_lightbox-zoom-in {\n  from { opacity: 0; transform: scale(0.92); }\n  to { opacity: 1; transform: scale(1); }\n}\n\n.virtual-tour[_ngcontent-%COMP%] {\n  margin-top: $space-3;\n}\n\n.tour-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-4;\n  background: $primary-gradient;\n  color: white;\n  border-radius: $radius-md;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  text-decoration: none;\n  transition: all 250ms;\n  box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);\n  }\n\n  i { font-size: $font-size-sm; }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   LOADING\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.page-loading[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: 1400px;\n  margin: 0 auto;\n  padding: $space-6 0;\n}\n\n.kpi-skeleton[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: $space-3;\n  margin: $space-5 0;\n\n  @media (max-width: 1200px) { grid-template-columns: repeat(3, 1fr); }\n  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }\n}\n\n.grid-skeleton[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.2fr 0.8fr;\n  gap: $space-4;\n\n  @media (max-width: 1024px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   ANIMATIONS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n@keyframes[_ngcontent-%COMP%]   fade-in-up[_ngcontent-%COMP%] {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   STATUS[_ngcontent-%COMP%]   TIMELINE\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550[_ngcontent-%COMP%]   TIMELINE[_ngcontent-%COMP%]   SUMMARY[_ngcontent-%COMP%]   \u2550\u2550\u2550\n.timeline-summary[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-3;\n  padding: 0 $space-4 $space-3;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  margin-bottom: $space-3;\n}\n\n.timeline-summary-stat[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: $space-2 $space-4;\n  background: $gray-50;\n  border-radius: $radius-md;\n  min-width: 80px;\n\n  .summary-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .summary-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.04em;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550[_ngcontent-%COMP%]   TIMELINE[_ngcontent-%COMP%]   \u2550\u2550\u2550\n.status-timeline[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding: $space-2 $space-4;\n}\n\n.timeline-event[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-3;\n  min-height: 72px;\n\n  .timeline-marker {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    width: 36px;\n    flex-shrink: 0;\n  }\n\n  .marker-dot {\n    width: 36px;\n    height: 36px;\n    border-radius: 50%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: $font-size-sm;\n    color: white;\n    flex-shrink: 0;\n    z-index: 1;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n    transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);\n  }\n\n  .marker-line {\n    flex: 1;\n    width: 2px;\n    background: $gray-200;\n    margin: 4px 0;\n  }\n\n  // Event card\n  .timeline-card {\n    flex: 1;\n    padding: $space-2 $space-3;\n    margin-bottom: $space-2;\n    background: $gray-50;\n    border: 1px solid rgba(0, 0, 0, 0.05);\n    border-radius: $radius-lg;\n    transition: background 200ms, box-shadow 200ms;\n  }\n\n  .timeline-card-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: $space-2;\n    margin-bottom: $space-1;\n  }\n\n  .timeline-label {\n    font-size: $font-size-md;\n    font-weight: 600;\n    color: $gray-800;\n  }\n\n  .timeline-type-badge {\n    display: inline-flex;\n    padding: 1px $space-2;\n    font-size: 0.6875rem;\n    font-weight: 600;\n    border-radius: $radius-full;\n    text-transform: uppercase;\n    letter-spacing: 0.04em;\n    white-space: nowrap;\n\n    &--created  { background: rgba(102, 126, 234, 0.12); color: #4f5cd9; }\n    &--listed   { background: rgba(6, 182, 212, 0.12);   color: #0891b2; }\n    &--updated  { background: rgba(245, 158, 11, 0.12);  color: #b45309; }\n    &--sold     { background: rgba(34, 197, 94, 0.12);   color: #16a34a; }\n    &--price    { background: rgba(168, 85, 247, 0.12);  color: #7c3aed; }\n    &--status   { background: rgba(59, 130, 246, 0.12);  color: #2563eb; }\n    &--showing  { background: rgba(236, 72, 153, 0.12);  color: #db2777; }\n  }\n\n  .timeline-meta {\n    display: flex;\n    align-items: center;\n    gap: $space-3;\n    margin-bottom: $space-1;\n  }\n\n  .timeline-date,\n  .timeline-time {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    font-size: $font-size-xs;\n    color: $gray-500;\n\n    i { font-size: 0.7rem; }\n  }\n\n  .timeline-description {\n    margin: $space-1 0 0;\n    font-size: $font-size-sm;\n    color: $gray-600;\n    line-height: 1.5;\n    padding: $space-1 $space-2;\n    background: rgba(0, 0, 0, 0.02);\n    border-left: 2px solid $gray-200;\n    border-radius: 0 $radius-sm $radius-sm 0;\n  }\n\n  &:hover {\n    .marker-dot { transform: scale(1.12); }\n    .timeline-card {\n      background: white;\n      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n    }\n  }\n\n  // Variant colors\n  &--created .marker-dot { background: $primary-gradient; }\n  &--listed .marker-dot  { background: $cyan-gradient; }\n  &--updated .marker-dot { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }\n  &--sold .marker-dot    { background: $success-gradient; }\n  &--price .marker-dot   { background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%); }\n  &--status .marker-dot  { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); }\n  &--showing .marker-dot { background: linear-gradient(135deg, #ec4899 0%, #db2777 100%); }\n\n  &--created .marker-line { background: linear-gradient(180deg, rgba(102, 126, 234, 0.3), $gray-200); }\n  &--listed .marker-line  { background: linear-gradient(180deg, rgba(6, 182, 212, 0.3), $gray-200); }\n  &--updated .marker-line { background: linear-gradient(180deg, rgba(245, 158, 11, 0.3), $gray-200); }\n  &--sold .marker-line    { background: linear-gradient(180deg, rgba(34, 197, 94, 0.3), $gray-200); }\n  &--price .marker-line   { background: linear-gradient(180deg, rgba(168, 85, 247, 0.3), $gray-200); }\n  &--status .marker-line  { background: linear-gradient(180deg, rgba(59, 130, 246, 0.3), $gray-200); }\n  &--showing .marker-line { background: linear-gradient(180deg, rgba(236, 72, 153, 0.3), $gray-200); }\n}\n\n//[_ngcontent-%COMP%]   Empty[_ngcontent-%COMP%]   state\n.timeline-empty[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: $space-2;\n  padding: $space-6 $space-4;\n  color: $gray-400;\n  font-size: $font-size-sm;\n\n  i { font-size: 1.25rem; }\n}\n\n@keyframes _ngcontent-%COMP%_slide-in-right {\n  from { opacity: 0; transform: translateX(20px); }\n  to { opacity: 1; transform: translateX(0); }\n}\n\n@keyframes _ngcontent-%COMP%_gradient-shift {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}\n\n@keyframes _ngcontent-%COMP%_orb-float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25% { transform: translate(50px, -30px) scale(1.1); }\n  50% { transform: translate(100px, 20px) scale(0.9); }\n  75% { transform: translate(30px, 50px) scale(1.05); }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   HERO[_ngcontent-%COMP%]   ACTIONS[_ngcontent-%COMP%]   (X12)[_ngcontent-%COMP%]   \u2014[_ngcontent-%COMP%]   Quick[_ngcontent-%COMP%]   Action[_ngcontent-%COMP%]   Buttons\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-2;\n  margin-top: $space-3;\n  flex-wrap: wrap;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   TAB[_ngcontent-%COMP%]   NAVIGATION\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.tab-nav[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-2;\n  margin-bottom: $space-4;\n  padding: $space-2;\n  background: #ffffff;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: $radius-2xl;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);\n  overflow-x: auto;\n  scrollbar-width: none;\n  &::-webkit-scrollbar { display: none; }\n}\n\n.tab-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-3 $space-5;\n  border: none;\n  border-radius: $radius-xl;\n  background: transparent;\n  font-size: $font-size-base;\n  font-weight: 600;\n  color: $gray-500;\n  cursor: pointer;\n  transition: all 250ms;\n  white-space: nowrap;\n\n  i { font-size: $font-size-base; }\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.04);\n    color: $gray-700;\n  }\n\n  &--active {\n    background: $primary-gradient;\n    color: white;\n    box-shadow: 0 4px 14px rgba(102, 126, 234, 0.3);\n\n    &:hover {\n      background: $primary-gradient;\n      color: white;\n    }\n  }\n}\n\n.tab-count[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 22px;\n  height: 22px;\n  padding: 0 $space-1;\n  background: rgba(255, 255, 255, 0.3);\n  border-radius: $radius-full;\n  font-size: $font-size-xs;\n  font-weight: 700;\n\n  .tab-btn:not(.tab-btn--active) & {\n    background: rgba(0, 0, 0, 0.08);\n    color: $gray-600;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   TAB[_ngcontent-%COMP%]   PANELS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.tab-panel[_ngcontent-%COMP%] {\n  animation: fade-in-up 0.3s ease-out;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   COMMISSION[_ngcontent-%COMP%]   BLOCK[_ngcontent-%COMP%]   (X7)\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.commission-block[_ngcontent-%COMP%] {\n  margin-top: $space-4;\n  padding-top: $space-4;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n}\n\n.commission-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-sm;\n  font-weight: 700;\n  color: #0e7490;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  margin: 0 0 $space-3;\n\n  i {\n    color: #06b6d4;\n    font-size: $font-size-sm;\n  }\n}\n\n.field-value--commission[_ngcontent-%COMP%] {\n  font-size: $font-size-lg;\n  font-weight: 700;\n  background: $primary-gradient;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.commission-estimate[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: $space-3;\n  padding: $space-2 $space-3;\n  background: rgba(102, 126, 234, 0.06);\n  border-radius: $radius-md;\n  border: 1px solid rgba(102, 126, 234, 0.15);\n\n  .estimate-label {\n    font-size: $font-size-xs;\n    font-weight: 600;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .estimate-value {\n    font-size: $font-size-lg;\n    font-weight: 700;\n    color: #667eea;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   CARD[_ngcontent-%COMP%]   HEADER[_ngcontent-%COMP%]   BAR[_ngcontent-%COMP%]   (shared for tab panels)\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.card-header-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: $space-4;\n  flex-wrap: wrap;\n  gap: $space-2;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   SHOWINGS[_ngcontent-%COMP%]   TABLE[_ngcontent-%COMP%]   (X3)\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.showings-table[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n\n  thead tr th {\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    border: none;\n    border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n    padding: $space-3 $space-4;\n    font-size: 0.72rem;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #3b82f6;\n    text-align: left;\n  }\n\n  tbody .table-row {\n    border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n    transition: background 150ms;\n\n    &:last-child { border-bottom: none; }\n    &:hover { background: rgba(102, 126, 234, 0.03); }\n\n    td {\n      padding: $space-3 $space-4;\n      vertical-align: middle;\n      font-size: $font-size-sm;\n      color: $gray-700;\n    }\n  }\n}\n\n.visitor-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n\n  .visitor-name {\n    font-weight: 600;\n    color: $gray-800;\n  }\n\n  .visitor-email {\n    font-size: $font-size-xs;\n    color: $gray-400;\n  }\n}\n\n.rating-stars[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 2px;\n\n  .pi-star-fill {\n    font-size: 0.75rem;\n    color: $gray-300;\n\n    &.star-active {\n      color: #f59e0b;\n    }\n  }\n}\n\n.feedback-text[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  font-size: $font-size-xs;\n  color: $gray-500;\n  max-width: 200px;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   DOCUMENTS[_ngcontent-%COMP%]   GRID[_ngcontent-%COMP%]   (X1)\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.documents-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: $space-3;\n}\n\n.document-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: #ffffff;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: $radius-lg;\n  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &:hover {\n    transform: translateY(-3px);\n    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.04);\n    background: #fafafa;\n  }\n}\n\n.doc-icon[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  border-radius: $radius-md;\n  background: $cyan-gradient;\n  color: white;\n  font-size: $font-size-lg;\n  flex-shrink: 0;\n}\n\n.doc-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n\n  .doc-name {\n    font-weight: 600;\n    font-size: $font-size-sm;\n    color: $gray-800;\n    display: block;\n    margin-bottom: 2px;\n    word-break: break-word;\n  }\n\n  .doc-meta {\n    display: flex;\n    gap: $space-2;\n    flex-wrap: wrap;\n    font-size: $font-size-xs;\n    color: $gray-400;\n  }\n\n  .doc-category {\n    display: inline-block;\n    padding: 1px $space-1;\n    background: rgba(6, 182, 212, 0.12);\n    border-radius: $radius-sm;\n    color: #0e7490;\n    font-weight: 600;\n    font-size: 0.7rem;\n    text-transform: uppercase;\n  }\n\n  .doc-uploader {\n    font-size: $font-size-xs;\n    color: $gray-400;\n    margin-top: 2px;\n    display: block;\n  }\n}\n\n.doc-actions[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   PRICE[_ngcontent-%COMP%]   HISTORY[_ngcontent-%COMP%]   TIMELINE[_ngcontent-%COMP%]   (X4)\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.price-timeline[_ngcontent-%COMP%] {\n  padding-left: $space-2;\n}\n\n.price-event[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-3;\n  position: relative;\n\n  &--up .price-dot {\n    background: $success-gradient;\n  }\n  &--down .price-dot {\n    background: linear-gradient(135deg, #f87171 0%, #ef4444 100%);\n  }\n}\n\n.price-marker[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  flex-shrink: 0;\n}\n\n.price-dot[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  color: white;\n  font-size: 0.7rem;\n  z-index: 1;\n}\n\n.price-line[_ngcontent-%COMP%] {\n  width: 2px;\n  flex: 1;\n  background: $gray-200;\n  min-height: 20px;\n}\n\n.price-body[_ngcontent-%COMP%] {\n  flex: 1;\n  padding-bottom: $space-4;\n}\n\n.price-change-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  flex-wrap: wrap;\n\n  .price-from {\n    font-size: $font-size-sm;\n    color: $gray-500;\n    text-decoration: line-through;\n  }\n\n  .pi-arrow-right {\n    font-size: 0.7rem;\n    color: $gray-400;\n  }\n\n  .price-to {\n    font-size: $font-size-base;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .price-pct {\n    font-size: $font-size-xs;\n    font-weight: 700;\n    padding: 1px $space-2;\n    border-radius: $radius-full;\n\n    &.pct-up {\n      background: rgba(34, 197, 94, 0.12);\n      color: #16a34a;\n    }\n\n    &.pct-down {\n      background: rgba(239, 68, 68, 0.12);\n      color: #dc2626;\n    }\n  }\n}\n\n.price-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-2;\n  margin-top: 2px;\n  font-size: $font-size-xs;\n  color: $gray-400;\n}\n\n.price-reason[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: $space-1;\n  font-size: $font-size-xs;\n  color: $gray-500;\n  font-style: italic;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   EMPTY[_ngcontent-%COMP%]   STATE\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-8 $space-4;\n  text-align: center;\n\n  .empty-icon {\n    font-size: 2.5rem;\n    color: $gray-300;\n  }\n\n  p {\n    color: $gray-400;\n    font-size: $font-size-sm;\n    margin: 0;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   DIALOG[_ngcontent-%COMP%]   FORM[_ngcontent-%COMP%]   FIELDS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.dialog-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  padding: $space-2 0;\n\n  .form-field {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    gap: 0.75rem;\n\n    > label {\n      font-size: 0.8125rem;\n      font-weight: 600;\n      color: #475569;\n      white-space: nowrap;\n      min-width: 100px;\n      flex-shrink: 0;\n      text-align: right;\n\n      .required {\n        color: #ef4444;\n      }\n    }\n\n    > p-inputgroup,\n    > p-select,\n    > p-datepicker,\n    > textarea {\n      flex: 1;\n      min-width: 0;\n    }\n\n    &:focus-within > label {\n      color: #4f46e5;\n    }\n  }\n}\n\n.select-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n}\n\n\n\n\n\n.activities-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.activity-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: #ffffff;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: $radius-lg;\n  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &:hover {\n    background: #fafafa;\n    transform: translateY(-2px);\n    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.03);\n  }\n\n  &--completed {\n    opacity: 0.6;\n\n    .activity-subject {\n      text-decoration: line-through;\n      color: $gray-400;\n    }\n  }\n}\n\n.activity-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: $radius-md;\n  font-size: $font-size-lg;\n  color: white;\n  flex-shrink: 0;\n\n  &--call { background: $success-gradient; }\n  &--email { background: linear-gradient(135deg, #ec4899 0%, #db2777 100%); }\n  &--meeting { background: $primary-gradient; }\n  &--task { background: $cyan-gradient; }\n  &--note { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }\n  &--follow_up { background: $purple-gradient; }\n}\n\n.activity-body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.activity-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  margin-bottom: 2px;\n}\n\n.activity-subject[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: $font-size-md;\n  color: $gray-800;\n}\n\n.priority-tag[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 1px $space-2;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  border-radius: $radius-full;\n  text-transform: capitalize;\n}\n\n.activity-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  font-size: $font-size-xs;\n  color: $gray-500;\n  margin-bottom: $space-1;\n\n  i {\n    font-size: 0.7rem;\n    margin-right: 2px;\n  }\n}\n\n.activity-description[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $gray-500;\n  line-height: 1.5;\n}\n\n.activity-actions[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  align-self: center;\n}\n\n.row-action-btn--complete[_ngcontent-%COMP%] {\n  background: $success-gradient;\n  color: white;\n  border: none;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 250ms;\n  font-size: $font-size-sm;\n\n  &:hover {\n    transform: scale(1.15);\n    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);\n  }\n}\n\n\n\n.cma-loading[_ngcontent-%COMP%] { padding: $space-4; }\n\n.cma-summary[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: $space-3;\n  padding: $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n}\n\n.cma-kpi[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  padding: $space-3;\n  background: $glass-bg-subtle;\n  border-radius: $radius-lg;\n  border: 1px solid $glass-border;\n  text-align: center;\n\n  &__label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    font-weight: 600;\n  }\n\n  &__value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n\n    &--primary {\n      background: $primary-gradient;\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n    }\n  }\n}\n\n.cma-table-wrap[_ngcontent-%COMP%] {\n  padding: $space-3;\n\n  .comp-address {\n    font-weight: 600;\n    color: $gray-800;\n    display: block;\n  }\n\n  .comp-city {\n    font-size: $font-size-xs;\n    color: $gray-400;\n  }\n}\n\n\n\n.esign-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  padding: $space-4;\n}\n\n.esign-card[_ngcontent-%COMP%] {\n  background: $glass-bg-subtle;\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  padding: $space-4;\n  transition: all 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n  }\n\n  &__header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    margin-bottom: $space-3;\n  }\n\n  &__meta {\n    display: flex;\n    flex-wrap: wrap;\n    gap: $space-3;\n    font-size: $font-size-xs;\n    color: $gray-500;\n    margin-bottom: $space-3;\n\n    i { margin-right: 4px; }\n  }\n}\n\n.esign-doc-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n}\n\n.esign-doc-icon[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  color: #ef4444;\n}\n\n.esign-doc-name[_ngcontent-%COMP%] {\n  display: block;\n  font-size: $font-size-md;\n  color: $gray-800;\n}\n\n.esign-doc-type[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-400;\n}\n\n.esign-signers[_ngcontent-%COMP%] {\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n  padding-top: $space-3;\n\n  &__title {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    font-weight: 600;\n    margin: 0 0 $space-2;\n  }\n}\n\n.signer-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-2 0;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.03);\n\n  &:last-child { border-bottom: none; }\n}\n\n.signer-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n}\n\n.signer-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: $font-size-sm;\n  color: $gray-800;\n}\n\n.signer-email[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-400;\n}\n\n.signer-role[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  background: rgba(99, 102, 241, 0.1);\n  padding: 1px 8px;\n  border-radius: $radius-full;\n}\n\n.esign-card__actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding-top: $space-3;\n  margin-top: $space-3;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n}\n\n.void-dialog-text[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $gray-600;\n  line-height: 1.6;\n}\n\n\n\n.alert-rules-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  padding: $space-4;\n}\n\n.alert-rule-card[_ngcontent-%COMP%] {\n  background: $glass-bg-subtle;\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  padding: $space-4;\n  transition: all 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n  }\n\n  &--inactive {\n    opacity: 0.6;\n  }\n\n  &__header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    margin-bottom: $space-3;\n  }\n\n  &__client {\n    display: flex;\n    align-items: center;\n    gap: $space-3;\n  }\n\n  &__avatar {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: $primary-gradient;\n    color: white;\n    font-weight: 700;\n    border-radius: 50%;\n    font-size: $font-size-sm;\n    overflow: hidden;\n\n    img {\n      width: 100%;\n      height: 100%;\n      object-fit: cover;\n      border-radius: inherit;\n    }\n  }\n\n  &__email {\n    display: block;\n    font-size: $font-size-xs;\n    color: $gray-400;\n  }\n\n  &__criteria {\n    display: flex;\n    flex-wrap: wrap;\n    gap: $space-3;\n    font-size: $font-size-sm;\n    color: $gray-600;\n\n    i {\n      margin-right: 4px;\n      color: $gray-400;\n    }\n  }\n\n  &__footer {\n    margin-top: $space-3;\n    padding-top: $space-2;\n    border-top: 1px solid rgba(0, 0, 0, 0.06);\n  }\n\n  &__last-notified {\n    font-size: $font-size-xs;\n    color: $gray-400;\n  }\n}\n\n\n\n.toggle-btn[_ngcontent-%COMP%] {\n  position: relative;\n  width: 44px;\n  height: 24px;\n  border-radius: 12px;\n  border: none;\n  background: $gray-300;\n  cursor: pointer;\n  transition: background 250ms;\n  padding: 0;\n\n  &--active {\n    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);\n  }\n\n  &__slider {\n    position: absolute;\n    top: 2px;\n    left: 2px;\n    width: 20px;\n    height: 20px;\n    border-radius: 50%;\n    background: white;\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);\n    transition: transform 250ms;\n  }\n\n  &--active &__slider {\n    transform: translateX(20px);\n  }\n}\n\n\n\n.notification-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n  padding: $space-4;\n}\n\n.notification-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3;\n  background: $glass-bg-subtle;\n  border-radius: $radius-md;\n  border: 1px solid $glass-border;\n}\n\n.notification-icon[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(59, 130, 246, 0.1);\n  border-radius: 50%;\n  color: #3b82f6;\n  font-size: $font-size-sm;\n  flex-shrink: 0;\n}\n\n.notification-body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n\n  strong {\n    display: block;\n    font-size: $font-size-sm;\n    color: $gray-800;\n  }\n}\n\n.notification-meta[_ngcontent-%COMP%] {\n  display: block;\n  font-size: $font-size-xs;\n  color: $gray-500;\n}\n\n.notification-date[_ngcontent-%COMP%] {\n  display: block;\n  font-size: $font-size-xs;\n  color: $gray-400;\n}\n\n.mt-4[_ngcontent-%COMP%] { margin-top: $space-4; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PropertyDetailPage, [{
        type: Component,
        args: [{ standalone: true, selector: 'app-property-detail', imports: [
                    CommonModule,
                    RouterModule,
                    TooltipModule,
                    SkeletonModule,
                    DialogModule,
                    ReactiveFormsModule,
                    FormsModule,
                    InputTextModule,
                    InputNumberModule,
                    TextareaModule,
                    SelectModule,
                    DatePickerModule,
                    InputGroupModule,
                    InputGroupAddonModule,
                    TagModule,
                    TableModule,
                    BreadcrumbsComponent
                ], template: "<div class=\"page-container\">\n  <div class=\"bg-orbs\">\n    <div class=\"orb orb-1\"></div>\n    <div class=\"orb orb-2\"></div>\n    <div class=\"orb orb-3\"></div>\n  </div>\n\n  <div class=\"page-content\" *ngIf=\"!loading(); else pageLoading\">\n    <ng-container *ngIf=\"property() as prop\">\n      <!-- \u2550\u2550\u2550 HERO \u2550\u2550\u2550 -->\n      <header class=\"hero-section\">\n        <div class=\"hero-left\">\n          <app-breadcrumbs></app-breadcrumbs>\n          <div class=\"hero-nav\">\n            <a class=\"back-link\" routerLink=\"/app/properties\">\n              <i class=\"pi pi-arrow-left\"></i> Properties\n            </a>\n            <a *ngIf=\"canEdit\" class=\"edit-link\" [routerLink]=\"'/app/properties/' + prop.id + '/edit'\">\n              <i class=\"pi pi-pencil\"></i> Edit\n            </a>\n          </div>\n          <h1 class=\"hero-title\">\n            <span class=\"title-gradient\">{{ prop.address }}</span>\n          </h1>\n          <div class=\"hero-meta\">\n            <span class=\"hero-badge\" [ngClass]=\"statusClass(prop.status)\">{{ prop.status }}</span>\n            <span class=\"hero-type\">\n              <i class=\"pi pi-home\"></i> {{ typeLabel(prop.propertyType) }}\n            </span>\n            <span class=\"hero-mls\" *ngIf=\"prop.mlsNumber\">\n              <i class=\"pi pi-hashtag\"></i> MLS {{ prop.mlsNumber }}\n            </span>\n            <span class=\"hero-location\" *ngIf=\"prop.city\">\n              <i class=\"pi pi-map-marker\"></i> {{ prop.city }}<ng-container *ngIf=\"prop.province\">, {{ prop.province }}</ng-container>\n            </span>\n          </div>\n          <!-- Quick Actions (X12) -->\n          <div class=\"hero-actions\" *ngIf=\"canEdit\">\n            <button type=\"button\" class=\"action-btn action-btn--add\" (click)=\"onChangeStatus()\">\n              <span class=\"action-btn__icon\"><i class=\"pi pi-sync\"></i></span>\n              <span>Change Status</span>\n            </button>\n            <button type=\"button\" class=\"action-btn action-btn--import\" (click)=\"onLogShowing()\">\n              <span class=\"action-btn__icon\"><i class=\"pi pi-calendar-plus\"></i></span>\n              <span>Log Showing</span>\n            </button>\n            <button type=\"button\" class=\"action-btn action-btn--export\" (click)=\"onUploadDocument()\">\n              <span class=\"action-btn__icon\"><i class=\"pi pi-upload\"></i></span>\n              <span>Upload Document</span>\n            </button>\n          </div>\n        </div>\n        <div class=\"hero-right\">\n          <div class=\"hero-price\">\n            <span class=\"hero-price-value\">{{ formatCurrency(prop.listPrice, prop.currency) }}</span>\n            <span class=\"hero-price-label\">List Price</span>\n          </div>\n          <div class=\"hero-sale-price\" *ngIf=\"prop.salePrice\">\n            <span class=\"hero-sale-value\">{{ formatCurrency(prop.salePrice, prop.currency) }}</span>\n            <span class=\"hero-sale-label\">Sale Price</span>\n          </div>\n        </div>\n      </header>\n\n      <!-- \u2550\u2550\u2550 LIVE ALERTS (X9 \u2013 SignalR) \u2550\u2550\u2550 -->\n      <section class=\"live-alerts-section\" *ngIf=\"showLiveBanner()\">\n        <div class=\"live-alerts-card\">\n          <div class=\"live-alerts-header\">\n            <span class=\"live-dot\"></span>\n            <span class=\"live-label\">Live Updates</span>\n            <span class=\"live-count\">{{ liveAlerts().length }}</span>\n            <button type=\"button\" class=\"live-clear\" (click)=\"clearAllAlerts()\" title=\"Dismiss all\">\n              <i class=\"pi pi-times\"></i>\n            </button>\n          </div>\n          <div class=\"live-alerts-list\">\n            <div *ngFor=\"let alert of liveAlerts()\" class=\"live-alert\" [ngClass]=\"'live-alert--' + alert.type\">\n              <div class=\"alert-icon\" [ngClass]=\"alertTypeIcon(alert.type)\">\n                <i class=\"pi\" [ngClass]=\"alert.icon\"></i>\n              </div>\n              <div class=\"alert-body\">\n                <span class=\"alert-message\">{{ alert.message }}</span>\n                <span class=\"alert-time\">{{ alert.timestamp | date:'shortTime' }}</span>\n              </div>\n              <button type=\"button\" class=\"alert-dismiss\" (click)=\"dismissAlert(alert.id)\" title=\"Dismiss\">\n                <i class=\"pi pi-times\"></i>\n              </button>\n            </div>\n          </div>\n        </div>\n      </section>\n\n      <!-- \u2550\u2550\u2550 PHOTO GALLERY \u2550\u2550\u2550 -->\n      <section class=\"gallery-section\" *ngIf=\"photoUrlList().length > 0 || prop.virtualTourUrl\">\n        <div class=\"gallery-card\">\n          <h2 class=\"card-title\"><i class=\"pi pi-images\"></i> Photos &amp; Media</h2>\n          <div class=\"gallery-grid\" *ngIf=\"photoUrlList().length > 0\">\n            <div class=\"gallery-item\" *ngFor=\"let url of photoUrlList(); let i = index\" (click)=\"openLightbox(i)\">\n              <img [src]=\"url\" [alt]=\"'Photo ' + (i + 1) + ' of ' + prop.address\" loading=\"lazy\" />\n              <div class=\"gallery-item-overlay\">\n                <i class=\"pi pi-search-plus\"></i>\n              </div>\n            </div>\n          </div>\n          <div class=\"virtual-tour\" *ngIf=\"prop.virtualTourUrl\">\n            <a [href]=\"prop.virtualTourUrl\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"tour-link\">\n              <i class=\"pi pi-video\"></i>\n              <span>View Virtual Tour</span>\n              <i class=\"pi pi-external-link\"></i>\n            </a>\n          </div>\n        </div>\n      </section>\n\n      <!-- \u2550\u2550\u2550 KPI CARDS \u2550\u2550\u2550 -->\n      <section class=\"kpi-section\">\n        <div class=\"kpi-card kpi-card--sqft\">\n          <div class=\"kpi-icon\"><i class=\"pi pi-expand\"></i></div>\n          <div class=\"kpi-content\">\n            <span class=\"kpi-label\">Square Feet</span>\n            <strong class=\"kpi-value\">{{ prop.squareFeet ? (prop.squareFeet | number) : '\u2014' }}</strong>\n          </div>\n        </div>\n        <div class=\"kpi-card kpi-card--beds\">\n          <div class=\"kpi-icon\"><i class=\"pi pi-inbox\"></i></div>\n          <div class=\"kpi-content\">\n            <span class=\"kpi-label\">Bedrooms</span>\n            <strong class=\"kpi-value\">{{ prop.bedrooms ?? '\u2014' }}</strong>\n          </div>\n        </div>\n        <div class=\"kpi-card kpi-card--baths\">\n          <div class=\"kpi-icon\"><i class=\"pi pi-sun\"></i></div>\n          <div class=\"kpi-content\">\n            <span class=\"kpi-label\">Bathrooms</span>\n            <strong class=\"kpi-value\">{{ prop.bathrooms ?? '\u2014' }}</strong>\n          </div>\n        </div>\n        <div class=\"kpi-card kpi-card--age\">\n          <div class=\"kpi-icon\"><i class=\"pi pi-stopwatch\"></i></div>\n          <div class=\"kpi-content\">\n            <span class=\"kpi-label\">Days Listed</span>\n            <strong class=\"kpi-value\">{{ daysSinceListed() }}d</strong>\n          </div>\n        </div>\n        <div class=\"kpi-card kpi-card--ppsqft\">\n          <div class=\"kpi-icon\"><i class=\"pi pi-dollar\"></i></div>\n          <div class=\"kpi-content\">\n            <span class=\"kpi-label\">Price/SqFt</span>\n            <strong class=\"kpi-value\">{{ pricePerSqFt() !== null ? (formatCurrency(pricePerSqFt()!, prop.currency)) : '\u2014' }}</strong>\n          </div>\n        </div>\n      </section>\n\n      <!-- \u2550\u2550\u2550 TABS NAVIGATION \u2550\u2550\u2550 -->\n      <nav class=\"tab-nav\">\n        <button type=\"button\" class=\"tab-btn\" [class.tab-btn--active]=\"activeTab() === 'details'\" (click)=\"setTab('details')\">\n          <i class=\"pi pi-home\"></i> Details\n        </button>\n        <button type=\"button\" class=\"tab-btn\" [class.tab-btn--active]=\"activeTab() === 'showings'\" (click)=\"setTab('showings')\">\n          <i class=\"pi pi-calendar\"></i> Showings\n          <span class=\"tab-count\" *ngIf=\"showings().length\">{{ showings().length }}</span>\n        </button>\n        <button type=\"button\" class=\"tab-btn\" [class.tab-btn--active]=\"activeTab() === 'documents'\" (click)=\"setTab('documents')\">\n          <i class=\"pi pi-file\"></i> Documents\n          <span class=\"tab-count\" *ngIf=\"documents().length\">{{ documents().length }}</span>\n        </button>\n        <button type=\"button\" class=\"tab-btn\" [class.tab-btn--active]=\"activeTab() === 'priceHistory'\" (click)=\"setTab('priceHistory')\">\n          <i class=\"pi pi-chart-line\"></i> Price History\n          <span class=\"tab-count\" *ngIf=\"priceHistory().length\">{{ priceHistory().length }}</span>\n        </button>\n        <button type=\"button\" class=\"tab-btn\" [class.tab-btn--active]=\"activeTab() === 'activities'\" (click)=\"setTab('activities')\">\n          <i class=\"pi pi-list-check\"></i> Activities\n          <span class=\"tab-count\" *ngIf=\"activities().length\">{{ activities().length }}</span>\n        </button>\n        <button type=\"button\" class=\"tab-btn\" [class.tab-btn--active]=\"activeTab() === 'cma'\" (click)=\"setTab('cma')\">\n          <i class=\"pi pi-chart-bar\"></i> CMA\n        </button>\n        <button type=\"button\" class=\"tab-btn\" [class.tab-btn--active]=\"activeTab() === 'esign'\" (click)=\"setTab('esign')\">\n          <i class=\"pi pi-pen-to-square\"></i> E-Signature\n          <span class=\"tab-count\" *ngIf=\"signatureRequests().length\">{{ signatureRequests().length }}</span>\n        </button>\n        <button type=\"button\" class=\"tab-btn\" [class.tab-btn--active]=\"activeTab() === 'alerts'\" (click)=\"setTab('alerts')\">\n          <i class=\"pi pi-bell\"></i> Alerts\n          <span class=\"tab-count\" *ngIf=\"alertRules().length\">{{ alertRules().length }}</span>\n        </button>\n      </nav>\n\n      <!-- \u2550\u2550\u2550 TAB: DETAILS (original main grid) \u2550\u2550\u2550 -->\n      <div class=\"detail-grid\" *ngIf=\"activeTab() === 'details'\">\n        <!-- LEFT COLUMN -->\n        <div class=\"detail-col\">\n          <!-- Property Details -->\n          <section class=\"detail-card\">\n            <div class=\"card-shell\">\n              <div class=\"card-header-detail\">\n                <div class=\"card-header-copy\">\n                  <span class=\"card-kicker\">Property Snapshot</span>\n                  <h2 class=\"card-title\"><i class=\"pi pi-home\"></i> Property Details</h2>\n                </div>\n                <div class=\"card-badge-stack\">\n                  <span class=\"mini-badge\" *ngIf=\"prop.listingDateUtc || prop.createdAtUtc\">\n                    Listed {{ (prop.listingDateUtc || prop.createdAtUtc) | date:'MMM d, yyyy' }}\n                  </span>\n                  <span class=\"mini-badge\" *ngIf=\"prop.yearBuilt\">Built {{ prop.yearBuilt }}</span>\n                </div>\n              </div>\n            </div>\n            <div class=\"detail-fields\">\n              <div class=\"detail-field detail-field--span-2 detail-field--spotlight\">\n                <span class=\"field-label\">Address</span>\n                <span class=\"field-value\">{{ prop.address }}</span>\n              </div>\n              <div class=\"detail-field\" *ngIf=\"prop.city\">\n                <span class=\"field-label\">City</span>\n                <span class=\"field-value\">{{ prop.city }}</span>\n              </div>\n              <div class=\"detail-field\" *ngIf=\"prop.province\">\n                <span class=\"field-label\">Province</span>\n                <span class=\"field-value\">{{ prop.province }}</span>\n              </div>\n              <div class=\"detail-field\" *ngIf=\"prop.postalCode\">\n                <span class=\"field-label\">Postal Code</span>\n                <span class=\"field-value\">{{ prop.postalCode }}</span>\n              </div>\n              <div class=\"detail-field\" *ngIf=\"prop.country\">\n                <span class=\"field-label\">Country</span>\n                <span class=\"field-value\">{{ prop.country }}</span>\n              </div>\n              <div class=\"detail-field\" *ngIf=\"prop.neighborhood\">\n                <span class=\"field-label\">Neighborhood</span>\n                <span class=\"field-value\">{{ prop.neighborhood }}</span>\n              </div>\n              <div class=\"detail-field\" *ngIf=\"prop.mlsNumber\">\n                <span class=\"field-label\">MLS #</span>\n                <span class=\"field-value\">{{ prop.mlsNumber }}</span>\n              </div>\n              <div class=\"detail-field\">\n                <span class=\"field-label\">Property Type</span>\n                <span class=\"field-value\">{{ typeLabel(prop.propertyType) }}</span>\n              </div>\n              <div class=\"detail-field\">\n                <span class=\"field-label\">Status</span>\n                <span class=\"field-value\">\n                  <span class=\"status-pill\" [ngClass]=\"statusClass(prop.status)\">{{ prop.status }}</span>\n                </span>\n              </div>\n            </div>\n          </section>\n\n          <!-- Features & Specs -->\n          <section class=\"detail-card\">\n            <div class=\"card-shell\">\n              <div class=\"card-header-detail\">\n                <div class=\"card-header-copy\">\n                  <span class=\"card-kicker\">Interior & Exterior</span>\n                  <h2 class=\"card-title\"><i class=\"pi pi-sliders-h\"></i> Features &amp; Specs</h2>\n                </div>\n              </div>\n            </div>\n            <div class=\"detail-fields detail-fields--specs\">\n              <div class=\"detail-field\" *ngIf=\"prop.bedrooms != null\">\n                <span class=\"field-label\">Bedrooms</span>\n                <span class=\"field-value\">{{ prop.bedrooms }}</span>\n              </div>\n              <div class=\"detail-field\" *ngIf=\"prop.bathrooms != null\">\n                <span class=\"field-label\">Bathrooms</span>\n                <span class=\"field-value\">{{ prop.bathrooms }}</span>\n              </div>\n              <div class=\"detail-field\" *ngIf=\"prop.squareFeet != null\">\n                <span class=\"field-label\">Square Feet</span>\n                <span class=\"field-value\">{{ prop.squareFeet | number }}</span>\n              </div>\n              <div class=\"detail-field\" *ngIf=\"prop.lotSizeSqFt != null\">\n                <span class=\"field-label\">Lot Size</span>\n                <span class=\"field-value\">{{ prop.lotSizeSqFt | number }} sqft</span>\n              </div>\n              <div class=\"detail-field\" *ngIf=\"prop.yearBuilt != null\">\n                <span class=\"field-label\">Year Built</span>\n                <span class=\"field-value\">{{ prop.yearBuilt }}</span>\n              </div>\n              <div class=\"detail-field\" *ngIf=\"prop.garageSpaces != null\">\n                <span class=\"field-label\">Garage Spaces</span>\n                <span class=\"field-value\">{{ prop.garageSpaces }}</span>\n              </div>\n            </div>\n            <!-- Features text -->\n            <div class=\"features-text\" *ngIf=\"prop.features\">\n              <span class=\"field-label\">Features &amp; Amenities</span>\n              <p class=\"field-value\">{{ prop.features }}</p>\n            </div>\n            <div class=\"empty-state-cta\" *ngIf=\"prop.bedrooms == null && prop.bathrooms == null && prop.squareFeet == null\">\n              <p class=\"empty-text\">No feature details available.</p>\n              <button *ngIf=\"canEdit\" type=\"button\" class=\"cta-link\" [routerLink]=\"['/app/properties', prop.id, 'edit']\">\n                <i class=\"pi pi-pencil\"></i> Add Details\n              </button>\n            </div>\n          </section>\n\n          <!-- Description -->\n          <section class=\"detail-card\" *ngIf=\"prop.description\">\n            <div class=\"card-shell\">\n              <div class=\"card-header-detail\">\n                <div class=\"card-header-copy\">\n                  <span class=\"card-kicker\">Story</span>\n                  <h2 class=\"card-title\"><i class=\"pi pi-align-left\"></i> Description</h2>\n                </div>\n              </div>\n            </div>\n            <p class=\"description-text\">{{ prop.description }}</p>\n          </section>\n        </div>\n\n        <!-- RIGHT COLUMN -->\n        <div class=\"detail-col\">\n          <!-- Pricing + Commission -->\n          <section class=\"detail-card\">\n            <div class=\"card-shell\">\n              <div class=\"card-header-detail\">\n                <div class=\"card-header-copy\">\n                  <span class=\"card-kicker\">Commercials</span>\n                  <h2 class=\"card-title\"><i class=\"pi pi-dollar\"></i> Pricing &amp; Commission</h2>\n                </div>\n              </div>\n            </div>\n            <div class=\"pricing-hero\">\n              <div class=\"pricing-hero__item\">\n                <span class=\"pricing-hero__label\">List Price</span>\n                <strong class=\"pricing-hero__value\">{{ formatCurrency(prop.listPrice, prop.currency) }}</strong>\n              </div>\n              <div class=\"pricing-hero__item\" *ngIf=\"prop.salePrice != null\">\n                <span class=\"pricing-hero__label\">Sale Price</span>\n                <strong class=\"pricing-hero__value pricing-hero__value--success\">{{ formatCurrency(prop.salePrice, prop.currency) }}</strong>\n              </div>\n            </div>\n            <div class=\"detail-fields detail-fields--pricing\">\n              <div class=\"detail-field\">\n                <span class=\"field-label\">Currency</span>\n                <span class=\"field-value\">{{ prop.currency }}</span>\n              </div>\n              <div class=\"detail-field\" *ngIf=\"pricePerSqFt() !== null\">\n                <span class=\"field-label\">Price / SqFt</span>\n                <span class=\"field-value\">{{ formatCurrency(pricePerSqFt()!, prop.currency) }}</span>\n              </div>\n            </div>\n            <!-- Commission section (X7) -->\n            <div class=\"commission-block\" *ngIf=\"prop.commissionRate != null\">\n              <h3 class=\"commission-title\"><i class=\"pi pi-percentage\"></i> Commission Split</h3>\n              <div class=\"detail-fields\">\n                <div class=\"detail-field\">\n                  <span class=\"field-label\">Total Rate</span>\n                  <span class=\"field-value field-value--commission\">{{ prop.commissionRate }}%</span>\n                </div>\n                <div class=\"detail-field\" *ngIf=\"prop.buyerAgentCommission != null\">\n                  <span class=\"field-label\">Buyer Agent</span>\n                  <span class=\"field-value\">{{ prop.buyerAgentCommission }}%</span>\n                </div>\n                <div class=\"detail-field\" *ngIf=\"prop.sellerAgentCommission != null\">\n                  <span class=\"field-label\">Seller Agent</span>\n                  <span class=\"field-value\">{{ prop.sellerAgentCommission }}%</span>\n                </div>\n                <div class=\"detail-field\" *ngIf=\"prop.coListingAgentName\">\n                  <span class=\"field-label\">Co-Listing Agent</span>\n                  <span class=\"field-value\">{{ prop.coListingAgentName }}</span>\n                </div>\n              </div>\n              <!-- Commission dollar estimate -->\n              <div class=\"commission-estimate\" *ngIf=\"prop.listPrice && prop.commissionRate\">\n                <span class=\"estimate-label\">Est. Total Commission</span>\n                <span class=\"estimate-value\">{{ formatCurrency(prop.listPrice * prop.commissionRate / 100, prop.currency) }}</span>\n              </div>\n            </div>\n          </section>\n\n          <!-- Ownership -->\n          <section class=\"detail-card\">\n            <div class=\"card-shell\">\n              <div class=\"card-header-detail\">\n                <div class=\"card-header-copy\">\n                  <span class=\"card-kicker\">CRM Relationships</span>\n                  <h2 class=\"card-title\"><i class=\"pi pi-user\"></i> Ownership &amp; Links</h2>\n                </div>\n              </div>\n            </div>\n            <div class=\"detail-fields detail-fields--links\">\n              <div class=\"detail-field\" *ngIf=\"prop.ownerName\">\n                <span class=\"field-label\">Owner</span>\n                <a *ngIf=\"prop.ownerId\" class=\"field-link\" [routerLink]=\"['/app/settings/users', prop.ownerId]\">{{ prop.ownerName }}</a>\n                <span *ngIf=\"!prop.ownerId\" class=\"field-value\">{{ prop.ownerName }}</span>\n              </div>\n              <div class=\"detail-field\" *ngIf=\"prop.accountName\">\n                <span class=\"field-label\">Account</span>\n                <a *ngIf=\"prop.accountId\" class=\"field-link\" [routerLink]=\"['/app/customers', prop.accountId]\">{{ prop.accountName }}</a>\n                <span *ngIf=\"!prop.accountId\" class=\"field-value\">{{ prop.accountName }}</span>\n              </div>\n              <div class=\"detail-field\" *ngIf=\"prop.primaryContactName\">\n                <span class=\"field-label\">Primary Contact</span>\n                <a *ngIf=\"prop.primaryContactId\" class=\"field-link\" [routerLink]=\"['/app/contacts', prop.primaryContactId]\">{{ prop.primaryContactName }}</a>\n                <span *ngIf=\"!prop.primaryContactId\" class=\"field-value\">{{ prop.primaryContactName }}</span>\n              </div>\n            </div>\n            <div class=\"empty-state-cta\" *ngIf=\"!prop.ownerName && !prop.accountName && !prop.primaryContactName\">\n              <p class=\"empty-text\">No owner or contact linked.</p>\n              <button *ngIf=\"canEdit\" type=\"button\" class=\"cta-link\" [routerLink]=\"['/app/properties', prop.id, 'edit']\">\n                <i class=\"pi pi-link\"></i> Link Contact\n              </button>\n            </div>\n          </section>\n\n          <!-- Status Timeline -->\n          <section class=\"detail-card\">\n            <div class=\"card-shell\">\n              <div class=\"card-header-detail\">\n                <div class=\"card-header-copy\">\n                  <span class=\"card-kicker\">Lifecycle</span>\n                  <h2 class=\"card-title\"><i class=\"pi pi-calendar\"></i> Timeline</h2>\n                </div>\n                <div class=\"card-badge-stack\">\n                  <span class=\"mini-badge mini-badge--accent\">\n                    <i class=\"pi pi-clock\" style=\"font-size: 0.7rem\"></i>\n                    {{ daysSinceListed() }} days on market\n                  </span>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"timeline-summary\">\n              <div class=\"timeline-summary-stat\">\n                <span class=\"summary-value\">{{ timelineEvents().length }}</span>\n                <span class=\"summary-label\">Events</span>\n              </div>\n              <div class=\"timeline-summary-stat\">\n                <span class=\"summary-value\">{{ daysSinceListed() }}</span>\n                <span class=\"summary-label\">Days Listed</span>\n              </div>\n            </div>\n\n            <div class=\"status-timeline\">\n              <div *ngFor=\"let evt of timelineEvents(); let i = index; let last = last\"\n                   [class]=\"'timeline-event timeline-event--' + evt.variant\">\n                <div class=\"timeline-marker\">\n                  <span class=\"marker-dot\"><i class=\"pi\" [ngClass]=\"evt.icon\"></i></span>\n                  <span class=\"marker-line\" *ngIf=\"!last\"></span>\n                </div>\n                <div class=\"timeline-card\">\n                  <div class=\"timeline-card-header\">\n                    <span class=\"timeline-label\">{{ evt.label }}</span>\n                    <span [class]=\"'timeline-type-badge timeline-type-badge--' + evt.variant\">{{ evt.eventType }}</span>\n                  </div>\n                  <div class=\"timeline-meta\">\n                    <span class=\"timeline-date\">\n                      <i class=\"pi pi-calendar\"></i>\n                      {{ evt.occurredAtUtc | date:'MMM d, yyyy' }}\n                    </span>\n                    <span class=\"timeline-time\">\n                      <i class=\"pi pi-clock\"></i>\n                      {{ evt.occurredAtUtc | date:'h:mm a' }}\n                    </span>\n                  </div>\n                  <p class=\"timeline-description\" *ngIf=\"evt.description\">{{ evt.description }}</p>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"timeline-empty\" *ngIf=\"timelineEvents().length === 0\">\n              <i class=\"pi pi-info-circle\"></i>\n              <span>No timeline events recorded yet.</span>\n            </div>\n          </section>\n        </div>\n      </div>\n\n      <!-- \u2550\u2550\u2550 TAB: SHOWINGS (X3) \u2550\u2550\u2550 -->\n      <section class=\"tab-panel\" *ngIf=\"activeTab() === 'showings'\">\n        <div class=\"detail-card\">\n          <div class=\"card-header-bar\">\n            <h2 class=\"card-title\"><i class=\"pi pi-calendar\"></i> Showing Log</h2>\n            <button *ngIf=\"canEdit\" type=\"button\" class=\"action-btn action-btn--add\" (click)=\"onLogShowing()\">\n              <span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span>\n              <span>Schedule Showing</span>\n            </button>\n          </div>\n          <div class=\"showings-table\" *ngIf=\"showings().length; else noShowings\">\n            <table class=\"data-table\">\n              <thead>\n                <tr>\n                  <th>Visitor</th>\n                  <th>Date &amp; Time</th>\n                  <th>Duration</th>\n                  <th>Status</th>\n                  <th>Rating</th>\n                  <th>Feedback</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr *ngFor=\"let s of showings()\" class=\"table-row\">\n                  <td>\n                    <div class=\"visitor-info\">\n                      <span class=\"visitor-name\">{{ s.visitorName }}</span>\n                      <span class=\"visitor-email\" *ngIf=\"s.visitorEmail\">{{ s.visitorEmail }}</span>\n                    </div>\n                  </td>\n                  <td>{{ s.scheduledAtUtc | date:'MMM d, yyyy h:mm a' }}</td>\n                  <td>{{ s.durationMinutes ? s.durationMinutes + ' min' : '\u2014' }}</td>\n                  <td>\n                    <p-tag [value]=\"s.status\" [severity]=\"showingSeverity(s.status)\"></p-tag>\n                  </td>\n                  <td>\n                    <span class=\"rating-stars\" *ngIf=\"s.rating\">\n                      <i class=\"pi pi-star-fill\" *ngFor=\"let star of [1,2,3,4,5]; let i = index\"\n                         [class.star-active]=\"i < (s.rating || 0)\"></i>\n                    </span>\n                    <span *ngIf=\"!s.rating\">\u2014</span>\n                  </td>\n                  <td>\n                    <span class=\"feedback-text\" *ngIf=\"s.feedback\">{{ s.feedback }}</span>\n                    <span *ngIf=\"!s.feedback\">\u2014</span>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n          <ng-template #noShowings>\n            <div class=\"empty-state\">\n              <i class=\"pi pi-calendar empty-icon\"></i>\n              <p>No showings scheduled yet.</p>\n              <button *ngIf=\"canEdit\" type=\"button\" class=\"action-btn action-btn--add\" (click)=\"onLogShowing()\">\n                <span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span>\n                <span>Schedule First Showing</span>\n              </button>\n            </div>\n          </ng-template>\n        </div>\n      </section>\n\n      <!-- \u2550\u2550\u2550 TAB: DOCUMENTS (X1) \u2550\u2550\u2550 -->\n      <section class=\"tab-panel\" *ngIf=\"activeTab() === 'documents'\">\n        <div class=\"detail-card\">\n          <div class=\"card-header-bar\">\n            <h2 class=\"card-title\"><i class=\"pi pi-file\"></i> Documents &amp; Attachments</h2>\n            <button *ngIf=\"canEdit\" type=\"button\" class=\"action-btn action-btn--add\" (click)=\"onUploadDocument()\">\n              <span class=\"action-btn__icon\"><i class=\"pi pi-upload\"></i></span>\n              <span>Upload Document</span>\n            </button>\n          </div>\n          <div class=\"documents-grid\" *ngIf=\"documents().length; else noDocs\">\n            <div class=\"document-card\" *ngFor=\"let doc of documents()\">\n              <div class=\"doc-icon\">\n                <i class=\"pi\" [ngClass]=\"docCategoryIcon(doc.category)\"></i>\n              </div>\n              <div class=\"doc-info\">\n                <span class=\"doc-name\">{{ doc.fileName }}</span>\n                <div class=\"doc-meta\">\n                  <span class=\"doc-category\">{{ doc.category }}</span>\n                  <span class=\"doc-size\" *ngIf=\"doc.fileSize\">{{ formatFileSize(doc.fileSize) }}</span>\n                  <span class=\"doc-date\">{{ doc.uploadedAtUtc | date:'MMM d, yyyy' }}</span>\n                </div>\n                <span class=\"doc-uploader\" *ngIf=\"doc.uploadedBy\">By {{ doc.uploadedBy }}</span>\n              </div>\n              <div class=\"doc-actions\">\n                <button *ngIf=\"canEdit\" type=\"button\" class=\"row-action-btn row-action-btn--delete\" title=\"Delete\"\n                        (click)=\"onDeleteDocument(doc.id)\">\n                  <i class=\"pi pi-trash\"></i>\n                </button>\n              </div>\n            </div>\n          </div>\n          <ng-template #noDocs>\n            <div class=\"empty-state\">\n              <i class=\"pi pi-file empty-icon\"></i>\n              <p>No documents uploaded yet.</p>\n              <button *ngIf=\"canEdit\" type=\"button\" class=\"action-btn action-btn--add\" (click)=\"onUploadDocument()\">\n                <span class=\"action-btn__icon\"><i class=\"pi pi-upload\"></i></span>\n                <span>Upload First Document</span>\n              </button>\n            </div>\n          </ng-template>\n        </div>\n      </section>\n\n      <!-- \u2550\u2550\u2550 TAB: PRICE HISTORY (X4) \u2550\u2550\u2550 -->\n      <section class=\"tab-panel\" *ngIf=\"activeTab() === 'priceHistory'\">\n        <div class=\"detail-card\">\n          <div class=\"card-header-bar\">\n            <h2 class=\"card-title\"><i class=\"pi pi-chart-line\"></i> Price Change History</h2>\n          </div>\n          <div class=\"price-timeline\" *ngIf=\"priceHistory().length; else noPriceHistory\">\n            <div class=\"price-event\" *ngFor=\"let pc of priceHistory(); let last = last\"\n                 [class.price-event--up]=\"priceChangeDirection(pc) === 'up'\"\n                 [class.price-event--down]=\"priceChangeDirection(pc) === 'down'\">\n              <div class=\"price-marker\">\n                <span class=\"price-dot\">\n                  <i class=\"pi\" [ngClass]=\"priceChangeDirection(pc) === 'up' ? 'pi-arrow-up' : 'pi-arrow-down'\"></i>\n                </span>\n                <span class=\"price-line\" *ngIf=\"!last\"></span>\n              </div>\n              <div class=\"price-body\">\n                <div class=\"price-change-row\">\n                  <span class=\"price-from\">{{ formatCurrency(pc.previousPrice, prop.currency) }}</span>\n                  <i class=\"pi pi-arrow-right\"></i>\n                  <span class=\"price-to\">{{ formatCurrency(pc.newPrice, prop.currency) }}</span>\n                  <span class=\"price-pct\" [class.pct-up]=\"priceChangeDirection(pc) === 'up'\" [class.pct-down]=\"priceChangeDirection(pc) === 'down'\">\n                    {{ priceChangeDirection(pc) === 'up' ? '+' : '-' }}{{ priceChangePct(pc) }}%\n                  </span>\n                </div>\n                <div class=\"price-meta\">\n                  <span class=\"price-date\">{{ pc.changedAtUtc | date:'MMM d, yyyy' }}</span>\n                  <span class=\"price-by\" *ngIf=\"pc.changedBy\">by {{ pc.changedBy }}</span>\n                </div>\n                <span class=\"price-reason\" *ngIf=\"pc.reason\">{{ pc.reason }}</span>\n              </div>\n            </div>\n          </div>\n          <ng-template #noPriceHistory>\n            <div class=\"empty-state\">\n              <i class=\"pi pi-chart-line empty-icon\"></i>\n              <p>No price changes recorded.</p>\n            </div>\n          </ng-template>\n        </div>\n      </section>\n\n      <!-- \u2550\u2550\u2550 TAB: ACTIVITIES (X2) \u2550\u2550\u2550 -->\n      <section class=\"tab-panel\" *ngIf=\"activeTab() === 'activities'\">\n        <div class=\"detail-card\">\n          <div class=\"card-header-bar\">\n            <h2 class=\"card-title\"><i class=\"pi pi-list-check\"></i> Activities &amp; Tasks</h2>\n            <button *ngIf=\"canEdit\" type=\"button\" class=\"action-btn action-btn--add\" (click)=\"onAddActivity()\">\n              <span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span>\n              <span>Add Activity</span>\n            </button>\n          </div>\n          <div class=\"activities-list\" *ngIf=\"activities().length; else noActivities\">\n            <div class=\"activity-item\" *ngFor=\"let act of activities()\"\n                 [class.activity-item--completed]=\"act.status === 'Completed'\">\n              <div class=\"activity-icon\" [ngClass]=\"'activity-icon--' + act.type.toLowerCase()\">\n                <i class=\"pi\" [ngClass]=\"activityTypeIcon(act.type)\"></i>\n              </div>\n              <div class=\"activity-body\">\n                <div class=\"activity-header\">\n                  <span class=\"activity-subject\">{{ act.subject }}</span>\n                  <p-tag [value]=\"act.priority\" [severity]=\"prioritySeverity(act.priority)\" class=\"activity-priority\"></p-tag>\n                </div>\n                <div class=\"activity-meta\">\n                  <span class=\"activity-type\"><i class=\"pi\" [ngClass]=\"activityTypeIcon(act.type)\"></i> {{ activityTypeLabel(act.type) }}</span>\n                  <span class=\"activity-date\" *ngIf=\"act.dueDate\">\n                    <i class=\"pi pi-calendar\"></i> Due {{ act.dueDate | date:'MMM d, yyyy' }}\n                  </span>\n                  <span class=\"activity-status\">\n                    <i class=\"pi\" [ngClass]=\"act.status === 'Completed' ? 'pi-check-circle' : 'pi-clock'\"></i> {{ act.status }}\n                  </span>\n                </div>\n                <p class=\"activity-description\" *ngIf=\"act.description\">{{ act.description }}</p>\n              </div>\n              <div class=\"activity-actions\" *ngIf=\"canEdit && act.status !== 'Completed'\">\n                <button type=\"button\" class=\"row-action-btn row-action-btn--complete\" title=\"Mark Complete\"\n                        (click)=\"completeActivity(act.id)\">\n                  <i class=\"pi pi-check\"></i>\n                </button>\n              </div>\n            </div>\n          </div>\n          <ng-template #noActivities>\n            <div class=\"empty-state\">\n              <i class=\"pi pi-list-check empty-icon\"></i>\n              <p>No activities logged yet.</p>\n              <button *ngIf=\"canEdit\" type=\"button\" class=\"action-btn action-btn--add\" (click)=\"onAddActivity()\">\n                <span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span>\n                <span>Add First Activity</span>\n              </button>\n            </div>\n          </ng-template>\n        </div>\n      </section>\n\n      <!-- \u2550\u2550\u2550 TAB: CMA (G3) \u2550\u2550\u2550 -->\n      <section class=\"tab-panel\" *ngIf=\"activeTab() === 'cma'\">\n        <div class=\"detail-card\">\n          <div class=\"card-header-bar\">\n            <h2 class=\"card-title\"><i class=\"pi pi-chart-bar\"></i> Comparable Market Analysis</h2>\n            <button type=\"button\" class=\"action-btn action-btn--refresh\" (click)=\"generateCma()\">\n              <span class=\"action-btn__icon\"><i class=\"pi pi-refresh\"></i></span>\n              <span>Generate CMA</span>\n            </button>\n          </div>\n\n          <div *ngIf=\"cmaLoading()\" class=\"cma-loading\">\n            <p-skeleton width=\"100%\" height=\"5rem\" styleClass=\"mb-3\"></p-skeleton>\n            <p-skeleton width=\"100%\" height=\"12rem\"></p-skeleton>\n          </div>\n\n          <ng-container *ngIf=\"!cmaLoading() && cmaReport() as report\">\n            <!-- Summary KPIs -->\n            <div class=\"cma-summary\">\n              <div class=\"cma-kpi\">\n                <span class=\"cma-kpi__label\">Suggested Price</span>\n                <strong class=\"cma-kpi__value cma-kpi__value--primary\">{{ formatCurrency(report.summary.suggestedPrice, 'CAD') }}</strong>\n              </div>\n              <div class=\"cma-kpi\">\n                <span class=\"cma-kpi__label\">Avg Sale Price</span>\n                <strong class=\"cma-kpi__value\">{{ formatCurrency(report.summary.avgSalePrice, 'CAD') }}</strong>\n              </div>\n              <div class=\"cma-kpi\">\n                <span class=\"cma-kpi__label\">Avg $/sqft</span>\n                <strong class=\"cma-kpi__value\">{{ formatCurrency(report.summary.avgPricePerSqFt, 'CAD') }}</strong>\n              </div>\n              <div class=\"cma-kpi\">\n                <span class=\"cma-kpi__label\">Avg Days on Market</span>\n                <strong class=\"cma-kpi__value\">{{ report.summary.avgDaysOnMarket }}</strong>\n              </div>\n              <div class=\"cma-kpi\">\n                <span class=\"cma-kpi__label\">Market Trend</span>\n                <p-tag [value]=\"report.summary.marketTrend\" [severity]=\"marketTrendSeverity(report.summary.marketTrend)\"></p-tag>\n              </div>\n            </div>\n\n            <!-- Comparables Table -->\n            <div class=\"cma-table-wrap\">\n              <p-table [value]=\"report.comparables\" [rows]=\"10\" styleClass=\"p-datatable-sm\" responsiveLayout=\"scroll\">\n                <ng-template pTemplate=\"header\">\n                  <tr>\n                    <th>Address</th>\n                    <th>Type</th>\n                    <th>Status</th>\n                    <th>List Price</th>\n                    <th>Sale Price</th>\n                    <th>Sqft</th>\n                    <th>$/Sqft</th>\n                    <th>Bed/Bath</th>\n                    <th>Days</th>\n                    <th>Dist</th>\n                  </tr>\n                </ng-template>\n                <ng-template pTemplate=\"body\" let-comp>\n                  <tr>\n                    <td>\n                      <span class=\"comp-address\">{{ comp.address }}</span>\n                      <span class=\"comp-city\" *ngIf=\"comp.city\">{{ comp.city }}</span>\n                    </td>\n                    <td>{{ typeLabel(comp.propertyType) }}</td>\n                    <td><p-tag [value]=\"comp.status\" [severity]=\"cmaStatusSeverity(comp.status)\" [rounded]=\"true\"></p-tag></td>\n                    <td>{{ formatCurrency(comp.listPrice, 'CAD') }}</td>\n                    <td>{{ comp.salePrice ? formatCurrency(comp.salePrice, 'CAD') : '\u2014' }}</td>\n                    <td>{{ comp.squareFeet | number:'1.0-0' }}</td>\n                    <td>{{ comp.pricePerSqFt ? formatCurrency(comp.pricePerSqFt, 'CAD') : '\u2014' }}</td>\n                    <td>{{ comp.bedrooms }}/{{ comp.bathrooms }}</td>\n                    <td>{{ comp.daysOnMarket }}</td>\n                    <td>{{ comp.distanceMiles | number:'1.1-1' }} mi</td>\n                  </tr>\n                </ng-template>\n                <ng-template pTemplate=\"emptymessage\">\n                  <tr><td colspan=\"10\" class=\"text-center p-4\">No comparables found.</td></tr>\n                </ng-template>\n              </p-table>\n            </div>\n          </ng-container>\n\n          <div *ngIf=\"!cmaLoading() && !cmaReport()\" class=\"empty-state\">\n            <i class=\"pi pi-chart-bar empty-icon\"></i>\n            <p>No CMA report generated yet.</p>\n            <button type=\"button\" class=\"action-btn action-btn--add\" (click)=\"generateCma()\">\n              <span class=\"action-btn__icon\"><i class=\"pi pi-chart-bar\"></i></span>\n              <span>Generate CMA Report</span>\n            </button>\n          </div>\n        </div>\n      </section>\n\n      <!-- \u2550\u2550\u2550 TAB: E-SIGNATURE (G4) \u2550\u2550\u2550 -->\n      <section class=\"tab-panel\" *ngIf=\"activeTab() === 'esign'\">\n        <div class=\"detail-card\">\n          <div class=\"card-header-bar\">\n            <h2 class=\"card-title\"><i class=\"pi pi-pen-to-square\"></i> E-Signature Requests</h2>\n            <button *ngIf=\"canEdit\" type=\"button\" class=\"action-btn action-btn--add\" (click)=\"onAddSignatureRequest()\">\n              <span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span>\n              <span>Send for Signature</span>\n            </button>\n          </div>\n\n          <div class=\"esign-list\" *ngIf=\"signatureRequests().length; else noSignatures\">\n            <div class=\"esign-card\" *ngFor=\"let req of signatureRequests()\">\n              <div class=\"esign-card__header\">\n                <div class=\"esign-doc-info\">\n                  <i class=\"pi pi-file-pdf esign-doc-icon\"></i>\n                  <div>\n                    <strong class=\"esign-doc-name\">{{ req.documentName }}</strong>\n                    <span class=\"esign-doc-type\">{{ req.documentType }}</span>\n                  </div>\n                </div>\n                <p-tag [value]=\"req.status\" [severity]=\"signatureStatusSeverity(req.status)\" [rounded]=\"true\"></p-tag>\n              </div>\n              <div class=\"esign-card__meta\">\n                <span><i class=\"pi pi-building\"></i> {{ req.provider }}</span>\n                <span *ngIf=\"req.sentAtUtc\"><i class=\"pi pi-send\"></i> Sent {{ req.sentAtUtc | date:'MMM d, yyyy' }}</span>\n                <span *ngIf=\"req.completedAtUtc\"><i class=\"pi pi-check-circle\"></i> Completed {{ req.completedAtUtc | date:'MMM d, yyyy' }}</span>\n                <span><i class=\"pi pi-user\"></i> {{ req.createdByName }}</span>\n              </div>\n              <div class=\"esign-signers\">\n                <h4 class=\"esign-signers__title\">Signers</h4>\n                <div class=\"signer-row\" *ngFor=\"let signer of req.signers\">\n                  <div class=\"signer-info\">\n                    <span class=\"signer-name\">{{ signer.name }}</span>\n                    <span class=\"signer-email\">{{ signer.email }}</span>\n                    <span class=\"signer-role\">{{ signer.role }}</span>\n                  </div>\n                  <p-tag [value]=\"signer.status\" [severity]=\"signatureStatusSeverity(signer.status)\" [rounded]=\"true\" class=\"signer-status\"></p-tag>\n                </div>\n              </div>\n              <!-- DocuSign action buttons -->\n              <div class=\"esign-card__actions\" *ngIf=\"canEdit\">\n                <!-- Send: only for Draft status -->\n                <button *ngIf=\"req.status === 'Draft'\" type=\"button\"\n                        class=\"row-action-btn row-action-btn--complete\" title=\"Send via DocuSign\"\n                        [disabled]=\"sigActionLoading() === req.id\" (click)=\"sendEnvelope(req.id)\">\n                  <i class=\"pi pi-send\"></i>\n                </button>\n                <!-- Refresh status: for Sent or Viewed -->\n                <button *ngIf=\"req.status === 'Sent' || req.status === 'Viewed'\" type=\"button\"\n                        class=\"row-action-btn row-action-btn--view\" title=\"Refresh Status\"\n                        [disabled]=\"sigActionLoading() === req.id\" (click)=\"refreshSignatureStatus(req.id)\">\n                  <i class=\"pi pi-refresh\"></i>\n                </button>\n                <!-- Void: for Sent or Viewed (not already completed/declined) -->\n                <button *ngIf=\"req.status === 'Sent' || req.status === 'Viewed'\" type=\"button\"\n                        class=\"row-action-btn row-action-btn--delete\" title=\"Void Envelope\"\n                        [disabled]=\"sigActionLoading() === req.id\" (click)=\"openVoidDialog(req.id)\">\n                  <i class=\"pi pi-ban\"></i>\n                </button>\n                <!-- Download: for Signed status -->\n                <button *ngIf=\"req.status === 'Signed'\" type=\"button\"\n                        class=\"row-action-btn row-action-btn--view\" title=\"Download Signed Document\"\n                        [disabled]=\"sigActionLoading() === req.id\" (click)=\"downloadSignedDocument(req.id, req.documentName)\">\n                  <i class=\"pi pi-download\"></i>\n                </button>\n              </div>\n            </div>\n          </div>\n          <ng-template #noSignatures>\n            <div class=\"empty-state\">\n              <i class=\"pi pi-pen-to-square empty-icon\"></i>\n              <p>No signature requests yet.</p>\n              <button *ngIf=\"canEdit\" type=\"button\" class=\"action-btn action-btn--add\" (click)=\"onAddSignatureRequest()\">\n                <span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span>\n                <span>Send First Document</span>\n              </button>\n            </div>\n          </ng-template>\n        </div>\n\n        <!-- Void confirmation dialog -->\n        <p-dialog [visible]=\"showVoidDialog()\" (visibleChange)=\"showVoidDialog.set($event)\"\n                  header=\"Void Envelope\" [modal]=\"true\" [style]=\"{width: '420px'}\" [closable]=\"true\">\n          <p class=\"void-dialog-text\">Are you sure you want to void this envelope? This will cancel the signature request for all signers.</p>\n          <div class=\"form-field\" style=\"margin-top: 1rem;\">\n            <label for=\"void-reason\">Reason</label>\n            <input pInputText id=\"void-reason\" [ngModel]=\"voidReason()\" (ngModelChange)=\"voidReason.set($event)\" placeholder=\"Enter reason for voiding\" style=\"width: 100%;\" />\n          </div>\n          <ng-template pTemplate=\"footer\">\n            <button type=\"button\" class=\"action-btn action-btn--back\" (click)=\"showVoidDialog.set(false)\">\n              <span>Cancel</span>\n            </button>\n            <button type=\"button\" class=\"action-btn action-btn--delete\" (click)=\"confirmVoid()\" [disabled]=\"!voidReason()\">\n              <span class=\"action-btn__icon\"><i class=\"pi pi-ban\"></i></span>\n              <span>Void Envelope</span>\n            </button>\n          </ng-template>\n        </p-dialog>\n      </section>\n\n      <!-- \u2550\u2550\u2550 TAB: ALERTS (G5) \u2550\u2550\u2550 -->\n      <section class=\"tab-panel\" *ngIf=\"activeTab() === 'alerts'\">\n        <div class=\"detail-card\">\n          <div class=\"card-header-bar\">\n            <h2 class=\"card-title\"><i class=\"pi pi-bell\"></i> Property Alert Rules</h2>\n            <button *ngIf=\"canEdit\" type=\"button\" class=\"action-btn action-btn--add\" (click)=\"onAddAlertRule()\">\n              <span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span>\n              <span>Add Alert Rule</span>\n            </button>\n          </div>\n\n          <div class=\"alert-rules-list\" *ngIf=\"alertRules().length; else noAlertRules\">\n            <div class=\"alert-rule-card\" *ngFor=\"let rule of alertRules()\" [class.alert-rule-card--inactive]=\"!rule.isActive\">\n              <div class=\"alert-rule__header\">\n                <div class=\"alert-rule__client\">\n                  <div class=\"alert-rule__avatar\">\n                    <img\n                      [src]=\"$any(rule).profilePictureUrl || ('https://i.pravatar.cc/150?u=' + (rule.clientEmail || $any(rule).clientId || rule.id))\"\n                      [alt]=\"rule.clientName + ' avatar'\"\n                      [title]=\"rule.clientName + ' avatar'\"\n                    />\n                  </div>\n                  <div>\n                    <strong>{{ rule.clientName }}</strong>\n                    <span class=\"alert-rule__email\">{{ rule.clientEmail }}</span>\n                  </div>\n                </div>\n                <div class=\"alert-rule__toggle\">\n                  <button type=\"button\" class=\"toggle-btn\" [class.toggle-btn--active]=\"rule.isActive\"\n                          (click)=\"toggleAlertRule(rule.id, !rule.isActive)\" title=\"Toggle alert\">\n                    <span class=\"toggle-btn__slider\"></span>\n                  </button>\n                </div>\n              </div>\n              <div class=\"alert-rule__criteria\">\n                <span *ngIf=\"rule.criteria.minPrice || rule.criteria.maxPrice\">\n                  <i class=\"pi pi-dollar\"></i>\n                  {{ rule.criteria.minPrice ? formatCurrency(rule.criteria.minPrice, 'CAD') : 'Any' }}\n                  \u2013\n                  {{ rule.criteria.maxPrice ? formatCurrency(rule.criteria.maxPrice, 'CAD') : 'Any' }}\n                </span>\n                <span *ngIf=\"rule.criteria.minBedrooms\"><i class=\"pi pi-th-large\"></i> {{ rule.criteria.minBedrooms }}+ beds</span>\n                <span><i class=\"pi pi-clock\"></i> {{ rule.frequency }}</span>\n                <span><i class=\"pi pi-bell\"></i> {{ rule.matchCount }} matches</span>\n              </div>\n              <div class=\"alert-rule__footer\" *ngIf=\"rule.lastNotifiedAtUtc\">\n                <span class=\"alert-rule__last-notified\">Last sent {{ rule.lastNotifiedAtUtc | date:'MMM d, yyyy h:mm a' }}</span>\n              </div>\n            </div>\n          </div>\n          <ng-template #noAlertRules>\n            <div class=\"empty-state\">\n              <i class=\"pi pi-bell empty-icon\"></i>\n              <p>No alert rules configured.</p>\n              <button *ngIf=\"canEdit\" type=\"button\" class=\"action-btn action-btn--add\" (click)=\"onAddAlertRule()\">\n                <span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span>\n                <span>Create First Alert Rule</span>\n              </button>\n            </div>\n          </ng-template>\n        </div>\n\n        <!-- Alert Notifications History -->\n        <div class=\"detail-card mt-4\" *ngIf=\"alertNotifications().length\">\n          <h2 class=\"card-title\"><i class=\"pi pi-inbox\"></i> Notification History</h2>\n          <div class=\"notification-list\">\n            <div class=\"notification-item\" *ngFor=\"let notif of alertNotifications()\">\n              <div class=\"notification-icon\"><i class=\"pi pi-envelope\"></i></div>\n              <div class=\"notification-body\">\n                <strong>{{ notif.clientName }}</strong>\n                <span class=\"notification-meta\">{{ notif.clientEmail }} \u00B7 {{ notif.matchedProperties }} properties matched</span>\n                <span class=\"notification-date\">{{ notif.sentAtUtc | date:'MMM d, yyyy h:mm a' }}</span>\n              </div>\n              <p-tag [value]=\"notif.status\" [severity]=\"alertNotifStatusSeverity(notif.status)\" [rounded]=\"true\"></p-tag>\n            </div>\n          </div>\n        </div>\n      </section>\n    </ng-container>\n  </div>\n\n  <ng-template #pageLoading>\n    <div class=\"page-loading\">\n      <p-skeleton width=\"60%\" height=\"2rem\" styleClass=\"mb-3\"></p-skeleton>\n      <p-skeleton width=\"40%\" height=\"1.5rem\" styleClass=\"mb-4\"></p-skeleton>\n      <div class=\"kpi-skeleton\">\n        <p-skeleton width=\"100%\" height=\"5rem\" *ngFor=\"let i of [1,2,3,4,5]\"></p-skeleton>\n      </div>\n      <div class=\"grid-skeleton\">\n        <p-skeleton width=\"100%\" height=\"20rem\"></p-skeleton>\n        <p-skeleton width=\"100%\" height=\"20rem\"></p-skeleton>\n      </div>\n    </div>\n  </ng-template>\n</div>\n\n<!-- \u2550\u2550\u2550 DIALOG: CHANGE STATUS (X12) \u2550\u2550\u2550 -->\n<p-dialog header=\"Change Property Status\" [visible]=\"showStatusDialog()\" (visibleChange)=\"showStatusDialog.set($event)\" [modal]=\"true\" [style]=\"{ width: '400px' }\">\n  <div class=\"dialog-body\">\n    <div class=\"form-field\">\n      <label for=\"status-select\">New Status</label>\n      <p-select id=\"status-select\" [options]=\"statusOptions\" optionLabel=\"label\" optionValue=\"value\"\n                [ngModel]=\"selectedStatus()\" (ngModelChange)=\"selectedStatus.set($event)\" placeholder=\"Select status\" class=\"w-full\" appendTo=\"body\">\n        <ng-template pTemplate=\"item\" let-option>\n          <div class=\"select-option\"><i class=\"pi\" [ngClass]=\"option.icon\"></i><span>{{ option.label }}</span></div>\n        </ng-template>\n        <ng-template pTemplate=\"selectedItem\" let-option>\n          <div class=\"select-option\" *ngIf=\"option\"><i class=\"pi\" [ngClass]=\"option.icon\"></i><span>{{ option.label }}</span></div>\n        </ng-template>\n      </p-select>\n    </div>\n  </div>\n  <ng-template pTemplate=\"footer\">\n    <button type=\"button\" class=\"action-btn action-btn--settings\" (click)=\"showStatusDialog.set(false)\">\n      <span>Cancel</span>\n    </button>\n    <button type=\"button\" class=\"action-btn action-btn--add\" (click)=\"confirmStatusChange()\">\n      <span class=\"action-btn__icon\"><i class=\"pi pi-check\"></i></span>\n      <span>Confirm</span>\n    </button>\n  </ng-template>\n</p-dialog>\n\n<!-- \u2550\u2550\u2550 DIALOG: SCHEDULE SHOWING (X3) \u2550\u2550\u2550 -->\n<p-dialog header=\"Schedule Showing\" [visible]=\"showShowingDialog()\" (visibleChange)=\"showShowingDialog.set($event)\" [modal]=\"true\" [style]=\"{ width: '500px' }\">\n  <form [formGroup]=\"showingForm\" class=\"dialog-body\">\n    <div class=\"form-field\">\n      <label for=\"showing-visitor\">Visitor Name <span class=\"required\">*</span></label>\n      <p-inputgroup>\n        <p-inputgroup-addon class=\"icon-addon icon-addon--name\"><i class=\"pi pi-user\"></i></p-inputgroup-addon>\n        <input pInputText id=\"showing-visitor\" formControlName=\"visitorName\" placeholder=\"Enter visitor name\" />\n      </p-inputgroup>\n    </div>\n    <div class=\"form-field\">\n      <label for=\"showing-email\">Email</label>\n      <p-inputgroup>\n        <p-inputgroup-addon class=\"icon-addon icon-addon--email\"><i class=\"pi pi-envelope\"></i></p-inputgroup-addon>\n        <input pInputText id=\"showing-email\" formControlName=\"visitorEmail\" placeholder=\"visitor@email.com\" />\n      </p-inputgroup>\n    </div>\n    <div class=\"form-field\">\n      <label for=\"showing-phone\">Phone</label>\n      <p-inputgroup>\n        <p-inputgroup-addon class=\"icon-addon icon-addon--phone\"><i class=\"pi pi-phone\"></i></p-inputgroup-addon>\n        <input pInputText id=\"showing-phone\" formControlName=\"visitorPhone\" placeholder=\"+1 (555) 000-0000\" />\n      </p-inputgroup>\n    </div>\n    <div class=\"form-field\">\n      <label for=\"showing-date\">Date &amp; Time <span class=\"required\">*</span></label>\n      <input\n        pInputText\n        id=\"showing-date\"\n        type=\"datetime-local\"\n        class=\"w-full\"\n        [ngModel]=\"showingScheduledAtLocal\"\n        (ngModelChange)=\"onShowingScheduledAtChange($event)\"\n        [ngModelOptions]=\"{ standalone: true }\" />\n    </div>\n    <div class=\"form-field\">\n      <label for=\"showing-duration\">Duration (min)</label>\n      <p-inputgroup>\n        <p-inputgroup-addon class=\"icon-addon icon-addon--info\"><i class=\"pi pi-clock\"></i></p-inputgroup-addon>\n        <input pInputText id=\"showing-duration\" formControlName=\"durationMinutes\" type=\"number\" placeholder=\"30\" />\n      </p-inputgroup>\n    </div>\n  </form>\n  <ng-template pTemplate=\"footer\">\n    <button type=\"button\" class=\"action-btn action-btn--settings\" (click)=\"showShowingDialog.set(false)\">\n      <span>Cancel</span>\n    </button>\n    <button type=\"button\" class=\"action-btn action-btn--add\" (click)=\"submitShowing()\">\n      <span class=\"action-btn__icon\"><i class=\"pi pi-check\"></i></span>\n      <span>Schedule</span>\n    </button>\n  </ng-template>\n</p-dialog>\n\n<!-- \u2550\u2550\u2550 DIALOG: UPLOAD DOCUMENT (X1) \u2550\u2550\u2550 -->\n<p-dialog header=\"Upload Document\" [visible]=\"showDocumentDialog()\" (visibleChange)=\"showDocumentDialog.set($event)\" [modal]=\"true\" [style]=\"{ width: '500px' }\">\n  <form [formGroup]=\"documentForm\" class=\"dialog-body\">\n    <div class=\"form-field\">\n      <label for=\"doc-name\">File Name <span class=\"required\">*</span></label>\n      <p-inputgroup>\n        <p-inputgroup-addon class=\"icon-addon icon-addon--name\"><i class=\"pi pi-file\"></i></p-inputgroup-addon>\n        <input pInputText id=\"doc-name\" formControlName=\"fileName\" placeholder=\"Enter file name\" />\n      </p-inputgroup>\n    </div>\n    <div class=\"form-field\">\n      <label for=\"doc-category\">Category</label>\n      <p-select id=\"doc-category\" [options]=\"documentCategories\" optionLabel=\"label\" optionValue=\"value\"\n                formControlName=\"category\" placeholder=\"Select category\" class=\"w-full\" appendTo=\"body\"></p-select>\n    </div>\n    <div class=\"form-field\">\n      <label for=\"doc-url\">File URL</label>\n      <p-inputgroup>\n        <p-inputgroup-addon class=\"icon-addon icon-addon--website\"><i class=\"pi pi-link\"></i></p-inputgroup-addon>\n        <input pInputText id=\"doc-url\" formControlName=\"fileUrl\" placeholder=\"https://...\" />\n      </p-inputgroup>\n    </div>\n  </form>\n  <ng-template pTemplate=\"footer\">\n    <button type=\"button\" class=\"action-btn action-btn--settings\" (click)=\"showDocumentDialog.set(false)\">\n      <span>Cancel</span>\n    </button>\n    <button type=\"button\" class=\"action-btn action-btn--add\" (click)=\"submitDocument()\">\n      <span class=\"action-btn__icon\"><i class=\"pi pi-upload\"></i></span>\n      <span>Upload</span>\n    </button>\n  </ng-template>\n</p-dialog>\n\n<!-- \u2550\u2550\u2550 DIALOG: ADD ACTIVITY (X2) \u2550\u2550\u2550 -->\n<p-dialog header=\"Add Activity\" [visible]=\"showActivityDialog()\" (visibleChange)=\"showActivityDialog.set($event)\" [modal]=\"true\" [style]=\"{ width: '500px' }\">\n  <form [formGroup]=\"activityForm\" class=\"dialog-body\">\n    <div class=\"form-field\">\n      <label for=\"activity-type\">Type</label>\n      <p-select id=\"activity-type\" [options]=\"activityTypes\" optionLabel=\"label\" optionValue=\"value\"\n                formControlName=\"type\" placeholder=\"Select type\" class=\"w-full\" appendTo=\"body\">\n        <ng-template pTemplate=\"item\" let-option>\n          <div class=\"select-option\"><i class=\"pi\" [ngClass]=\"option.icon\"></i><span>{{ option.label }}</span></div>\n        </ng-template>\n        <ng-template pTemplate=\"selectedItem\" let-option>\n          <div class=\"select-option\" *ngIf=\"option\"><i class=\"pi\" [ngClass]=\"option.icon\"></i><span>{{ option.label }}</span></div>\n        </ng-template>\n      </p-select>\n    </div>\n    <div class=\"form-field\">\n      <label for=\"activity-subject\">Subject <span class=\"required\">*</span></label>\n      <p-inputgroup>\n        <p-inputgroup-addon class=\"icon-addon icon-addon--name\"><i class=\"pi pi-pencil\"></i></p-inputgroup-addon>\n        <input pInputText id=\"activity-subject\" formControlName=\"subject\" placeholder=\"Enter subject\" />\n      </p-inputgroup>\n    </div>\n    <div class=\"form-field\">\n      <label for=\"activity-description\">Description</label>\n      <textarea pTextarea id=\"activity-description\" formControlName=\"description\" rows=\"3\" placeholder=\"Optional details...\"></textarea>\n    </div>\n    <div class=\"form-field\">\n      <label for=\"activity-due\">Due Date</label>\n      <p-datepicker id=\"activity-due\" formControlName=\"dueDate\" [showTime]=\"false\" appendTo=\"body\"\n                    placeholder=\"Select due date\" class=\"w-full\"></p-datepicker>\n    </div>\n    <div class=\"form-field\">\n      <label for=\"activity-priority\">Priority</label>\n      <p-select id=\"activity-priority\" [options]=\"activityPriorities\" optionLabel=\"label\" optionValue=\"value\"\n                formControlName=\"priority\" placeholder=\"Select priority\" class=\"w-full\" appendTo=\"body\">\n        <ng-template pTemplate=\"item\" let-option>\n          <div class=\"select-option\"><i class=\"pi\" [ngClass]=\"option.icon\"></i><span>{{ option.label }}</span></div>\n        </ng-template>\n        <ng-template pTemplate=\"selectedItem\" let-option>\n          <div class=\"select-option\" *ngIf=\"option\"><i class=\"pi\" [ngClass]=\"option.icon\"></i><span>{{ option.label }}</span></div>\n        </ng-template>\n      </p-select>\n    </div>\n  </form>\n  <ng-template pTemplate=\"footer\">\n    <button type=\"button\" class=\"action-btn action-btn--settings\" (click)=\"showActivityDialog.set(false)\">\n      <span>Cancel</span>\n    </button>\n    <button type=\"button\" class=\"action-btn action-btn--add\" (click)=\"submitActivity()\">\n      <span class=\"action-btn__icon\"><i class=\"pi pi-check\"></i></span>\n      <span>Create</span>\n    </button>\n  </ng-template>\n</p-dialog>\n\n<!-- \u2550\u2550\u2550 DIALOG: SEND FOR SIGNATURE (G4) \u2550\u2550\u2550 -->\n<p-dialog header=\"Send for Signature\" [visible]=\"showSignatureDialog()\" (visibleChange)=\"showSignatureDialog.set($event)\" [modal]=\"true\" [style]=\"{ width: '520px' }\">\n  <form [formGroup]=\"signatureForm\" class=\"dialog-body\">\n    <div class=\"form-field\">\n      <label for=\"sig-doc-name\">Document Name <span class=\"required\">*</span></label>\n      <p-inputgroup>\n        <p-inputgroup-addon class=\"icon-addon icon-addon--name\"><i class=\"pi pi-file\"></i></p-inputgroup-addon>\n        <input pInputText id=\"sig-doc-name\" formControlName=\"documentName\" placeholder=\"e.g. Purchase Agreement\" />\n      </p-inputgroup>\n    </div>\n    <div class=\"form-field\">\n      <label for=\"sig-doc-type\">Document Type</label>\n      <p-select id=\"sig-doc-type\" [options]=\"signatureDocTypes\" optionLabel=\"label\" optionValue=\"value\"\n                formControlName=\"documentType\" class=\"w-full\" appendTo=\"body\">\n        <ng-template pTemplate=\"item\" let-option>\n          <div class=\"select-option\"><i class=\"pi\" [ngClass]=\"option.icon\"></i><span>{{ option.label }}</span></div>\n        </ng-template>\n        <ng-template pTemplate=\"selectedItem\" let-option>\n          <div class=\"select-option\" *ngIf=\"option\"><i class=\"pi\" [ngClass]=\"option.icon\"></i><span>{{ option.label }}</span></div>\n        </ng-template>\n      </p-select>\n    </div>\n    <div class=\"form-field\">\n      <label for=\"sig-provider\">Provider</label>\n      <p-select id=\"sig-provider\" [options]=\"signatureProviders\" optionLabel=\"label\" optionValue=\"value\"\n                formControlName=\"provider\" class=\"w-full\" appendTo=\"body\">\n        <ng-template pTemplate=\"item\" let-option>\n          <div class=\"select-option\"><i class=\"pi\" [ngClass]=\"option.icon\"></i><span>{{ option.label }}</span></div>\n        </ng-template>\n        <ng-template pTemplate=\"selectedItem\" let-option>\n          <div class=\"select-option\" *ngIf=\"option\"><i class=\"pi\" [ngClass]=\"option.icon\"></i><span>{{ option.label }}</span></div>\n        </ng-template>\n      </p-select>\n    </div>\n    <div class=\"form-field\">\n      <label for=\"sig-signer-name\">Signer Name <span class=\"required\">*</span></label>\n      <p-inputgroup>\n        <p-inputgroup-addon class=\"icon-addon icon-addon--company\"><i class=\"pi pi-user\"></i></p-inputgroup-addon>\n        <input pInputText id=\"sig-signer-name\" formControlName=\"signerName\" placeholder=\"Full name\" />\n      </p-inputgroup>\n    </div>\n    <div class=\"form-field\">\n      <label for=\"sig-signer-email\">Signer Email <span class=\"required\">*</span></label>\n      <p-inputgroup>\n        <p-inputgroup-addon class=\"icon-addon icon-addon--email\"><i class=\"pi pi-envelope\"></i></p-inputgroup-addon>\n        <input pInputText id=\"sig-signer-email\" formControlName=\"signerEmail\" type=\"email\" placeholder=\"email@example.com\" />\n      </p-inputgroup>\n    </div>\n    <div class=\"form-field\">\n      <label for=\"sig-signer-role\">Role</label>\n      <p-select id=\"sig-signer-role\" [options]=\"signerRoles\" optionLabel=\"label\" optionValue=\"value\"\n                formControlName=\"signerRole\" class=\"w-full\" appendTo=\"body\">\n        <ng-template pTemplate=\"item\" let-option>\n          <div class=\"select-option\"><i class=\"pi\" [ngClass]=\"option.icon\"></i><span>{{ option.label }}</span></div>\n        </ng-template>\n        <ng-template pTemplate=\"selectedItem\" let-option>\n          <div class=\"select-option\" *ngIf=\"option\"><i class=\"pi\" [ngClass]=\"option.icon\"></i><span>{{ option.label }}</span></div>\n        </ng-template>\n      </p-select>\n    </div>\n  </form>\n  <ng-template pTemplate=\"footer\">\n    <button type=\"button\" class=\"action-btn action-btn--settings\" (click)=\"showSignatureDialog.set(false)\">\n      <span>Cancel</span>\n    </button>\n    <button type=\"button\" class=\"action-btn action-btn--add\" (click)=\"submitSignatureRequest()\">\n      <span class=\"action-btn__icon\"><i class=\"pi pi-send\"></i></span>\n      <span>Send</span>\n    </button>\n  </ng-template>\n</p-dialog>\n\n<!-- \u2550\u2550\u2550 DIALOG: ADD ALERT RULE (G5) \u2550\u2550\u2550 -->\n<p-dialog header=\"Create Alert Rule\" [visible]=\"showAlertDialog()\" (visibleChange)=\"showAlertDialog.set($event)\" [modal]=\"true\" [style]=\"{ width: '520px' }\">\n  <form [formGroup]=\"alertForm\" class=\"dialog-body\">\n    <div class=\"form-field\">\n      <label for=\"alert-client-name\">Client Name <span class=\"required\">*</span></label>\n      <p-inputgroup>\n        <p-inputgroup-addon class=\"icon-addon icon-addon--company\"><i class=\"pi pi-user\"></i></p-inputgroup-addon>\n        <input pInputText id=\"alert-client-name\" formControlName=\"clientName\" placeholder=\"Client full name\" />\n      </p-inputgroup>\n    </div>\n    <div class=\"form-field\">\n      <label for=\"alert-client-email\">Client Email <span class=\"required\">*</span></label>\n      <p-inputgroup>\n        <p-inputgroup-addon class=\"icon-addon icon-addon--email\"><i class=\"pi pi-envelope\"></i></p-inputgroup-addon>\n        <input pInputText id=\"alert-client-email\" formControlName=\"clientEmail\" type=\"email\" placeholder=\"email@example.com\" />\n      </p-inputgroup>\n    </div>\n    <div class=\"form-field\">\n      <label for=\"alert-frequency\">Frequency</label>\n      <p-select id=\"alert-frequency\" [options]=\"alertFrequencies\" optionLabel=\"label\" optionValue=\"value\"\n                formControlName=\"frequency\" class=\"w-full\" appendTo=\"body\">\n        <ng-template pTemplate=\"item\" let-option>\n          <div class=\"select-option\"><i class=\"pi\" [ngClass]=\"option.icon\"></i><span>{{ option.label }}</span></div>\n        </ng-template>\n        <ng-template pTemplate=\"selectedItem\" let-option>\n          <div class=\"select-option\" *ngIf=\"option\"><i class=\"pi\" [ngClass]=\"option.icon\"></i><span>{{ option.label }}</span></div>\n        </ng-template>\n      </p-select>\n    </div>\n    <div class=\"form-field\">\n      <label for=\"alert-min-price\">Min Price</label>\n      <p-inputgroup>\n        <p-inputgroup-addon class=\"icon-addon icon-addon--success\"><i class=\"pi pi-dollar\"></i></p-inputgroup-addon>\n        <p-inputNumber id=\"alert-min-price\" formControlName=\"minPrice\" mode=\"currency\" currency=\"CAD\" [maxFractionDigits]=\"0\" placeholder=\"Minimum price\"></p-inputNumber>\n      </p-inputgroup>\n    </div>\n    <div class=\"form-field\">\n      <label for=\"alert-max-price\">Max Price</label>\n      <p-inputgroup>\n        <p-inputgroup-addon class=\"icon-addon icon-addon--warning\"><i class=\"pi pi-dollar\"></i></p-inputgroup-addon>\n        <p-inputNumber id=\"alert-max-price\" formControlName=\"maxPrice\" mode=\"currency\" currency=\"CAD\" [maxFractionDigits]=\"0\" placeholder=\"Maximum price\"></p-inputNumber>\n      </p-inputgroup>\n    </div>\n    <div class=\"form-field\">\n      <label for=\"alert-bedrooms\">Min Bedrooms</label>\n      <p-inputgroup>\n        <p-inputgroup-addon class=\"icon-addon icon-addon--industry\"><i class=\"pi pi-th-large\"></i></p-inputgroup-addon>\n        <p-inputNumber id=\"alert-bedrooms\" formControlName=\"minBedrooms\" [min]=\"0\" [max]=\"10\" placeholder=\"Min bedrooms\"></p-inputNumber>\n      </p-inputgroup>\n    </div>\n  </form>\n  <ng-template pTemplate=\"footer\">\n    <button type=\"button\" class=\"action-btn action-btn--settings\" (click)=\"showAlertDialog.set(false)\">\n      <span>Cancel</span>\n    </button>\n    <button type=\"button\" class=\"action-btn action-btn--add\" (click)=\"submitAlertRule()\">\n      <span class=\"action-btn__icon\"><i class=\"pi pi-check\"></i></span>\n      <span>Create Rule</span>\n    </button>\n  </ng-template>\n</p-dialog>\n\n<!-- \u2550\u2550\u2550 PHOTO LIGHTBOX \u2550\u2550\u2550 -->\n<div class=\"lightbox-overlay\" *ngIf=\"lightboxOpen()\" (click)=\"closeLightbox()\">\n  <button class=\"lightbox-close\" (click)=\"closeLightbox()\" title=\"Close (Esc)\">\n    <i class=\"pi pi-times\"></i>\n  </button>\n\n  <button class=\"lightbox-nav lightbox-nav--prev\"\n          *ngIf=\"photoUrlList().length > 1\"\n          (click)=\"$event.stopPropagation(); lightboxPrev()\"\n          title=\"Previous (\u2190)\">\n    <i class=\"pi pi-chevron-left\"></i>\n  </button>\n\n  <div class=\"lightbox-content\" (click)=\"$event.stopPropagation()\">\n    <img [src]=\"photoUrlList()[lightboxIndex()]\"\n         [alt]=\"'Photo ' + (lightboxIndex() + 1)\"\n         class=\"lightbox-image\" />\n    <div class=\"lightbox-counter\">\n      {{ lightboxIndex() + 1 }} / {{ photoUrlList().length }}\n    </div>\n  </div>\n\n  <button class=\"lightbox-nav lightbox-nav--next\"\n          *ngIf=\"photoUrlList().length > 1\"\n          (click)=\"$event.stopPropagation(); lightboxNext()\"\n          title=\"Next (\u2192)\">\n    <i class=\"pi pi-chevron-right\"></i>\n  </button>\n</div>\n", styles: ["@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// PAGE CONTAINER\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.page-container {\n  position: relative;\n  min-height: 100vh;\n  padding: $space-5 $space-6;\n  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 50%, #d8dde8 100%);\n  overflow-x: hidden;\n\n  @media (max-width: 768px) {\n    padding: $space-3;\n  }\n}\n\n.bg-orbs {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  z-index: 0;\n  overflow: hidden;\n}\n\n.orb {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(60px);\n  opacity: 0.4;\n  animation: orb-float 20s ease-in-out infinite;\n\n  &.orb-1 { width: 600px; height: 600px; background: $primary-gradient; top: -200px; right: -100px; }\n  &.orb-2 { width: 400px; height: 400px; background: $cyan-gradient; bottom: 10%; left: -100px; animation-delay: -7s; }\n  &.orb-3 { width: 300px; height: 300px; background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); top: 40%; right: 20%; animation-delay: -14s; }\n}\n\n.page-content {\n  position: relative;\n  z-index: 1;\n  max-width: 1400px;\n  margin: 0 auto;\n  animation: fade-in-up 0.5s ease-out;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// HERO SECTION\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.hero-section {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: $space-6;\n  margin-bottom: $space-5;\n  animation: fade-in-up 0.5s ease-out;\n\n  @media (max-width: 1024px) {\n    grid-template-columns: 1fr;\n    gap: $space-4;\n  }\n}\n\n.hero-left {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.hero-nav {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  margin-bottom: $space-1;\n}\n\n.back-link {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $gray-500;\n  text-decoration: none;\n  transition: color 200ms;\n\n  &:hover { color: $primary; }\n\n  i { font-size: $font-size-sm; }\n}\n\n.edit-link {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $primary;\n  text-decoration: none;\n  padding: $space-1 $space-2;\n  background: rgba($primary, 0.08);\n  border-radius: $radius-md;\n  transition: all 200ms;\n\n  &:hover {\n    background: rgba($primary, 0.14);\n    transform: translateY(-1px);\n  }\n\n  i { font-size: $font-size-sm; }\n}\n\n.hero-title {\n  font-size: $font-size-4xl;\n  font-weight: 800;\n  letter-spacing: -0.5px;\n  line-height: 1.1;\n  margin: 0 0 $space-1;\n\n  .title-gradient {\n    background: $primary-gradient;\n    background-size: 200% auto;\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n    animation: gradient-shift 4s ease-in-out infinite;\n  }\n\n  @media (max-width: 768px) {\n    font-size: $font-size-2xl;\n  }\n}\n\n.hero-meta {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  flex-wrap: wrap;\n}\n\n.hero-badge {\n  display: inline-flex;\n  padding: $space-1 $space-3;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  border-radius: $radius-full;\n  text-transform: capitalize;\n\n  &.status--active { background: rgba(#22c55e, 0.15); color: color.adjust(#22c55e, $lightness: -15%); }\n  &.status--conditional { background: rgba(#f59e0b, 0.15); color: color.adjust(#f59e0b, $lightness: -15%); }\n  &.status--sold { background: rgba(#3b82f6, 0.15); color: color.adjust(#3b82f6, $lightness: -10%); }\n  &.status--draft { background: rgba($gray-500, 0.15); color: $gray-600; }\n  &.status--inactive { background: rgba(#ef4444, 0.15); color: color.adjust(#ef4444, $lightness: -10%); }\n  &.status--default { background: rgba($gray-400, 0.12); color: $gray-600; }\n}\n\n.hero-type,\n.hero-mls,\n.hero-location {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-sm;\n  color: $gray-500;\n\n  i { font-size: $font-size-sm; }\n}\n\n.hero-right {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: $space-3;\n  animation: slide-in-right 0.6s ease-out 0.2s both;\n\n  @media (max-width: 1024px) {\n    flex-direction: row;\n    align-items: center;\n    gap: $space-6;\n  }\n}\n\n.hero-price,\n.hero-sale-price {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 2px;\n\n  @media (max-width: 1024px) {\n    align-items: flex-start;\n  }\n}\n\n.hero-price-value {\n  font-size: $font-size-3xl;\n  font-weight: 800;\n  color: $gray-800;\n\n  @media (max-width: 768px) {\n    font-size: $font-size-2xl;\n  }\n}\n\n.hero-price-label,\n.hero-sale-label {\n  font-size: $font-size-xs;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: $gray-500;\n}\n\n.hero-sale-value {\n  font-size: $font-size-2xl;\n  font-weight: 700;\n  color: #22c55e;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// KPI CARDS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.kpi-section {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: $space-3;\n  margin-bottom: $space-5;\n  animation: fade-in-up 0.5s ease-out 0.15s both;\n\n  @media (max-width: 1200px) { grid-template-columns: repeat(3, 1fr); }\n  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }\n  @media (max-width: 480px) { grid-template-columns: 1fr; }\n}\n\n.kpi-card {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: #ffffff;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: $radius-lg;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(0, 0, 0, 0.04);\n  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  animation: fade-in-up 0.5s ease-out backwards;\n\n  @for $i from 1 through 5 {\n    &:nth-child(#{$i}) { animation-delay: #{0.1 + $i * 0.05}s; }\n  }\n\n  &:hover {\n    transform: translateY(-4px);\n    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.05);\n\n    .kpi-icon { transform: scale(1.1) rotate(5deg); }\n  }\n}\n\n.kpi-icon {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: $radius-md;\n  font-size: $font-size-lg;\n  color: white;\n  flex-shrink: 0;\n  transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1);\n\n  .kpi-card--sqft & { background: $primary-gradient; }\n  .kpi-card--beds & { background: $cyan-gradient; }\n  .kpi-card--baths & { background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); }\n  .kpi-card--age & { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }\n  .kpi-card--ppsqft & { background: $success-gradient; }\n}\n\n.kpi-content {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.kpi-label {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.kpi-value {\n  font-size: $font-size-2xl;\n  font-weight: 700;\n  color: $gray-800;\n\n  &--muted { color: $gray-400; }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// DETAIL GRID\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.detail-grid {\n  display: grid;\n  grid-template-columns: 1.2fr 0.8fr;\n  gap: $space-4;\n  animation: fade-in-up 0.5s ease-out 0.3s both;\n\n  @media (max-width: 1024px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.detail-col {\n  display: flex;\n  flex-direction: column;\n  gap: $space-4;\n}\n\n.detail-card {\n  background: #ffffff;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: $radius-xl;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 6px 20px rgba(0, 0, 0, 0.04);\n  padding: $space-4 $space-5;\n  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &:hover {\n    transform: translateY(-3px);\n    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.1), 0 6px 16px rgba(0, 0, 0, 0.05);\n  }\n\n  @media (max-width: 768px) {\n    padding: $space-3 $space-4;\n  }\n}\n\n.card-shell {\n  margin-bottom: $space-4;\n}\n\n.card-header-detail {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: $space-3;\n  padding-bottom: $space-3;\n  border-bottom: 1px solid rgba(15, 23, 42, 0.08);\n\n  @media (max-width: 768px) {\n    flex-direction: column;\n  }\n}\n\n.card-header-copy {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n}\n\n.card-kicker {\n  display: inline-flex;\n  align-items: center;\n  width: fit-content;\n  padding: 0.35rem 0.7rem;\n  border-radius: $radius-full;\n  background: rgba(14, 116, 144, 0.1);\n  color: #0f766e;\n  font-size: $font-size-xs;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.card-title {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-lg;\n  font-weight: 600;\n  color: $gray-800;\n  margin: 0;\n\n  i {\n    font-size: $font-size-base;\n    color: #06b6d4;\n  }\n}\n\n.card-subtitle {\n  margin: 0;\n  max-width: 46rem;\n  font-size: $font-size-sm;\n  line-height: 1.55;\n  color: $gray-500;\n}\n\n.card-badge-stack {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: $space-2;\n\n  @media (max-width: 768px) {\n    justify-content: flex-start;\n  }\n}\n\n.mini-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.45rem 0.8rem;\n  border-radius: $radius-full;\n  background: rgba(102, 126, 234, 0.08);\n  border: 1px solid rgba(102, 126, 234, 0.14);\n  color: #4f46e5;\n  font-size: $font-size-xs;\n  font-weight: 700;\n  letter-spacing: 0.02em;\n\n  &--accent {\n    background: rgba(34, 197, 94, 0.1);\n    border-color: rgba(34, 197, 94, 0.18);\n    color: #15803d;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// DETAIL FIELDS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.detail-fields {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: $space-3;\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.detail-field {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n  min-height: 5rem;\n  padding: $space-3;\n  border-radius: $radius-lg;\n  background:\n    linear-gradient(180deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.46));\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);\n\n  &--span-2 {\n    grid-column: span 2;\n\n    @media (max-width: 600px) {\n      grid-column: span 1;\n    }\n  }\n\n  &--spotlight {\n    background: linear-gradient(135deg, rgba(102, 126, 234, 0.12), rgba(6, 182, 212, 0.08));\n    border-color: rgba(102, 126, 234, 0.2);\n  }\n}\n\n.field-label {\n  font-size: $font-size-xs;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: $gray-500;\n}\n\n.field-value {\n  font-size: $font-size-md;\n  font-weight: 600;\n  color: $gray-900;\n  line-height: 1.4;\n\n  &--price {\n    font-size: $font-size-lg;\n    font-weight: 700;\n    color: $gray-900;\n  }\n}\n\n.field-link {\n  font-size: $font-size-md;\n  font-weight: 600;\n  color: #667eea;\n  text-decoration: none;\n  transition: color 200ms;\n\n  &:hover {\n    color: #764ba2;\n    text-decoration: underline;\n  }\n}\n\n.features-text {\n  padding: $space-4;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n  margin-top: $space-2;\n  border-radius: $radius-lg;\n  background: rgba(255, 255, 255, 0.4);\n\n  .field-label {\n    display: block;\n    margin-bottom: $space-1;\n  }\n\n  .field-value {\n    white-space: pre-line;\n    line-height: 1.6;\n  }\n}\n\n.detail-fields--pricing {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.detail-fields--links,\n.detail-fields--specs {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.pricing-hero {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: $space-3;\n  margin-bottom: $space-3;\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.pricing-hero__item {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n  padding: $space-3 $space-4;\n  border-radius: $radius-xl;\n  background: linear-gradient(135deg, rgba(102, 126, 234, 0.12), rgba(6, 182, 212, 0.09));\n  border: 1px solid rgba(102, 126, 234, 0.16);\n}\n\n.pricing-hero__label {\n  font-size: $font-size-xs;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: $gray-500;\n}\n\n.pricing-hero__value {\n  font-size: clamp(1.4rem, 2.6vw, 2rem);\n  line-height: 1.1;\n  font-weight: 800;\n  color: #1f2937;\n\n  &--success {\n    color: #15803d;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// STATUS PILL\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.status-pill {\n  display: inline-flex;\n  padding: 2px $space-2;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  border-radius: $radius-full;\n\n  &.status--active { background: rgba(#22c55e, 0.15); color: color.adjust(#22c55e, $lightness: -15%); }\n  &.status--conditional { background: rgba(#f59e0b, 0.15); color: color.adjust(#f59e0b, $lightness: -15%); }\n  &.status--sold { background: rgba(#3b82f6, 0.15); color: color.adjust(#3b82f6, $lightness: -10%); }\n  &.status--draft { background: rgba($gray-500, 0.15); color: $gray-600; }\n  &.status--inactive { background: rgba(#ef4444, 0.15); color: color.adjust(#ef4444, $lightness: -10%); }\n  &.status--default { background: rgba($gray-400, 0.12); color: $gray-600; }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// DESCRIPTION\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.description-text {\n  font-size: $font-size-md;\n  color: $gray-700;\n  line-height: 1.7;\n  margin: 0;\n  white-space: pre-wrap;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// EMPTY STATE CTA\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.empty-state-cta {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: $space-4;\n  text-align: center;\n}\n\n.empty-text {\n  font-size: $font-size-sm;\n  color: $gray-400;\n  margin: 0 0 $space-2;\n}\n\n.cta-link {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  padding: $space-1 $space-3;\n  background: rgba($primary, 0.08);\n  border: none;\n  border-radius: $radius-md;\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $primary;\n  cursor: pointer;\n  transition: all 200ms;\n  text-decoration: none;\n\n  &:hover {\n    background: rgba($primary, 0.14);\n    transform: translateY(-1px);\n  }\n\n  i { font-size: $font-size-sm; }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// LIVE ALERTS (X9 \u2013 SignalR)\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.live-alerts-section {\n  margin-bottom: $space-4;\n  animation: fade-in-up 0.4s ease-out;\n}\n\n.live-alerts-card {\n  background: rgba(255, 255, 255, 0.9);\n  backdrop-filter: blur(20px);\n  border: 1px solid rgba(59, 130, 246, 0.2);\n  border-radius: $radius-lg;\n  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.08);\n  overflow: hidden;\n}\n\n.live-alerts-header {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n  background: linear-gradient(135deg, rgba(59, 130, 246, 0.06) 0%, rgba(99, 102, 241, 0.04) 100%);\n}\n\n.live-dot {\n  width: 8px;\n  height: 8px;\n  background: #22c55e;\n  border-radius: 50%;\n  animation: pulse-glow 2s ease-in-out infinite;\n}\n\n.live-label {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: #3b82f6;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.live-count {\n  background: rgba(59, 130, 246, 0.12);\n  color: #3b82f6;\n  font-size: 0.75rem;\n  font-weight: 700;\n  padding: 1px 8px;\n  border-radius: $radius-full;\n}\n\n.live-clear {\n  margin-left: auto;\n  background: none;\n  border: none;\n  color: $gray-400;\n  cursor: pointer;\n  padding: $space-1;\n  border-radius: $radius-sm;\n  transition: all 200ms;\n\n  &:hover {\n    color: $gray-600;\n    background: rgba(0, 0, 0, 0.05);\n  }\n}\n\n.live-alerts-list {\n  max-height: 200px;\n  overflow-y: auto;\n}\n\n.live-alert {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-2 $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.03);\n  animation: fade-in-up 0.3s ease-out;\n  transition: background 150ms;\n\n  &:last-child { border-bottom: none; }\n  &:hover { background: rgba(0, 0, 0, 0.02); }\n}\n\n.alert-icon {\n  width: 28px;\n  height: 28px;\n  border-radius: $radius-sm;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: $font-size-sm;\n  color: white;\n  flex-shrink: 0;\n\n  &--price { background: linear-gradient(135deg, #22c55e, #16a34a); }\n  &--showing { background: linear-gradient(135deg, #3b82f6, #2563eb); }\n  &--status { background: linear-gradient(135deg, #a855f7, #9333ea); }\n  &--document { background: linear-gradient(135deg, #f59e0b, #d97706); }\n  &--activity { background: linear-gradient(135deg, #06b6d4, #0891b2); }\n  &--info { background: linear-gradient(135deg, #6366f1, #4f46e5); }\n}\n\n.alert-body {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n\n.alert-message {\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $gray-700;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.alert-time {\n  font-size: $font-size-xs;\n  color: $gray-400;\n}\n\n.alert-dismiss {\n  background: none;\n  border: none;\n  color: $gray-300;\n  cursor: pointer;\n  padding: 4px;\n  border-radius: $radius-sm;\n  opacity: 0;\n  transition: all 200ms;\n  flex-shrink: 0;\n\n  .live-alert:hover & { opacity: 1; }\n\n  &:hover {\n    color: $gray-600;\n    background: rgba(0, 0, 0, 0.05);\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// PHOTO GALLERY\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.gallery-section {\n  margin-bottom: $space-5;\n  animation: fade-in-up 0.5s ease-out 0.15s both;\n}\n\n.gallery-card {\n  background: #ffffff;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: $radius-2xl;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 6px 20px rgba(0, 0, 0, 0.04);\n  padding: $space-4;\n  overflow: hidden;\n  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &:hover {\n    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.1), 0 6px 16px rgba(0, 0, 0, 0.05);\n  }\n}\n\n.gallery-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: $space-3;\n  margin-top: $space-3;\n\n  @media (max-width: 600px) {\n    grid-template-columns: repeat(2, 1fr);\n    gap: $space-2;\n  }\n}\n\n.gallery-item {\n  position: relative;\n  border-radius: $radius-lg;\n  overflow: hidden;\n  aspect-ratio: 4 / 3;\n  background: $gray-100;\n  cursor: pointer;\n  transition: transform 250ms, box-shadow 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n\n    .gallery-item-overlay {\n      opacity: 1;\n    }\n  }\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    display: block;\n  }\n}\n\n.gallery-item-overlay {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(0, 0, 0, 0.3);\n  opacity: 0;\n  transition: opacity 250ms;\n\n  i {\n    color: #fff;\n    font-size: 1.5rem;\n  }\n}\n\n// \u2550\u2550\u2550 PHOTO LIGHTBOX \u2550\u2550\u2550\n.lightbox-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 10000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(0, 0, 0, 0.92);\n  animation: lightbox-fade-in 200ms ease-out;\n}\n\n.lightbox-close {\n  position: absolute;\n  top: 1rem;\n  right: 1rem;\n  z-index: 2;\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(255, 255, 255, 0.12);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 50%;\n  color: #fff;\n  font-size: 1.25rem;\n  cursor: pointer;\n  transition: background 200ms, transform 200ms;\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.25);\n    transform: scale(1.1);\n  }\n}\n\n.lightbox-nav {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  z-index: 2;\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 50%;\n  color: #fff;\n  font-size: 1.25rem;\n  cursor: pointer;\n  transition: background 200ms, transform 200ms;\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.25);\n    transform: translateY(-50%) scale(1.1);\n  }\n\n  &--prev { left: 1.5rem; }\n  &--next { right: 1.5rem; }\n}\n\n.lightbox-content {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  max-width: 90vw;\n  max-height: 90vh;\n}\n\n.lightbox-image {\n  max-width: 90vw;\n  max-height: 82vh;\n  object-fit: contain;\n  border-radius: $radius-md;\n  animation: lightbox-zoom-in 250ms ease-out;\n}\n\n.lightbox-counter {\n  margin-top: 0.75rem;\n  padding: 0.25rem 1rem;\n  background: rgba(255, 255, 255, 0.12);\n  border-radius: $radius-full;\n  color: rgba(255, 255, 255, 0.8);\n  font-size: $font-size-sm;\n  font-weight: 500;\n  letter-spacing: 0.05em;\n}\n\n@keyframes lightbox-fade-in {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n@keyframes lightbox-zoom-in {\n  from { opacity: 0; transform: scale(0.92); }\n  to { opacity: 1; transform: scale(1); }\n}\n\n.virtual-tour {\n  margin-top: $space-3;\n}\n\n.tour-link {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-4;\n  background: $primary-gradient;\n  color: white;\n  border-radius: $radius-md;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  text-decoration: none;\n  transition: all 250ms;\n  box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);\n  }\n\n  i { font-size: $font-size-sm; }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// LOADING\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.page-loading {\n  position: relative;\n  z-index: 1;\n  max-width: 1400px;\n  margin: 0 auto;\n  padding: $space-6 0;\n}\n\n.kpi-skeleton {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: $space-3;\n  margin: $space-5 0;\n\n  @media (max-width: 1200px) { grid-template-columns: repeat(3, 1fr); }\n  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }\n}\n\n.grid-skeleton {\n  display: grid;\n  grid-template-columns: 1.2fr 0.8fr;\n  gap: $space-4;\n\n  @media (max-width: 1024px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// ANIMATIONS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n@keyframes fade-in-up {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// STATUS TIMELINE\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n// \u2550\u2550\u2550 TIMELINE SUMMARY \u2550\u2550\u2550\n.timeline-summary {\n  display: flex;\n  gap: $space-3;\n  padding: 0 $space-4 $space-3;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  margin-bottom: $space-3;\n}\n\n.timeline-summary-stat {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: $space-2 $space-4;\n  background: $gray-50;\n  border-radius: $radius-md;\n  min-width: 80px;\n\n  .summary-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .summary-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.04em;\n  }\n}\n\n// \u2550\u2550\u2550 TIMELINE \u2550\u2550\u2550\n.status-timeline {\n  display: flex;\n  flex-direction: column;\n  padding: $space-2 $space-4;\n}\n\n.timeline-event {\n  display: flex;\n  gap: $space-3;\n  min-height: 72px;\n\n  .timeline-marker {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    width: 36px;\n    flex-shrink: 0;\n  }\n\n  .marker-dot {\n    width: 36px;\n    height: 36px;\n    border-radius: 50%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: $font-size-sm;\n    color: white;\n    flex-shrink: 0;\n    z-index: 1;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n    transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);\n  }\n\n  .marker-line {\n    flex: 1;\n    width: 2px;\n    background: $gray-200;\n    margin: 4px 0;\n  }\n\n  // Event card\n  .timeline-card {\n    flex: 1;\n    padding: $space-2 $space-3;\n    margin-bottom: $space-2;\n    background: $gray-50;\n    border: 1px solid rgba(0, 0, 0, 0.05);\n    border-radius: $radius-lg;\n    transition: background 200ms, box-shadow 200ms;\n  }\n\n  .timeline-card-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: $space-2;\n    margin-bottom: $space-1;\n  }\n\n  .timeline-label {\n    font-size: $font-size-md;\n    font-weight: 600;\n    color: $gray-800;\n  }\n\n  .timeline-type-badge {\n    display: inline-flex;\n    padding: 1px $space-2;\n    font-size: 0.6875rem;\n    font-weight: 600;\n    border-radius: $radius-full;\n    text-transform: uppercase;\n    letter-spacing: 0.04em;\n    white-space: nowrap;\n\n    &--created  { background: rgba(102, 126, 234, 0.12); color: #4f5cd9; }\n    &--listed   { background: rgba(6, 182, 212, 0.12);   color: #0891b2; }\n    &--updated  { background: rgba(245, 158, 11, 0.12);  color: #b45309; }\n    &--sold     { background: rgba(34, 197, 94, 0.12);   color: #16a34a; }\n    &--price    { background: rgba(168, 85, 247, 0.12);  color: #7c3aed; }\n    &--status   { background: rgba(59, 130, 246, 0.12);  color: #2563eb; }\n    &--showing  { background: rgba(236, 72, 153, 0.12);  color: #db2777; }\n  }\n\n  .timeline-meta {\n    display: flex;\n    align-items: center;\n    gap: $space-3;\n    margin-bottom: $space-1;\n  }\n\n  .timeline-date,\n  .timeline-time {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    font-size: $font-size-xs;\n    color: $gray-500;\n\n    i { font-size: 0.7rem; }\n  }\n\n  .timeline-description {\n    margin: $space-1 0 0;\n    font-size: $font-size-sm;\n    color: $gray-600;\n    line-height: 1.5;\n    padding: $space-1 $space-2;\n    background: rgba(0, 0, 0, 0.02);\n    border-left: 2px solid $gray-200;\n    border-radius: 0 $radius-sm $radius-sm 0;\n  }\n\n  &:hover {\n    .marker-dot { transform: scale(1.12); }\n    .timeline-card {\n      background: white;\n      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n    }\n  }\n\n  // Variant colors\n  &--created .marker-dot { background: $primary-gradient; }\n  &--listed .marker-dot  { background: $cyan-gradient; }\n  &--updated .marker-dot { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }\n  &--sold .marker-dot    { background: $success-gradient; }\n  &--price .marker-dot   { background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%); }\n  &--status .marker-dot  { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); }\n  &--showing .marker-dot { background: linear-gradient(135deg, #ec4899 0%, #db2777 100%); }\n\n  &--created .marker-line { background: linear-gradient(180deg, rgba(102, 126, 234, 0.3), $gray-200); }\n  &--listed .marker-line  { background: linear-gradient(180deg, rgba(6, 182, 212, 0.3), $gray-200); }\n  &--updated .marker-line { background: linear-gradient(180deg, rgba(245, 158, 11, 0.3), $gray-200); }\n  &--sold .marker-line    { background: linear-gradient(180deg, rgba(34, 197, 94, 0.3), $gray-200); }\n  &--price .marker-line   { background: linear-gradient(180deg, rgba(168, 85, 247, 0.3), $gray-200); }\n  &--status .marker-line  { background: linear-gradient(180deg, rgba(59, 130, 246, 0.3), $gray-200); }\n  &--showing .marker-line { background: linear-gradient(180deg, rgba(236, 72, 153, 0.3), $gray-200); }\n}\n\n// Empty state\n.timeline-empty {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: $space-2;\n  padding: $space-6 $space-4;\n  color: $gray-400;\n  font-size: $font-size-sm;\n\n  i { font-size: 1.25rem; }\n}\n\n@keyframes slide-in-right {\n  from { opacity: 0; transform: translateX(20px); }\n  to { opacity: 1; transform: translateX(0); }\n}\n\n@keyframes gradient-shift {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}\n\n@keyframes orb-float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25% { transform: translate(50px, -30px) scale(1.1); }\n  50% { transform: translate(100px, 20px) scale(0.9); }\n  75% { transform: translate(30px, 50px) scale(1.05); }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// HERO ACTIONS (X12) \u2014 Quick Action Buttons\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.hero-actions {\n  display: flex;\n  gap: $space-2;\n  margin-top: $space-3;\n  flex-wrap: wrap;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// TAB NAVIGATION\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.tab-nav {\n  display: flex;\n  gap: $space-2;\n  margin-bottom: $space-4;\n  padding: $space-2;\n  background: #ffffff;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: $radius-2xl;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);\n  overflow-x: auto;\n  scrollbar-width: none;\n  &::-webkit-scrollbar { display: none; }\n}\n\n.tab-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-3 $space-5;\n  border: none;\n  border-radius: $radius-xl;\n  background: transparent;\n  font-size: $font-size-base;\n  font-weight: 600;\n  color: $gray-500;\n  cursor: pointer;\n  transition: all 250ms;\n  white-space: nowrap;\n\n  i { font-size: $font-size-base; }\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.04);\n    color: $gray-700;\n  }\n\n  &--active {\n    background: $primary-gradient;\n    color: white;\n    box-shadow: 0 4px 14px rgba(102, 126, 234, 0.3);\n\n    &:hover {\n      background: $primary-gradient;\n      color: white;\n    }\n  }\n}\n\n.tab-count {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 22px;\n  height: 22px;\n  padding: 0 $space-1;\n  background: rgba(255, 255, 255, 0.3);\n  border-radius: $radius-full;\n  font-size: $font-size-xs;\n  font-weight: 700;\n\n  .tab-btn:not(.tab-btn--active) & {\n    background: rgba(0, 0, 0, 0.08);\n    color: $gray-600;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// TAB PANELS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.tab-panel {\n  animation: fade-in-up 0.3s ease-out;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// COMMISSION BLOCK (X7)\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.commission-block {\n  margin-top: $space-4;\n  padding-top: $space-4;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n}\n\n.commission-title {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-sm;\n  font-weight: 700;\n  color: #0e7490;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  margin: 0 0 $space-3;\n\n  i {\n    color: #06b6d4;\n    font-size: $font-size-sm;\n  }\n}\n\n.field-value--commission {\n  font-size: $font-size-lg;\n  font-weight: 700;\n  background: $primary-gradient;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.commission-estimate {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: $space-3;\n  padding: $space-2 $space-3;\n  background: rgba(102, 126, 234, 0.06);\n  border-radius: $radius-md;\n  border: 1px solid rgba(102, 126, 234, 0.15);\n\n  .estimate-label {\n    font-size: $font-size-xs;\n    font-weight: 600;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .estimate-value {\n    font-size: $font-size-lg;\n    font-weight: 700;\n    color: #667eea;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// CARD HEADER BAR (shared for tab panels)\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.card-header-bar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: $space-4;\n  flex-wrap: wrap;\n  gap: $space-2;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// SHOWINGS TABLE (X3)\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.showings-table {\n  overflow-x: auto;\n}\n\n.data-table {\n  width: 100%;\n  border-collapse: collapse;\n\n  thead tr th {\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    border: none;\n    border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n    padding: $space-3 $space-4;\n    font-size: 0.72rem;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #3b82f6;\n    text-align: left;\n  }\n\n  tbody .table-row {\n    border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n    transition: background 150ms;\n\n    &:last-child { border-bottom: none; }\n    &:hover { background: rgba(102, 126, 234, 0.03); }\n\n    td {\n      padding: $space-3 $space-4;\n      vertical-align: middle;\n      font-size: $font-size-sm;\n      color: $gray-700;\n    }\n  }\n}\n\n.visitor-info {\n  display: flex;\n  flex-direction: column;\n\n  .visitor-name {\n    font-weight: 600;\n    color: $gray-800;\n  }\n\n  .visitor-email {\n    font-size: $font-size-xs;\n    color: $gray-400;\n  }\n}\n\n.rating-stars {\n  display: inline-flex;\n  gap: 2px;\n\n  .pi-star-fill {\n    font-size: 0.75rem;\n    color: $gray-300;\n\n    &.star-active {\n      color: #f59e0b;\n    }\n  }\n}\n\n.feedback-text {\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  font-size: $font-size-xs;\n  color: $gray-500;\n  max-width: 200px;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// DOCUMENTS GRID (X1)\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.documents-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: $space-3;\n}\n\n.document-card {\n  display: flex;\n  align-items: flex-start;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: #ffffff;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: $radius-lg;\n  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &:hover {\n    transform: translateY(-3px);\n    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.04);\n    background: #fafafa;\n  }\n}\n\n.doc-icon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  border-radius: $radius-md;\n  background: $cyan-gradient;\n  color: white;\n  font-size: $font-size-lg;\n  flex-shrink: 0;\n}\n\n.doc-info {\n  flex: 1;\n  min-width: 0;\n\n  .doc-name {\n    font-weight: 600;\n    font-size: $font-size-sm;\n    color: $gray-800;\n    display: block;\n    margin-bottom: 2px;\n    word-break: break-word;\n  }\n\n  .doc-meta {\n    display: flex;\n    gap: $space-2;\n    flex-wrap: wrap;\n    font-size: $font-size-xs;\n    color: $gray-400;\n  }\n\n  .doc-category {\n    display: inline-block;\n    padding: 1px $space-1;\n    background: rgba(6, 182, 212, 0.12);\n    border-radius: $radius-sm;\n    color: #0e7490;\n    font-weight: 600;\n    font-size: 0.7rem;\n    text-transform: uppercase;\n  }\n\n  .doc-uploader {\n    font-size: $font-size-xs;\n    color: $gray-400;\n    margin-top: 2px;\n    display: block;\n  }\n}\n\n.doc-actions {\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// PRICE HISTORY TIMELINE (X4)\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.price-timeline {\n  padding-left: $space-2;\n}\n\n.price-event {\n  display: flex;\n  gap: $space-3;\n  position: relative;\n\n  &--up .price-dot {\n    background: $success-gradient;\n  }\n  &--down .price-dot {\n    background: linear-gradient(135deg, #f87171 0%, #ef4444 100%);\n  }\n}\n\n.price-marker {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  flex-shrink: 0;\n}\n\n.price-dot {\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  color: white;\n  font-size: 0.7rem;\n  z-index: 1;\n}\n\n.price-line {\n  width: 2px;\n  flex: 1;\n  background: $gray-200;\n  min-height: 20px;\n}\n\n.price-body {\n  flex: 1;\n  padding-bottom: $space-4;\n}\n\n.price-change-row {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  flex-wrap: wrap;\n\n  .price-from {\n    font-size: $font-size-sm;\n    color: $gray-500;\n    text-decoration: line-through;\n  }\n\n  .pi-arrow-right {\n    font-size: 0.7rem;\n    color: $gray-400;\n  }\n\n  .price-to {\n    font-size: $font-size-base;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .price-pct {\n    font-size: $font-size-xs;\n    font-weight: 700;\n    padding: 1px $space-2;\n    border-radius: $radius-full;\n\n    &.pct-up {\n      background: rgba(34, 197, 94, 0.12);\n      color: #16a34a;\n    }\n\n    &.pct-down {\n      background: rgba(239, 68, 68, 0.12);\n      color: #dc2626;\n    }\n  }\n}\n\n.price-meta {\n  display: flex;\n  gap: $space-2;\n  margin-top: 2px;\n  font-size: $font-size-xs;\n  color: $gray-400;\n}\n\n.price-reason {\n  display: block;\n  margin-top: $space-1;\n  font-size: $font-size-xs;\n  color: $gray-500;\n  font-style: italic;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// EMPTY STATE\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-8 $space-4;\n  text-align: center;\n\n  .empty-icon {\n    font-size: 2.5rem;\n    color: $gray-300;\n  }\n\n  p {\n    color: $gray-400;\n    font-size: $font-size-sm;\n    margin: 0;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// DIALOG FORM FIELDS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.dialog-body {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  padding: $space-2 0;\n\n  .form-field {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    gap: 0.75rem;\n\n    > label {\n      font-size: 0.8125rem;\n      font-weight: 600;\n      color: #475569;\n      white-space: nowrap;\n      min-width: 100px;\n      flex-shrink: 0;\n      text-align: right;\n\n      .required {\n        color: #ef4444;\n      }\n    }\n\n    > p-inputgroup,\n    > p-select,\n    > p-datepicker,\n    > textarea {\n      flex: 1;\n      min-width: 0;\n    }\n\n    &:focus-within > label {\n      color: #4f46e5;\n    }\n  }\n}\n\n.select-option {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n}\n\n/* ==========================================\n   ACTIVITIES TAB (X2)\n   ========================================== */\n.activities-list {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.activity-item {\n  display: flex;\n  align-items: flex-start;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: #ffffff;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: $radius-lg;\n  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &:hover {\n    background: #fafafa;\n    transform: translateY(-2px);\n    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.03);\n  }\n\n  &--completed {\n    opacity: 0.6;\n\n    .activity-subject {\n      text-decoration: line-through;\n      color: $gray-400;\n    }\n  }\n}\n\n.activity-icon {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: $radius-md;\n  font-size: $font-size-lg;\n  color: white;\n  flex-shrink: 0;\n\n  &--call { background: $success-gradient; }\n  &--email { background: linear-gradient(135deg, #ec4899 0%, #db2777 100%); }\n  &--meeting { background: $primary-gradient; }\n  &--task { background: $cyan-gradient; }\n  &--note { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }\n  &--follow_up { background: $purple-gradient; }\n}\n\n.activity-body {\n  flex: 1;\n  min-width: 0;\n}\n\n.activity-header {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  margin-bottom: 2px;\n}\n\n.activity-subject {\n  font-weight: 600;\n  font-size: $font-size-md;\n  color: $gray-800;\n}\n\n.priority-tag {\n  display: inline-flex;\n  padding: 1px $space-2;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  border-radius: $radius-full;\n  text-transform: capitalize;\n}\n\n.activity-meta {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  font-size: $font-size-xs;\n  color: $gray-500;\n  margin-bottom: $space-1;\n\n  i {\n    font-size: 0.7rem;\n    margin-right: 2px;\n  }\n}\n\n.activity-description {\n  font-size: $font-size-sm;\n  color: $gray-500;\n  line-height: 1.5;\n}\n\n.activity-actions {\n  flex-shrink: 0;\n  align-self: center;\n}\n\n.row-action-btn--complete {\n  background: $success-gradient;\n  color: white;\n  border: none;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 250ms;\n  font-size: $font-size-sm;\n\n  &:hover {\n    transform: scale(1.15);\n    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);\n  }\n}\n\n/* \u2550\u2550\u2550 CMA TAB (G3) \u2550\u2550\u2550 */\n.cma-loading { padding: $space-4; }\n\n.cma-summary {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: $space-3;\n  padding: $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n}\n\n.cma-kpi {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  padding: $space-3;\n  background: $glass-bg-subtle;\n  border-radius: $radius-lg;\n  border: 1px solid $glass-border;\n  text-align: center;\n\n  &__label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    font-weight: 600;\n  }\n\n  &__value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n\n    &--primary {\n      background: $primary-gradient;\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n    }\n  }\n}\n\n.cma-table-wrap {\n  padding: $space-3;\n\n  .comp-address {\n    font-weight: 600;\n    color: $gray-800;\n    display: block;\n  }\n\n  .comp-city {\n    font-size: $font-size-xs;\n    color: $gray-400;\n  }\n}\n\n/* \u2550\u2550\u2550 E-SIGNATURE TAB (G4) \u2550\u2550\u2550 */\n.esign-list {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  padding: $space-4;\n}\n\n.esign-card {\n  background: $glass-bg-subtle;\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  padding: $space-4;\n  transition: all 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n  }\n\n  &__header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    margin-bottom: $space-3;\n  }\n\n  &__meta {\n    display: flex;\n    flex-wrap: wrap;\n    gap: $space-3;\n    font-size: $font-size-xs;\n    color: $gray-500;\n    margin-bottom: $space-3;\n\n    i { margin-right: 4px; }\n  }\n}\n\n.esign-doc-info {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n}\n\n.esign-doc-icon {\n  font-size: 1.5rem;\n  color: #ef4444;\n}\n\n.esign-doc-name {\n  display: block;\n  font-size: $font-size-md;\n  color: $gray-800;\n}\n\n.esign-doc-type {\n  font-size: $font-size-xs;\n  color: $gray-400;\n}\n\n.esign-signers {\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n  padding-top: $space-3;\n\n  &__title {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    font-weight: 600;\n    margin: 0 0 $space-2;\n  }\n}\n\n.signer-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-2 0;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.03);\n\n  &:last-child { border-bottom: none; }\n}\n\n.signer-info {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n}\n\n.signer-name {\n  font-weight: 600;\n  font-size: $font-size-sm;\n  color: $gray-800;\n}\n\n.signer-email {\n  font-size: $font-size-xs;\n  color: $gray-400;\n}\n\n.signer-role {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  background: rgba(99, 102, 241, 0.1);\n  padding: 1px 8px;\n  border-radius: $radius-full;\n}\n\n.esign-card__actions {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding-top: $space-3;\n  margin-top: $space-3;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n}\n\n.void-dialog-text {\n  font-size: $font-size-sm;\n  color: $gray-600;\n  line-height: 1.6;\n}\n\n/* \u2550\u2550\u2550 ALERTS TAB (G5) \u2550\u2550\u2550 */\n.alert-rules-list {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  padding: $space-4;\n}\n\n.alert-rule-card {\n  background: $glass-bg-subtle;\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  padding: $space-4;\n  transition: all 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n  }\n\n  &--inactive {\n    opacity: 0.6;\n  }\n\n  &__header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    margin-bottom: $space-3;\n  }\n\n  &__client {\n    display: flex;\n    align-items: center;\n    gap: $space-3;\n  }\n\n  &__avatar {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: $primary-gradient;\n    color: white;\n    font-weight: 700;\n    border-radius: 50%;\n    font-size: $font-size-sm;\n    overflow: hidden;\n\n    img {\n      width: 100%;\n      height: 100%;\n      object-fit: cover;\n      border-radius: inherit;\n    }\n  }\n\n  &__email {\n    display: block;\n    font-size: $font-size-xs;\n    color: $gray-400;\n  }\n\n  &__criteria {\n    display: flex;\n    flex-wrap: wrap;\n    gap: $space-3;\n    font-size: $font-size-sm;\n    color: $gray-600;\n\n    i {\n      margin-right: 4px;\n      color: $gray-400;\n    }\n  }\n\n  &__footer {\n    margin-top: $space-3;\n    padding-top: $space-2;\n    border-top: 1px solid rgba(0, 0, 0, 0.06);\n  }\n\n  &__last-notified {\n    font-size: $font-size-xs;\n    color: $gray-400;\n  }\n}\n\n/* Toggle switch */\n.toggle-btn {\n  position: relative;\n  width: 44px;\n  height: 24px;\n  border-radius: 12px;\n  border: none;\n  background: $gray-300;\n  cursor: pointer;\n  transition: background 250ms;\n  padding: 0;\n\n  &--active {\n    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);\n  }\n\n  &__slider {\n    position: absolute;\n    top: 2px;\n    left: 2px;\n    width: 20px;\n    height: 20px;\n    border-radius: 50%;\n    background: white;\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);\n    transition: transform 250ms;\n  }\n\n  &--active &__slider {\n    transform: translateX(20px);\n  }\n}\n\n/* Notification History */\n.notification-list {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n  padding: $space-4;\n}\n\n.notification-item {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3;\n  background: $glass-bg-subtle;\n  border-radius: $radius-md;\n  border: 1px solid $glass-border;\n}\n\n.notification-icon {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(59, 130, 246, 0.1);\n  border-radius: 50%;\n  color: #3b82f6;\n  font-size: $font-size-sm;\n  flex-shrink: 0;\n}\n\n.notification-body {\n  flex: 1;\n  min-width: 0;\n\n  strong {\n    display: block;\n    font-size: $font-size-sm;\n    color: $gray-800;\n  }\n}\n\n.notification-meta {\n  display: block;\n  font-size: $font-size-xs;\n  color: $gray-500;\n}\n\n.notification-date {\n  display: block;\n  font-size: $font-size-xs;\n  color: $gray-400;\n}\n\n.mt-4 { margin-top: $space-4; }\n"] }]
    }], null, { onKeydown: [{
            type: HostListener,
            args: ['document:keydown', ['$event']]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PropertyDetailPage, { className: "PropertyDetailPage", filePath: "src/app/crm/features/properties/pages/property-detail.page.ts", lineNumber: 64 }); })();
