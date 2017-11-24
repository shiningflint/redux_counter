import React from 'react';
import { shallow } from 'enzyme';
import { ValueShow, Buttons } from './App';
import App from './App';

function setup(value = 0) {
  const actions = {
    onIncrement: jest.fn(),
    onDecrement: jest.fn(),
  };

  const app = shallow(<App
    value={value}
    onIncrement={actions.onIncrement}
    onDecrement={actions.onDecrement} />);

  const buttons = shallow(<Buttons
    onIncrement={app.instance().props.onIncrement}
    onDecrement={app.instance().props.onDecrement}
    incrementIfOdd={app.instance().incrementIfOdd}
    incrementAsync={app.instance().incrementAsync} />);

  return {
    actions: actions,
    buttons: buttons.find('button'),
    app: app,
  };
}

describe('Counter component', () => {
  it('should display count', () => {
    const wrapper = shallow(<ValueShow value={0} />);
    expect(wrapper.find('.value-text').text()).toMatch(/^Amount clicked: 0$/);
  });

  it('first button should call onIncrement', () => {
    const { actions, buttons } = setup();
    buttons.at(0).simulate('click')
    expect(actions.onIncrement).toBeCalled();
  });

  it('second button should call onDecrement', () => {
    const { actions, buttons } = setup();
    buttons.at(1).simulate('click');
    expect(actions.onDecrement).toBeCalled();
  });

  it('third button should not call incrementIfOdd if value is even', () => {
    const { buttons, app } = setup(2);
    buttons.at(2).simulate('click');
    expect(app.instance().props.onIncrement).not.toBeCalled();
  });

  it('fourth button should call onIncrement in a second', (done) => {
    const { buttons, app } = setup()
    buttons.at(3).simulate('click');
    setTimeout(() => {
      expect(app.instance().props.onIncrement).toBeCalled()
      done()
    }, 1000);
  })
});
