import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { PasswordStrength, BarColors } from 'src/app/types/enums';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css'],
})
export class PasswordStrengthComponent implements OnChanges {
  @Input() public passwordToCheck!: string;

  bar0!: string;
  bar1!: string;
  bar2!: string;

  isLengthValid = false;
  hasLetters = false;
  hasNumbers = false;
  hasSymbols = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['passwordToCheck']) {
      const password = changes['passwordToCheck'].currentValue;

      const passwordStrength = this.calculatePasswordStrength(password);
      this.updateProgressBarColors(passwordStrength);
      this.updateValidationMessages(password);
    }
  }

  calculatePasswordStrength(password: string) {
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const hasNumbers = /\d/.test(password);

    if (password.length === 0) {
      return PasswordStrength.Empty;
    } else if (password.length < 8) {
      return PasswordStrength.LessThanEightCharacters;
    }

    if (hasLetters && hasSymbols && hasNumbers) {
      return PasswordStrength.Strong;
    } else if (
      (hasLetters && hasSymbols) ||
      (hasLetters && hasNumbers) ||
      (hasNumbers && hasSymbols)
    ) {
      return PasswordStrength.Medium;
    }

    return PasswordStrength.Easy;
  }

  updateProgressBarColors(strength: number) {
    if (strength === PasswordStrength.Empty) {
      this.bar0 = BarColors.Gray;
      this.bar1 = BarColors.Gray;
      this.bar2 = BarColors.Gray;
    } else if (strength === PasswordStrength.LessThanEightCharacters) {
      this.bar0 = BarColors.Red;
      this.bar1 = BarColors.Red;
      this.bar2 = BarColors.Red;
    } else if (strength === PasswordStrength.Easy) {
      this.bar0 = BarColors.Red;
      this.bar1 = BarColors.Gray;
      this.bar2 = BarColors.Gray;
    } else if (strength === PasswordStrength.Medium) {
      this.bar0 = BarColors.Yellow;
      this.bar1 = BarColors.Yellow;
      this.bar2 = BarColors.Gray;
    } else if (strength === PasswordStrength.Strong) {
      this.bar0 = BarColors.Green;
      this.bar1 = BarColors.Green;
      this.bar2 = BarColors.Green;
    }
  }

  updateValidationMessages(password: string) {
    this.isLengthValid = password.length >= 8;
    this.hasLetters = /[a-zA-Z]/.test(password);
    this.hasNumbers = /\d/.test(password);
    this.hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  }

  getBoxShadow(color: string) {
    if (color === BarColors.Gray) {
      return '';
    } else {
      return `5px 8px 49px 3px ${color}`;
    }
  }
}
