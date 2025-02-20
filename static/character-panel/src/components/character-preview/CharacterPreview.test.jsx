import React from "react";
import { render } from "@testing-library/react";
import CharacterPreview from "./CharacterPreview";
import "@testing-library/jest-dom";

jest.mock("../jira-ticket-creator/JiraTicketCreator", () => () => (
    <button>Create Jira ticket</button>
));

describe("CharacterPreview", () => {
    it("renders 'No character selected.' when no character is selected", () => {
        const { getByText } = render(
            <CharacterPreview selectedCharacter={null} />
        );
        expect(getByText("No character selected.")).toBeInTheDocument();
    });

    it("renders character details when a character is selected", () => {
        const selectedCharacter = {
            name: "Luke Skywalker",
            height: "172",
            mass: "77",
            hair_color: "blond",
            skin_color: "fair",
        };

        const { getByText } = render(
            <CharacterPreview selectedCharacter={selectedCharacter} />
        );
        expect(getByText("Luke Skywalker")).toBeInTheDocument();
        expect(getByText("Height: 172cm")).toBeInTheDocument();
        expect(getByText("Mass: 77kg")).toBeInTheDocument();
        expect(getByText("Hair colour: blond")).toBeInTheDocument();
        expect(getByText("Skin colour: fair")).toBeInTheDocument();
        expect(getByText("Create Jira ticket")).toBeInTheDocument();
    });
});
