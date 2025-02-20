import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CharacterSelect from "./CharacterSelect";
import "@testing-library/jest-dom";

describe("CharacterSelect", () => {
    const mockCharacterList = [
        { url: "1", name: "Luke Skywalker" },
        { url: "2", name: "Darth Vader" },
    ];
    const mockSetSelectedCharacter = jest.fn();

    it("renders the select element with options", () => {
        const { getByLabelText, getByText } = render(
            <CharacterSelect
                characterList={mockCharacterList}
                selectedCharacter={null}
                setSelectedCharacter={mockSetSelectedCharacter}
            />
        );

        expect(getByLabelText("Select a character:")).toBeInTheDocument();
        expect(getByText("-- select an option --")).toBeInTheDocument();
        expect(getByText("Luke Skywalker")).toBeInTheDocument();
        expect(getByText("Darth Vader")).toBeInTheDocument();
    });

    it("calls setSelectedCharacter with the selected character", () => {
        const { getByLabelText } = render(
            <CharacterSelect
                characterList={mockCharacterList}
                selectedCharacter={null}
                setSelectedCharacter={mockSetSelectedCharacter}
            />
        );

        fireEvent.change(getByLabelText("Select a character:"), {
            target: { value: "1" },
        });

        expect(mockSetSelectedCharacter).toHaveBeenCalledWith(
            mockCharacterList[0]
        );
    });

    it("displays the selected character", () => {
        const { getByLabelText } = render(
            <CharacterSelect
                characterList={mockCharacterList}
                selectedCharacter={mockCharacterList[1]}
                setSelectedCharacter={mockSetSelectedCharacter}
            />
        );

        expect(getByLabelText("Select a character:").value).toBe("2");
    });
});
