import React from "react";
import PropTypes from "prop-types";
import JiraTicketCreator from "../jira-ticket-creator/JiraTicketCreator";
import styles from "./CharacterPreview.module.css";

function CharacterPreview({ selectedCharacter }) {
    if (!selectedCharacter) {
        return <p>No character selected.</p>;
    }

    return (
        <div className={styles.character_preview_container}>
            <h2 className={styles.character_name}>{selectedCharacter.name}</h2>
            <div className={styles.character_details}>
                <p className={styles.character_detail}>
                    Height: {selectedCharacter.height}cm
                </p>
                <p className={styles.character_detail}>
                    Mass: {selectedCharacter.mass}kg
                </p>
                <p className={styles.character_detail}>
                    Hair colour: {selectedCharacter.hair_color}
                </p>
                <p className={styles.character_detail}>
                    Skin colour: {selectedCharacter.skin_color}
                </p>
            </div>

            <JiraTicketCreator selectedCharacter={selectedCharacter} />
        </div>
    );
}
CharacterPreview.propTypes = {
    selectedCharacter: PropTypes.shape({
        name: PropTypes.string,
        height: PropTypes.string,
        mass: PropTypes.string,
        hair_color: PropTypes.string,
        skin_color: PropTypes.string,
    }),
};

CharacterPreview.defaultProps = {
    selectedCharacter: null,
};

export default CharacterPreview;
