import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from "./../../shared/api.service";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  adminLoginForm: FormGroup;
  constructor(private api: ApiService, private route: ActivatedRoute, public fb: FormBuilder, private router: Router,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.initAdminLoginForm();
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.adminLoginForm.controls[controlName].hasError(errorName);
  }

  initAdminLoginForm() {
    this.adminLoginForm = this.fb.group({
      userName: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  submitAdminLoginForm(){
    if (this.adminLoginForm.valid) {
      this.api.AdminLogin(this.adminLoginForm.value).subscribe(res => {
        this.api.SetAdminLoginSession();
        this.ngZone.run(() => this.router.navigateByUrl("/players-list"));
      });
    }
  }

}
