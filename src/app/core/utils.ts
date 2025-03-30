export default class Utils {
  static MACROS = {
    hc: {
      energy: 4,
    },
    fats: {
      energy: 9,
    },
    proteins: {
      energy: 4,
    },
  };

  static MOMENT_FORMAT = 'DD/MM/YYYY';

  static normalizeString = (input: string) => {
    return input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  // Personal energy calculation formulas

  // Calculate BMR
  /**
     * Men:  BMR = 88.362 + (13.397 x weight in kg) + (4.799 x height in cm) - (5.677 x age in years)
    Women: BMR = 447.593 + (9.247 x weight in kg) + (3.098 x height in cm) - (4.330 x age in years)
    */
  static BMR(
    gender: 'male' | 'female',
    weight: number,
    length: number,
    age: number
  ): number {
    return gender === 'male'
      ? 88.362 + 13.397 * weight + 4.799 * length - 5.677 * age
      : 447.593 + 9.247 * weight + 3.098 * length - 4.33 * age;
  }

 /*  static TDEE(BMR: number, activityFactor: ProfileActivityEnum): number {
    return BMR * ProfileActiviyValueEnum[activityFactor];
  }

  static getGoalCalories(TDEE: number, goal: ProfileGoalEnum): number {
    return TDEE * ProfileGoalValueEnum[goal];
  } */

  // Return total grams by macro & total calories
 /*  static getGoalMacro(
    macroPercent: number,
    macro: string,
    calories: number
  ): MacroData {
    const { energy } = this.MACROS[macro];

    return {
      value: ((macroPercent / 100) * calories) / energy,
      percent: macroPercent / 100,
    };
  } */
}
