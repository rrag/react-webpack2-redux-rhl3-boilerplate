import React from "react"
import renderer from "react-test-renderer";

import Layout from "../src/components/Layout"

it("renders foobar", () => {
	const tree = renderer.create(
		<Layout>foobar</Layout>
	).toJSON();
	expect(tree).toMatchSnapshot();
});
