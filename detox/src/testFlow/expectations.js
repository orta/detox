import {findElement} from './actions';


const isVisible = matcher => (prevRes, context) =>
  context.expect(findElement(matcher, prevRes, context)).toBeVisible();
const isNotVisible = matcher => (prevRes, context) =>
  context.expect(findElement(matcher, prevRes, context)).toBeNotVisible();
const doesExist = matcher => (prevRes, context) =>
  context.expect(findElement(matcher, prevRes, context)).toExist();
const doesNotExist = matcher => (prevRes, context) =>
  context.expect(findElement(matcher, prevRes, context)).toNotExist();
const hasText = (text, matcher) => (prevRes, context) =>
  context.expect(findElement(matcher, prevRes, context)).toHaveText(text);
const hasId = (id, matcher) => (prevRes, context) =>
  context.expect(findElement(matcher, prevRes, context)).toHaveId(id);
const hasValue = (value, matcher) => (prevRes, context) =>
  context.expect(findElement(matcher, prevRes, context)).toHaveValue(value);

export {
  isVisible,
  isNotVisible,
  doesExist,
  doesNotExist,
  hasText,
  hasId,
  hasValue,
}
