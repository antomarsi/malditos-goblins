import { generateGoblin } from '../src/index';

describe('goblin generator', () => {
  it('generate a random goblin', () => {
    const goblin = generateGoblin();

    expect(goblin).not.toBeNull();
    expect(goblin.combat).toBeGreaterThan(0);
    expect(goblin.knowledge).toBeGreaterThan(0);
    expect(goblin.luck).toBeGreaterThan(0);
    expect(goblin.dexterity).toBeGreaterThan(0);
    expect(goblin.ocupation).not.toBeNull();
    expect(goblin.equipments.length).toBeGreaterThan(0);
  });
});
