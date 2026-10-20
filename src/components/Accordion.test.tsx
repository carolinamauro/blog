import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Accordion, AccordionItem } from "./Accordion";

afterEach(cleanup);

describe("MDX accordion", () => {
  it("connects the title to its detail and disables hidden interactive content", () => {
    render(
      <AccordionItem title="Learn more">
        <a href="#related-posts">Read the blog</a>
      </AccordionItem>,
    );
    const trigger = screen.getByRole("button", { name: "Learn more" });
    const panel = document.getElementById(trigger.getAttribute("aria-controls")!)!;

    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(panel.hasAttribute("inert")).toBe(true);
    expect(screen.queryByRole("region")).toBeNull();

    fireEvent.click(trigger);
    expect(screen.getByRole("region", { name: "Learn more" })).toBe(panel);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(panel.hasAttribute("inert")).toBe(false);

    fireEvent.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(panel.hasAttribute("inert")).toBe(true);
    // Preserve detail state and allow the closing transition to complete.
    expect(panel.querySelector("a")?.textContent).toBe("Read the blog");
  });

  it("keeps multiple items independent with unique accessible associations", () => {
    render(
      <Accordion>
        <AccordionItem title="First">First detail</AccordionItem>
        <AccordionItem title="Second" defaultOpen>Second detail</AccordionItem>
      </Accordion>,
    );
    const first = screen.getByRole("button", { name: "First" });
    const second = screen.getByRole("button", { name: "Second" });
    expect(first.getAttribute("aria-controls")).not.toBe(second.getAttribute("aria-controls"));
    fireEvent.click(first);
    expect(screen.getAllByRole("region")).toHaveLength(2);
    fireEvent.click(second);
    expect(screen.getByRole("region", { name: "First" })).toBeTruthy();
    expect(screen.queryByRole("region", { name: "Second" })).toBeNull();
  });

  it("supports the surrounding article's heading hierarchy", () => {
    render(<AccordionItem title="Section detail" headingLevel={4}>Detail</AccordionItem>);
    expect(screen.getByRole("heading", { level: 4 }).textContent).toBe("Section detail");
  });
});
