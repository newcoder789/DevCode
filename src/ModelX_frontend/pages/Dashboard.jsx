import React, { useState, useEffect } from "react";

const Dashboard = ({ identity, actor }) => {
    const [models, setModels] = useState([]);
    const [remainingTrials, setRemainingTrials] = useState({});
    const [accessKeys, setAccessKeys] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (actor && identity) {
            fetchData();
        }
    }, [actor, identity]);

    const fetchData = async () => {
        try {
            // Fetch models and remaining trials
            const modelList = await actor.getModels();
            setModels(modelList);
            const trials = {};
            for (const model of modelList) {
                const remaining = await actor.getRemainingTrials(model.id);
                trials[model.id] = Number(remaining);
            }
            setRemainingTrials(trials);

            // Fetch access keys (simulating purchased models)
            const allKeys = await actor.getTransactions();
            const userKeys = allKeys.filter((key) => key[1].toString() === identity.getPrincipal().toText());
            setAccessKeys(userKeys);
        } catch (err) {
            setError("An error occurred while fetching dashboard data.");
            console.error("Fetch dashboard data error:", err);
        }
    };

    if (!identity) {
        return <div>Please log in to view your dashboard.</div>;
    }

    return (
        <div>
            <h1>User Dashboard</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <h2>Remaining Free Trials</h2>
            {models.length === 0 ? (
                <p>No models available.</p>
            ) : (
                models.map((model) => (
                    <div key={model.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
                        <p>Model: {model.name}</p>
                        <p>Remaining Free Trials: {remainingTrials[model.id]}</p>
                    </div>
                ))
            )}

            <h2>Purchased Models</h2>
            {accessKeys.length === 0 ? (
                <p>No models purchased yet.</p>
            ) : (
                accessKeys.map((key, index) => (
                    <div key={index} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
                        <p>Model ID: {key[0].toString()}</p>
                        <p>Access Key: KEY-{key[0].toString()}-{identity.getPrincipal().toText()}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Dashboard;