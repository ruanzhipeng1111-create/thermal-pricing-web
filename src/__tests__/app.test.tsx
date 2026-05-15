import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("app", () => {
  it("shows featured sizes on first load", () => {
    render(<App />);
    expect(screen.getByText("高频尺寸快捷入口")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /30 × 40 × 800/i }).length).toBeGreaterThan(0);
  });

  it("autofills values when a featured size is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getAllByRole("button", { name: /100 × 100 × 500/i })[0]);
    expect(screen.getByLabelText("宽度(mm)")).toHaveValue("100");
    expect(screen.getByLabelText("高度(mm)")).toHaveValue("100");
    expect(screen.getByLabelText("张数")).toHaveValue("500");
  });

  it("shows quote cards after required fields are entered", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText("宽度(mm)"), "100");
    await user.type(screen.getByLabelText("高度(mm)"), "100");
    await user.type(screen.getByLabelText("张数"), "500");
    expect(screen.getAllByText("13.93").length).toBeGreaterThan(0);
    expect(screen.getByText("建议常规价")).toBeInTheDocument();
  });
});
