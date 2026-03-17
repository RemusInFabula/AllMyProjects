import { Component, OnInit } from "@angular/core";
import { ErrorService } from "../../../core/services/error-service";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-error.component",
  imports: [TranslatePipe],
  templateUrl: "./error.component.html",
  styleUrl: "./error.component.css",
})
export class ErrorComponent implements OnInit {
  errorMessage = "";
  constructor(private errorService: ErrorService) {}
  ngOnInit(): void {
    this.errorService.error$.subscribe((error) => {
      if (error) {
        console.log("Errore ricevuto nel componente di errore:", error);
        this.errorMessage = `${error.message}`;
      }
    });
  }
}
