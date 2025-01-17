import { render, screen } from "@testing-library/react";
import Healthbar from "../components/Healthbar";
import {describe, it, expect} from "vitest";

describe("Healthbar Component", () => {
    it("renders the health bar with correct width based on currentHealth", () => {
        const health = 100;
        const currentHealth = 50;

        render(<Healthbar health={health} currentHealth={currentHealth} />);

        const healthBar = screen.getByTestId("healthbar-fill"); // Select the health bar
        expect(healthBar).toHaveStyle("width: 50%"); // Check calculated width
    });

    it("displays the correct health values", () => {
        const health = 100;
        const currentHealth = 75;

        render(<Healthbar health={health} currentHealth={currentHealth} />);

        expect(screen.getByText("100/75")).toBeInTheDocument(); // Ensure correct text
    });

    it("handles undefined currentHealth gracefully", () => {
        const health = 100;

        render(<Healthbar health={health} currentHealth={undefined} />);

        expect(screen.getByText("100/100")).toBeInTheDocument(); // Ensure fallback behavior
    });

    it("renders with 0% width when currentHealth is 0", () => {
        const health = 100;
        const currentHealth = 0;

        render(<Healthbar health={health} currentHealth={currentHealth} />);

        const healthBar = screen.getByTestId("healthbar-fill"); // Select the health bar
        expect(healthBar).toHaveStyle("width: 0%"); // Check for 0 width
    });
});