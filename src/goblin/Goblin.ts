import { getRandomInArray, getRandomInt } from "../utils"
import database from '../data.json'

interface ColorationType {
  id: number,
  name: string,
  color: string,
  combat: number,
  knowledge: number,
  dexterity: number,
  luck: number
}

interface SpecialFeatureType {
  id: number
  name: string;
  description: string;
  extraDescription?: string[] | undefined;
}

interface OcupationType {
  id: number,
  name: string,
  color: string,
  combat: number,
  knowledge: number,
  dexterity: number,
  luck: number
  skills: number[]
  equip_type: string
}

interface SkillType {
  id: number
  name: string
  description: string
}

class Goblin {
  coloration: ColorationType
  specialFeature: SpecialFeatureType
  ocupation: OcupationType

  constructor(coloration: ColorationType, ocupation: OcupationType, specialFeature: SpecialFeatureType) {
    this.coloration = coloration
    this.specialFeature = specialFeature
    this.ocupation = ocupation
  }

  public randomize() {
    this.coloration = getRandomInArray(database.colorations)
    this.specialFeature = this.getRandomSpecialFeature()
    this.ocupation = getRandomInArray(database.ocupation)
  }

  private

  private getRandomSpecialFeature(): SpecialFeatureType {
    const specialFeature = getRandomInArray<SpecialFeatureType>(database.special_features)
    let extraDescription = undefined
    if (!!specialFeature.extraDescription) {
      extraDescription = this.getExtraDescription(specialFeature.extraDescription)
    }
    return { ...specialFeature, extraDescription }
  }

  private getExtraDescription(extraDescriptions: string[]) {
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

export default Goblin
