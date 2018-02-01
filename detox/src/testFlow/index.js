const exportWrapper = require('./exportWrapper');

export default (...commands) => async (prevRes = undefined, context) => {
  context = context || {
    element: exportWrapper.element,
    expect: exportWrapper.expect,
    device: exportWrapper.device
  };

  for (let command of commands)
    prevRes = await command(prevRes, context);
};
