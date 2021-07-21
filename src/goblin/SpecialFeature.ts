import { special_features } from '../data.json'
import { getRandomInArray, getRandomInt } from '../utils';

interface SpecialFeatureType {
  id: number
  name: string;
  description: string;
  extraDescription?: string[] | undefined;
}

class SpecialFeature {
  private static specialFeatures: SpecialFeatureType[];
  constructor() {
    SpecialFeature.specialFeatures = special_features
  }

  public static getRandomSpecialFeature(): SpecialFeatureType {
    const specialFeature = getRandomInArray(SpecialFeature.specialFeatures)
    let extraDescription = undefined
    if (!!specialFeature.extraDescription) {
      extraDescription = SpecialFeature.getExtraDescription(specialFeature.extraDescription)
    }
    return { ...specialFeature, extraDescription }
  }

  private static getExtraDescription(extraDescriptions: string[]) {
    const result: string[] = []
    const diceValue = getRandomInt(1, extraDescriptions.length + 2)
    if (diceValue > extraDescriptions.length) {
      result.concat([
        ...this.getExtraDescription(extraDescriptions),
        ...this.getExtraDescription(extraDescriptions)
      ])
    } else {
      result.push(extraDescriptions[diceValue - 1])
    }
    return result
  }
}

export default SpecialFeature
