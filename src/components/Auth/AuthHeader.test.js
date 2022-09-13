import renderer from "react-test-renderer";
import AuthHeader from "./AuthHeader";

it("renders correctly", () => {
  const tree = renderer.create(<AuthHeader title="Login" />).toJSON();
  expect(tree).toMatchSnapshot();
});
