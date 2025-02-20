import React, { useEffect, useState } from "react";
import CharacterPreview from "./components/character-preview/CharacterPreview";
import CharacterSelect from "./components/character-select/CharacterSelect";
import JiraTicketCreator from "./components/jira-ticket-creator/JiraTicketCreator";

function App() {
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [characterList, setCharacterList] = useState([]);

    const [charactersError, setCharactersError] = useState(null);
    const [charactersLoading, setCharactersLoading] = useState(true);

    // Fetch all the character details
    const getAllCharacters = async () => {
        try {
            const response = await fetch("https://swapi.dev/api/people/");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = await response.json();
            setCharacterList(json.results);
        } catch (error) {
            setCharactersError(error);
        } finally {
            setCharactersLoading(false);
        }
    };

    // Fetch the character details when the component is loaded
    useEffect(() => {
        getAllCharacters();
    }, []);

    return (
        <div>
            {charactersLoading && <p>Loading...</p>}
            {charactersError && <p>Error: {charactersError.message}</p>}
            {characterList.length === 0 && !charactersLoading && (
                <p>No characters found</p>
            )}
            {characterList.length > 0 && !charactersLoading && (
                <>
                    <CharacterSelect
                        characterList={characterList}
                        selectedCharacter={selectedCharacter}
                        setSelectedCharacter={setSelectedCharacter}
                    />
                    <CharacterPreview selectedCharacter={selectedCharacter} />
                    <JiraTicketCreator selectedCharacter={selectedCharacter} />
                </>
            )}
        </div>
    );
}

export default App;
