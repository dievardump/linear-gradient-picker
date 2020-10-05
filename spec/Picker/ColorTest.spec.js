describe('Pick colors', function () {
  const LinearGradientPicker = require('../..');
  let picker;
  beforeEach(function () {
    picker = new LinearGradientPicker();
  });

  it('throws an error if no color', function () {
    expect(() => {
      picker.pick(10);
    }).toThrow();
  });

  it('throws an error if no position', function () {
    expect(() => {
      picker.addColorStop('#ff0000');
    }).toThrow();
  });

  it('throws an error if positio already taken', function () {
    expect(() => {
      picker.addColorStop('#ff0000', 0);
      picker.addColorStop('#ff00ff', 0);
    }).toThrow();
  });

  it('Returns the right color', function () {
    let picked = picker.addColorStop('#ff0000', 0).pick(10);
    expect(picked).toEqual({
      r: 255,
      g: 0,
      b: 0,
      a: 1,
    });

    picked = picker.addColorStop('#0000ff', 100).pick(50);
    expect(picked).toEqual({
      r: 0x80,
      g: 0,
      b: 0x80,
      a: 1,
    });

    picked = picker.addColorStop('#00ff00', 50).pick(50);
    expect(picked).toEqual({
      r: 0,
      g: 0xff,
      b: 0,
      a: 1,
    });
  });
});
