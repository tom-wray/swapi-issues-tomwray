import React from "react";
import PropTypes from "prop-types";
import styles from "./CharacterSelect.module.css";

function CharacterSelect({
    characterList,
    selectedCharacter,
    setSelectedCharacter,
}) {
    return (
        <div className={styles.character_select_container}>
            <label htmlFor="character-select">Select a character:</label>
            <select
                id="character-select"
                value={selectedCharacter ? selectedCharacter.url : ""}
                onChange={(e) =>
                    setSelectedCharacter(
                        characterList.find((c) => c.url === e.target.value) ||
                            null
                    )
                }
            >
                <option selected value>
                    {" "}
                    -- select an option --{" "}
                </option>
                {characterList.map((character) => (
                    <option key={character.url} value={character.url}>
                        {character.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

CharacterSelect.propTypes = {
    characterList: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string,
            name: PropTypes.string,
        })
    ).isRequired,
    selectedCharacter: PropTypes.shape({
        url: PropTypes.string,
        name: PropTypes.string,
    }),
    setSelectedCharacter: PropTypes.func.isRequired,
};

CharacterSelect.defaultProps = {
    selectedCharacter: null,
};

export default CharacterSelect;
