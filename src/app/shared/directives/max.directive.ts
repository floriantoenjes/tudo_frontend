import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS, ValidatorFn } from '@angular/forms';

function max(n: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
        return control.value > n ? {'notMax': {value: control.value}} : null;
    };
}

@Directive({
    selector: '[appMax]',
    providers: [{provide: NG_VALIDATORS, useExisting: MaxDirective, multi: true}]
})
export class MaxDirective implements Validator {

    @Input('appMax')
    private appMax: number;

    validate(control: AbstractControl): ValidationErrors {
        return this.appMax ? max(this.appMax)(control) : null;
    }

}
