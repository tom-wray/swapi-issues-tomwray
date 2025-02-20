import { invoke } from "@forge/bridge";
import PropTypes from "prop-types";
import React, { useState } from "react";

function JiraTicketCreator({ selectedCharacter }) {
    const [jiraTicketError, setJiraTicketError] = useState(null);
    const [jiraTicketLoading, setJiraTicketLoading] = useState(false);
    const [jiraTicket, setJiraTicket] = useState(null);

    // Add a Jira ticket with the selected character details
    const addJiraTicket = async () => {
        if (selectedCharacter) {
            setJiraTicketLoading(true);
            try {
                const response = await invoke("createJiraTicket", {
                    characterSummary: `${selectedCharacter.name}: ${selectedCharacter.height}cm, ${selectedCharacter.mass}kg, ${selectedCharacter.hair_color} hair, ${selectedCharacter.skin_color} skin`,
                });
                setJiraTicket(response);
            } catch (error) {
                setJiraTicketError(error);
            } finally {
                setJiraTicketLoading(false);
            }
        }
    };

    return (
        <div>
            <button onClick={addJiraTicket}>Create Jira ticket</button>
            {jiraTicketLoading && <p>Loading...</p>}
            {jiraTicketError && <p>Error: {jiraTicketError.message}</p>}
            {jiraTicket && <p>Jira ticket created: {jiraTicket.key}</p>}
        </div>
    );
}

JiraTicketCreator.propTypes = {
    selectedCharacter: PropTypes.shape({
        name: PropTypes.string,
        height: PropTypes.string,
        mass: PropTypes.string,
        hair_color: PropTypes.string,
        skin_color: PropTypes.string,
    }),
};

export default JiraTicketCreator;
