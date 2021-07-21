interface EquipmentItem {
  id: number,
  name: string,
  description: string,
  distance?: number | undefined
  attack?: number | undefined
  defense?: number | undefined
  consumable?: boolean | undefined
  aoe?: number | undefined
  charge?: number | undefined
}
