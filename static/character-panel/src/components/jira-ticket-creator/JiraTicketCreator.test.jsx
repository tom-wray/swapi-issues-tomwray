import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import JiraTicketCreator from "./JiraTicketCreator";
import "@testing-library/jest-dom";
import { invoke } from "@forge/bridge";

jest.mock("@forge/bridge", () => ({
    invoke: jest.fn(),
}));

describe("JiraTicketCreator", () => {
    const mockCharacter = {
        name: "Luke Skywalker",
        height: "172",
        mass: "77",
        hair_color: "blond",
        skin_color: "fair",
    };

    it("renders the create Jira ticket button", () => {
        const { getByText } = render(
            <JiraTicketCreator selectedCharacter={mockCharacter} />
        );
        expect(getByText("Create Jira ticket")).toBeInTheDocument();
    });

    it("displays loading message when creating a Jira ticket", async () => {
        invoke.mockImplementation(() => new Promise(() => {}));
        const { getByText, getByRole } = render(
            <JiraTicketCreator selectedCharacter={mockCharacter} />
        );

        fireEvent.click(getByRole("button", { name: "Create Jira ticket" }));
        expect(getByText("Loading...")).toBeInTheDocument();
    });

    it("displays error message when Jira ticket creation fails", async () => {
        const errorMessage = "Failed to create Jira ticket";
        invoke.mockRejectedValue(new Error(errorMessage));
        const { getByText, getByRole } = render(
            <JiraTicketCreator selectedCharacter={mockCharacter} />
        );

        fireEvent.click(getByRole("button", { name: "Create Jira ticket" }));

        await waitFor(() => {
            expect(getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
        });
    });

    it("displays Jira ticket key when Jira ticket is created successfully", async () => {
        const mockResponse = { key: "JIRA-123" };
        invoke.mockResolvedValue(mockResponse);
        const { getByText, getByRole } = render(
            <JiraTicketCreator selectedCharacter={mockCharacter} />
        );

        fireEvent.click(getByRole("button", { name: "Create Jira ticket" }));

        await waitFor(() => {
            expect(
                getByText(`Jira ticket created: ${mockResponse.key}`)
            ).toBeInTheDocument();
        });
    });
});
