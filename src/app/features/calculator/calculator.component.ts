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
}

export const ACTIVITIES = {
  SEDENTARY: 'SEDENTARY',
  LIGHT: 'LIGHT',
  ACTIVE: 'ACTIVE',
  VERY_ACTIVE: 'VERY_ACTIVE',
} as const;
export type ActivityType = keyof typeof ACTIVITIES;

// GOALS
export enum GoalEnum {
  FAT_LOSS = 0.8,
  MAINTENANCE = 1.0,
  GAIN_MASS = 1.15,
}

export const GOALS = {
  GAIN_MASS: 'GAIN_MASS',
  FAT_LOSS: 'FAT_LOSS',
  MAINTENANCE: 'MAINTENANCE',
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
    { name: 'proteins', unit: 'gr/kg', kcal: 0, gr: 0 },
    { name: 'hc', unit: '%', kcal: 0, gr: 0 },
    { name: 'fats', unit: 'gr/kg', kcal: 0, gr: 0 },
  ];

  calculatorForm!: FormGroup;
  macrosForm!: FormGroup;

  TMB: number | null = null;
  totalCalories: number = 0;

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
      hc: [0, [Validators.min(0), Validators.max(100), Validators.required]],
      fats: [1, [Validators.min(0), Validators.required]],
      proteins: [2, [Validators.min(0), Validators.required]],
    });
  
    this.macrosForm.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => this.updateMacrosForm());
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

      this.totalCalories = maintenanceCalories * goalFactor;

      this.updateMacrosForm();
    } else {
      this.TMB = null;
      this.totalCalories = 0;
    }
  }

  private updateMacrosForm = () => {
    const proteinsPercent =
      (this.proteins?.value *
        this.weight?.value *
        Utils.MACROS.proteins.energy *
        100) /
      this.totalCalories;
    const fatsPercent =
      (this.fats?.value * this.weight?.value * Utils.MACROS.fats.energy * 100) /
      this.totalCalories;
    const hcPercent = 100 - proteinsPercent - fatsPercent;

    const proteinsKcal: number = (proteinsPercent * this.totalCalories) / 100;
    const fatsKcal: number = (fatsPercent * this.totalCalories) / 100;
    const hcKcal: number = (hcPercent * this.totalCalories) / 100;

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

    this.hc.setValue(+hcPercent.toFixed(2));
  };
}
