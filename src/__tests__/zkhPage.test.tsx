import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("zkh pricing page", () => {
  const originalLocation = window.location;

  afterEach(() => {
    window.history.pushState(null, "", "/");
  });

  afterAll(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: originalLocation,
    });
  });

  it("keeps the market pricing page separate from the zkh pricing page", () => {
    window.history.pushState(null, "", "/");
    render(<App />);

    expect(screen.getByText("热敏纸报价与竞品对比计算器")).toBeInTheDocument();
    expect(screen.queryByText("震坤行材料客户报价计算器")).not.toBeInTheDocument();
  });

  it("shows the zkh pricing tool on its own path", () => {
    window.history.pushState(null, "", "/zkh-pricing");
    render(<App />);

    expect(screen.getByText("震坤行材料客户报价计算器")).toBeInTheDocument();
    expect(screen.getByText("客户销售价计算")).toBeInTheDocument();
    expect(screen.getByText("报价说明主规则")).toBeInTheDocument();
    expect(screen.getByText("震坤行通货价格参考")).toBeInTheDocument();
    expect(screen.getByText("另外供应商价格参考")).toBeInTheDocument();
    expect(screen.getByText("客户报价以报价说明参数为准")).toBeInTheDocument();
  });

  it("shows matched reference prices below the quote when the entered size hits reference sheets", async () => {
    const user = userEvent.setup();
    window.history.pushState(null, "", "/zkh-pricing");
    render(<App />);

    await user.type(screen.getByLabelText("震坤行宽度(mm)"), "80");
    await user.type(screen.getByLabelText("震坤行高度(mm)"), "50");
    await user.type(screen.getByLabelText("震坤行每卷张数"), "960");

    expect(screen.getByText("当前规格参考价格")).toBeInTheDocument();
    expect(screen.getByText("命中震坤行通货价格")).toBeInTheDocument();
    expect(screen.getAllByText("命中另外供应商价格").length).toBeGreaterThan(0);
    expect(screen.getAllByText("8.85").length).toBeGreaterThan(0);
    expect(screen.getAllByText("9.03").length).toBeGreaterThan(0);
  });

  it("does not reserve the matched reference area when the entered size misses reference sheets", async () => {
    const user = userEvent.setup();
    window.history.pushState(null, "", "/zkh-pricing");
    render(<App />);

    await user.type(screen.getByLabelText("震坤行宽度(mm)"), "81");
    await user.type(screen.getByLabelText("震坤行高度(mm)"), "51");
    await user.type(screen.getByLabelText("震坤行每卷张数"), "777");

    expect(screen.queryByText("当前规格参考价格")).not.toBeInTheDocument();
  });
});
