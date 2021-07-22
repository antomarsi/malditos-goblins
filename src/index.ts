import database from './data.json';

function getRandomInArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

type EquipmentType = "heavy" | "light" | "explosive" | "magic"

module MalditosGoblins {
  export interface Coloration {
    name: string;
    color: string;
    combat: number;
    knowledge: number;
    dexterity: number;
    luck: number;
  }

  export interface SpecialFeature {
    name: string;
    description: string;
    extraDescriptions?: string[];
  }

  export interface Ocupation {
    name: string;
    combat: number;
    knowledge: number;
    dexterity: number;
    luck: number;
    skills: Skill[];
    equip_type: string;
  }

  export interface Skill {
    name: string;
    description: string;
  }

  export interface Equipment {
    name: string;
    distance?: boolean;
    attack?: number;
    defense?: number;
    consumable?: boolean;
    aoe?: number;
    charge?: number;
  }

  export class Goblin {
    coloration: Coloration;
    ocupation: Ocupation;
    specialFeature: SpecialFeature;
    equipments: Equipment[];

    constructor(
      coloration: Coloration,
      ocupation: Ocupation,
      specialFeature: SpecialFeature,
      equipments: Equipment[]
    ) {
      this.coloration = coloration;
      this.ocupation = ocupation;
      this.specialFeature = specialFeature;
      this.equipments = equipments;
    }

    public get combat(): number {
      return this.ocupation.combat + this.coloration.combat;
    }

    public get knowledge(): number {
      return this.ocupation.knowledge + this.coloration.knowledge;
    }

    public get dexterity(): number {
      return this.ocupation.dexterity + this.coloration.dexterity;
    }

    public get luck(): number {
      return this.ocupation.luck + this.coloration.luck;
    }
  }

  export function generateGoblin(): Goblin {
    const coloration = getRandomColoration();
    const ocupation = getRandomOcupation();
    const specialFeature = getRandomSpecialFeature();
    const equipments = getRandomEquipments(ocupation.equip_type as EquipmentType);

    const goblin = new Goblin(
      coloration,
      ocupation,
      specialFeature,
      equipments
    );
    return goblin;
  }

  function getRandomEquipments(equip_type: EquipmentType): Equipment[] {
    const equipments: Equipment[] = [];

    const equipSet = getRandomInArray(database.equipment_sets[equip_type]);

    equipSet.forEach(equipId => {
      const equipment = database.equipments.find(equip => equip.id === equipId);
      if (!!equipment) equipments.push(equipment);
    });

    return equipments;
  }

  function getRandomColoration(): Coloration {
    return getRandomInArray(database.colorations);
  }

  function getRandomOcupation(): Ocupation {
    const ocupationObj = getRandomInArray(database.ocupations);
    const skills: Skill[] = [];
    ocupationObj.skills.forEach(skillId => {
      const skill = database.skills.find(skill => skill.id === skillId);
      if (!!skill) skills.push(skill);
    });
    return {
      ...ocupationObj,
      skills,
    };
  }

  function getRandomSpecialFeature(): SpecialFeature {
    const specialFeature = getRandomInArray(database.special_features);
    let extraDescriptions: string[] | undefined = undefined;
    if (!!specialFeature.extraDescriptions) {
      extraDescriptions = getExtraDescription(specialFeature.extraDescriptions);
    }
    return { ...specialFeature, extraDescriptions };
  }

  function getExtraDescription(extraDescriptions: string[]): string[] {
    const result: string[] = [];
    const diceValue = getRandomInt(1, extraDescriptions.length + 2);
    if (diceValue > extraDescriptions.length) {
      result.concat([
        ...getExtraDescription(extraDescriptions),
        ...getExtraDescription(extraDescriptions),
      ]);
    } else {
      result.push(extraDescriptions[diceValue - 1]);
    }
    return result;
  }
}

export default MalditosGoblins;
