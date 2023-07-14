import renderer from 'react-test-renderer';
import Header from './header';

it('Render the Header', () => {
  const component = renderer.create(
    <Header />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // tree.getElement()
  // // manually trigger the hover: 
  // renderer.act(() => {
  //   tree.props.onMouseEnter();
  // });
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();

  // // manually trigger the callback
  // renderer.act(() => {
  //   tree.props.onMouseLeave();
  // });
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});