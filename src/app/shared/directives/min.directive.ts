import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS, ValidatorFn } from '@angular/forms';

function min(n: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
        return control.value < n ? {'notMin': {value: control.value}} : null;
    };
}

@Directive({
    selector: '[appMin]',
    providers: [{provide: NG_VALIDATORS, useExisting: MinDirective, multi: true}]
})
export class MinDirective implements Validator {

    @Input('appMin')
    private appMin: number;

    validate(control: AbstractControl): ValidationErrors {
        return this.appMin ? min(this.appMin)(control) : null;
    }

}
