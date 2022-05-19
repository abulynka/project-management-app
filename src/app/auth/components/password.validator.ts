import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidator {
  public static validate(control: AbstractControl): ValidationErrors | null {
    if (!control || !control.value) {
      return null;
    }
    const value: string = control.value;
    if (!PasswordValidator.atLeastEightCharachters(value)) {
      return { atLeastEightCharachters: true };
    }
    if (!PasswordValidator.bothUppercaseAndLowercaseLetters(value)) {
      return { bothUppercaseAndLowercaseLetters: true };
    }
    if (!PasswordValidator.lettersAndNumbers(value)) {
      return { lettersAndNumbers: true };
    }
    if (!PasswordValidator.oneSpecialCharacter(value)) {
      return { oneSpecialCharacter: true };
    }
    return null;
  }

  private static atLeastEightCharachters(value: string): boolean {
    const minPasswordLength: number = 8;
    return value.length >= minPasswordLength;
  }

  private static bothUppercaseAndLowercaseLetters(value: string): boolean {
    return value.match(/.[a-z]/) !== null && value.match(/.[A-Z]/) !== null;
  }

  private static lettersAndNumbers(value: string): boolean {
    return value.match(/.[a-zA-Z]/) !== null && value.match(/.\d/) !== null;
  }

  private static oneSpecialCharacter(value: string): boolean {
    return value.match(/.[!@#?\]]/) !== null;
  }
}
