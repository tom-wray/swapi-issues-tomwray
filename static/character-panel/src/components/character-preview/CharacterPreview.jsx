import React from "react";
import PropTypes from "prop-types";

function CharacterPreview({ selectedCharacter }) {
    if (!selectedCharacter) {
        return <p>No character selected.</p>;
    }

    return (
        <div>
            <h2>{selectedCharacter.name}</h2>
            <p>Height: {selectedCharacter.height}cm</p>
            <p>Mass: {selectedCharacter.mass}kg</p>
            <p>Hair colour: {selectedCharacter.hair_color}</p>
            <p>Skin colour: {selectedCharacter.skin_color}</p>
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
    }).isRequired,
};

CharacterPreview.defaultProps = {
    selectedCharacter: null,
};

export default CharacterPreview;
