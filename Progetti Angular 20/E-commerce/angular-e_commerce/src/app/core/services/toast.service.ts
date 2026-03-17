import { Injectable } from "@angular/core";
import { Toast } from "../models/toast.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  private _toast = new BehaviorSubject<Toast>({
    message: "",
    status: null,
    visible: false,
  });
  toast$ = this._toast.asObservable();
  constructor() {}
  createToast() : Toast{
    const toast = {message:'',status:null,visible:false}
    this._toast.next(toast);
    return toast;
  }
  getToast(toast: Toast): Toast {
    this._toast.next(toast);
    return toast;
  }
  updateToast(toast: Toast, message: string, status: any): Toast {
    toast.message = message;
    toast.status = status;
    this.showAndHideToast(toast);
    return toast;
  }
  showAndHideToast(toast: Toast): Toast {
    toast.visible = true;
    this._toast.next(toast);
    setTimeout(() => {
      toast.visible = false;
      this._toast.next(toast);
    }, 1000);
    return toast;
  }
}
