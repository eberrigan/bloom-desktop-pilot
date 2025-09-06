import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FieldInfo from "./FieldInfo";

describe("FieldInfo", () => {
  it("renders the info icon and the tooltip content in the DOM", () => {
    render(<FieldInfo info="Upload an Excel file mapping Plant ID to Genotype ID." />);

    const icon = screen.getByTestId("info-icon");
    expect(icon).toBeInTheDocument();

    expect(
      screen.getByText(/Upload an Excel file mapping Plant ID to Genotype ID\./i)
    ).toBeInTheDocument();
  });

  it("applies Tailwind classes so the tooltip is hidden by default and shown on group-hover", () => {
    render(<FieldInfo info="Some helpful hint" />);

    const tooltip = screen.getByText(/Some helpful hint/i);

    expect(tooltip).toHaveClass("hidden");
    expect(tooltip).toHaveClass("group-hover:block");
  });

  it("supports hover/focus interactions without throwing", async () => {
    const user = userEvent.setup();
    render(<FieldInfo info="Hover to see me" />);

    const icon = screen.getByTestId("info-icon");

    await user.hover(icon);
    await user.unhover(icon);

    expect(screen.getByText(/Hover to see me/i)).toBeInTheDocument();
  });
});
