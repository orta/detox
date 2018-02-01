const actions = require('./actions');

class MockElement {
  constructor() {
    this.tapped = false;
    this.longPressed = false;
    this.tappedTimes = null;
    this.text = '';
    this.scroll = {
      direction: '',
      distance: 0,
    };
    this.swipe = {
      direction: '',
      speed: '',
      percentage: 0,
    };
  }

  tap() {
    this.tapped = true;
  }

  longPress() {
    this.longPressed = true;
  }

  multiTap(times) {
    this.tappedTimes = times;
  }

  typeText(text) {
    this.text = text;
  }

  replaceText(text) {
    this.text = text;
  }

  clearText() {
    this.text = '';
  }

  scroll(distance, direction) {
    this.scroll = {direction, distance};
  }

  scrollTo(edge) {
    this.scroll = {direction: edge};
  }

  swipe(direction, speed, percentage) {
    this.swipe = {direction, speed, percentage};
  }
}

class MockContext {
  constructor(matcher = {}, el = new MockElement()) {
    this.els = new Map([[matcher, el]]);
    this.device = {
      reloadReactNative: () => this.device.reloaded = true,
      reloaded: false,
    }
  }

  element(matcher) {
    return this.els.get(matcher);
  }
}

describe('testFlow actions', () => {
  describe('findElement', () => {
    const el = new MockElement();

    it('returns the element from previous step', () => {
      const foundElement = actions.findElement(undefined, el, new MockContext());

      expect(foundElement).toBe(el);
    });

    it('returns looks for element in context', () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};

      const foundElement = actions.findElement(matcher, el, new MockContext(matcher, contextEl));

      expect(foundElement).toBe(contextEl);
    });
  });

  describe('find', () => {
    it('finds and returns the element from previous step', () => {
      const el = {mock: 'element from previous step'};

      const foundElement = actions.find(undefined)(el, {});

      expect(foundElement).toBe(el);
    });

    it('finds and returns the element from context', () => {
      const contextEl = {mock: 'element from context'};
      const matcher = {byId: 'test'};

      const foundElement = actions.find(matcher)({}, new MockContext(matcher, contextEl));

      expect(foundElement).toBe(contextEl);
    });
  });

  describe('reloadReact', () => {
    it('reloads react native on device', () => {
      const context = new MockContext();

      actions.reloadReact()(undefined, context);

      expect(context.device.reloaded).toBe(true);
    });
  });

  describe('tap', () => {
    it('taps the element from previous step', () => {
      const el = new MockElement();

      const element = actions.tap()(el, new MockContext());

      expect(element).toBe(el);
      expect(el.tapped).toBe(true);
    });

    it('taps the element found by matcher', () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};

      const element = actions.tap(matcher)({}, new MockContext(matcher, contextEl));

      expect(element).toBe(contextEl);
      expect(contextEl.tapped).toBe(true);
    });
  });

  describe('longPress', () => {
    it('long presses the element from previous step', () => {
      const el = new MockElement();

      const element = actions.longPress()(el, new MockContext());

      expect(element).toBe(el);
      expect(el.longPressed).toBe(true);
    });

    it('long presses the element found by matcher', () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};

      const element = actions.longPress(matcher)({}, new MockContext(matcher, contextEl));

      expect(element).toBe(contextEl);
      expect(contextEl.longPressed).toBe(true);
    });
  });

  describe('multiTap', () => {
    it('multitaps the element from previous step', () => {
      const el = new MockElement();
      const times = 2;

      const element = actions.multiTap(times)(el, new MockContext());

      expect(element).toBe(el);
      expect(el.tappedTimes).toBe(times);
    });

    it('multitaps the element found by matcher', () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};
      const times = 2;

      const element = actions.multiTap(times, matcher)({}, new MockContext(matcher, contextEl));

      expect(element).toBe(contextEl);
      expect(contextEl.tappedTimes).toBe(times);
    });
  });

  describe('typeText', () => {
    it('types text to the element from previous step', () => {
      const el = new MockElement();
      const text = 'some text';

      const element = actions.typeText(text)(el, new MockContext());

      expect(element).toBe(el);
      expect(el.text).toBe(text);
    });

    it('types text to the element found by matcher', () => {
      const contextEl = new MockElement();
      const matcher = {byId: 'test'};
      const text = 'some text';

      const element = actions.typeText(text, matcher)({}, new MockContext(matcher, contextEl));

      expect(element).toBe(contextEl);
      expect(contextEl.text).toBe(text);
    });
  });

  describe('replaceText', () => {
    it('replaces text in the element from previous step', () => {
      const el = new MockElement();
      const context = new MockContext();
      const text = 'another text';

      actions.typeText('some text')(el, context);
      const element = actions.replaceText(text)(el, context);

      expect(element).toBe(el);
      expect(el.text).toBe(text);
    });

    it('replaces text in the element found by matcher', () => {
      const matcher = {byId: 'test'};
      const contextEl = new MockElement();
      const context = new MockContext(matcher, contextEl);
      const text = 'another text';

      actions.typeText('some text', matcher)({}, context);
      const element = actions.replaceText(text, matcher)({}, context);

      expect(element).toBe(contextEl);
      expect(contextEl.text).toBe(text);
    });
  });

  describe('clearText', () => {
    it('clears text in the element from previous step', () => {
      const el = new MockElement();
      const context = new MockContext();

      actions.typeText('some text')(el, context);
      const element = actions.clearText()(el, context);

      expect(element).toBe(el);
      expect(el.text).toBe('');
    });

    it('clears text in the element found by matcher', () => {
      const matcher = {byId: 'test'};
      const contextEl = new MockElement();
      const context = new MockContext(matcher, contextEl);

      actions.typeText('some text', matcher)({}, context);
      const element = actions.clearText(matcher)({}, context);

      expect(element).toBe(contextEl);
      expect(contextEl.text).toBe('');
    });
  });
});
