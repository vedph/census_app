import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Act } from '../models';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-act-detail',
  templateUrl: './act-detail.component.html',
  styleUrls: ['./act-detail.component.css'],
})
export class ActDetailComponent implements OnInit {
  private _id: number;
  public act: Act;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackbar: MatSnackBar,
    private _apiService: ApiService
  ) {}

  public ngOnInit(): void {
    this._id = this._route.snapshot.params.id;

    this._apiService
      .getAct(this._id)
      .pipe(take(1))
      .subscribe(
        (a) => {
          this.act = a;
        },
        (error) => {
          console.error(error);
          this._snackbar.open('Error loading act', 'OK');
        }
      );
  }

  public backToList(): void {
    this._router.navigate(['/acts']);
  }
}
