import MalditosGoblins from '../src/index'

describe('goblin generator', () => {
  it('generate a random goblin', () => {
    const goblin = MalditosGoblins.generateGoblin()

    expect(goblin).not.toBeNull()
  });
});
