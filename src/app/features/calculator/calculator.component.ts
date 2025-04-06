import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import Utils from '../../core/utils';
import {
  faBalanceScale,
  faCalculator,
  faFire,
} from '@fortawesome/free-solid-svg-icons';

// ACTIVITIES
export enum ActiviyValueEnum {
  SEDENTARY = 1.2,
  LIGHT = 1.375,
  ACTIVE = 1.55,
  VERY_ACTIVE = 1.725,
  EXTREME_ACTIVE = 1.9,
}

export const ACTIVITIES = {
  SEDENTARY: 'SEDENTARY',
  LIGHT: 'LIGHT',
  ACTIVE: 'ACTIVE',
  VERY_ACTIVE: 'VERY_ACTIVE',
  EXTREME_ACTIVE: 'EXTREME_ACTIVE',
} as const;
export type ActivityType = keyof typeof ACTIVITIES;

// GOALS
export enum GoalEnum {
  MAINTENANCE = 0,
  SURPLUS = 200,
  AGGRESSIVE_SURPLUS = 650,
  DEFICIT = -200,
  AGGRESSIVE_DEFICIT = -650
}

export const GOALS = {
  MAINTENANCE: 'MAINTENANCE',
  SURPLUS: 'SURPLUS',
  AGGRESSIVE_SURPLUS: 'AGGRESSIVE_SURPLUS',
  DEFICIT: 'DEFICIT',
  AGGRESSIVE_DEFICIT: 'AGGRESSIVE_DEFICIT',
} as const;

export type GoalType = keyof typeof GOALS;

interface MacroData {
  name: 'proteins' | 'hc' | 'fats';
  unit: string;
  kcal: number;
  gr: number;
}

@Component({
  selector: 'app-calculator',
  standalone: false,
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject<void>();

  // Macros data
  displayedColumns: string[] = ['name', 'kcal', 'gr'];
  macroData: MacroData[] = [
    { name: 'proteins', unit: '%', kcal: 0, gr: 0 },
    { name: 'hc', unit: '%', kcal: 0, gr: 0 },
    { name: 'fats', unit: '%', kcal: 0, gr: 0 },
  ];

  calculatorForm!: FormGroup;
  macrosForm!: FormGroup;
  private previousValues: any = { proteins: 20, fats: 30, hc: 50 }; // Valores iniciales

  TMB: number | null = null;
  GET: number = 0;

  faFire = faFire;
  faCalculator = faCalculator;
  faBalanceScale = faBalanceScale;
  GOALS = GOALS;
  goalKeys = Object.keys(GOALS) as GoalType[];

  ACTIVITIES = ACTIVITIES;
  activityKeys = Object.keys(ACTIVITIES) as ActivityType[];

  activityFactorValue = ActiviyValueEnum;

  get weight(): FormControl<number> {
    return this.calculatorForm.get('weight') as FormControl;
  }

  get proteins(): FormControl<number> {
    return this.macrosForm.get('proteins') as FormControl;
  }

  get hc(): FormControl<number> {
    return this.macrosForm.get('hc') as FormControl;
  }

  get fats(): FormControl<number> {
    return this.macrosForm.get('fats') as FormControl;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private buildForm(): void {
    this.calculatorForm = this.fb.group({
      gender: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required, Validators.min(1)]),
      weight: new FormControl(null, [Validators.required, Validators.min(1)]),
      height: new FormControl(null, [Validators.required, Validators.min(1)]),
      activity: new FormControl(null, [Validators.required]),
      goal: new FormControl(null, [Validators.required]),
    });
    this.calculatorForm.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => this.calculateCalories());

    this.macrosForm = this.fb.group({
      hc: [50, [Validators.min(0), Validators.max(100), Validators.required]],
      fats: [20, [Validators.min(0), Validators.max(100), Validators.required]],
      proteins: [
        30,
        [Validators.min(0), Validators.max(100), Validators.required],
      ],
    });

    this.macrosForm.valueChanges.subscribe((currentValues) => {
      this.setupPercentageAdjustment(currentValues);
    });
  }

  calculateCalories() {
    const { gender, weight, height, age, activity, goal } =
      this.calculatorForm.value;

    if (gender && weight && height && age && activity && goal) {
      // Cálculo del TMB
      this.TMB =
        gender === 'MALE'
          ? 10 * weight + 6.25 * height - 5 * age + 5
          : 10 * weight + 6.25 * height - 5 * age - 161;

      // Factor de actividad desde el Enum
      const activityFactor =
        ActiviyValueEnum[activity as keyof typeof ActiviyValueEnum];
      const maintenanceCalories = this.TMB * activityFactor;

      // Ajuste según el objetivo (desde el Enum)
      const goalFactor = GoalEnum[goal as keyof typeof GoalEnum];

      this.GET = maintenanceCalories + goalFactor;

      this.calculateData();
    } else {
      this.TMB = null;
      this.GET = 0;
    }
  }

  setupPercentageAdjustment(currentValues: any) {
    // Evitar bucles infinitos
    if (this.macrosForm.invalid || !this.macrosForm.dirty) return;

    const changedField = this.findChangedField(currentValues);
    if (!changedField) return;

    const newValue = currentValues[changedField];
    const otherFields = ['proteins', 'fats', 'hc'].filter(
      (f) => f !== changedField
    );

    // Calcular el porcentaje restante
    const remainingPercentage = 100 - newValue;

    // Mantener la proporción original entre los otros dos campos
    const originalSum =
      this.previousValues[otherFields[0]] + this.previousValues[otherFields[1]];
    const ratio1 = this.previousValues[otherFields[0]] / originalSum;
    const ratio2 = this.previousValues[otherFields[1]] / originalSum;

    // Distribuir el porcentaje restante proporcionalmente
    const newValue1 = Math.round(remainingPercentage * ratio1 * 10) / 10;
    const newValue2 = Math.round(remainingPercentage * ratio2 * 10) / 10;

    // Ajustar posibles errores de redondeo
    const adjustment = 100 - (newValue + newValue1 + newValue2);

    // Actualizar el formulario sin disparar valueChanges nuevamente
    this.macrosForm.patchValue(
      {
        [otherFields[0]]: newValue1 + adjustment,
        [otherFields[1]]: newValue2,
      },
      { emitEvent: false }
    );

    this.calculateData();
    // Guardar los valores actuales para la próxima comparación
    this.previousValues = { ...this.macrosForm.value };
  }

  // Identificar qué campo fue modificado
  findChangedField(currentValues: any): string | null {
    for (const field of ['proteins', 'fats', 'hc']) {
      if (currentValues[field] !== this.previousValues[field]) {
        return field;
      }
    }
    return null;
  }

  private calculateData(): void {
    const proteinsKcal: number = (this.proteins.value * this.GET) / 100;
    const fatsKcal: number = (this.fats.value * this.GET) / 100;
    const hcKcal: number = (this.hc.value * this.GET) / 100;

    this.macroData.forEach((mD: MacroData) => {
      if (mD.name === 'proteins') {
        mD.kcal = proteinsKcal;
        mD.gr = proteinsKcal / Utils.MACROS.proteins.energy;
      } else if (mD.name === 'fats') {
        mD.kcal = fatsKcal;
        mD.gr = fatsKcal / Utils.MACROS.proteins.energy;
      } else if (mD.name === 'hc') {
        mD.kcal = hcKcal;
        mD.gr = hcKcal / Utils.MACROS.proteins.energy;
      }
    });
  }
}
