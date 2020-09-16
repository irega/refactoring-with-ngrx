import { Component } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-component",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  apiUrl: string;

  constructor() {
    // INFO: This is only an example for how to read the application config from a component.
    this.apiUrl = environment.apiUrl;
  }
}
