import { invoke } from "@forge/bridge";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styles from "./JiraTicketCreator.module.css";

function JiraTicketCreator({ selectedCharacter }) {
    const [jiraTicketError, setJiraTicketError] = useState(null);
    const [jiraTicketLoading, setJiraTicketLoading] = useState(false);
    const [jiraTicket, setJiraTicket] = useState(null);

    // Add a Jira ticket with the selected character details
    const addJiraTicket = async () => {
        if (selectedCharacter) {
            setJiraTicket(null);
            setJiraTicketError(null);
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
        <div className={styles.jira_ticket_creator_container}>
            <button
                className={styles.create_ticket_btn}
                onClick={addJiraTicket}
            >
                Create Jira ticket
            </button>
            {jiraTicketLoading && <p>Loading...</p>}
            {jiraTicketError && <p className="error_message">Error: {jiraTicketError.message}</p>}
            {jiraTicket && !jiraTicketLoading && (
                <p>Jira ticket created: {jiraTicket.key}</p>
            )}
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
