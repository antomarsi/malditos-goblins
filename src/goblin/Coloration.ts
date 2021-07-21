import { colorations } from "../data.json"
import { getRandomInArray } from "../utils";
interface ColorationType {
  id: number,
  name: string,
  color: string,
  combat: number,
  knowledge: number,
  dexterity: number,
  luck: number
}

class Coloration {
  private static colorations: ColorationType[];
  constructor() {
    Coloration.colorations = colorations
  }

  public static getRandomColoration(): ColorationType {
    return getRandomInArray(Coloration.colorations)
  }
}

export default Coloration
