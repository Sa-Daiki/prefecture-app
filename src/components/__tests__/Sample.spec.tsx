import { render } from "@testing-library/react";
import Sample from "../Sample";

describe("サンプルコンポーネント", () => {
  test("should first", () => {
    const { getByText } = render(<Sample />);
    expect(getByText("Enter")).toBeTruthy();
  });
});
