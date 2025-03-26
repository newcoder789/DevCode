import React, { useState, useEffect } from "react";

const DatasetPage = ({ identity, actor }) => {
    const [datasets, setDatasets] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (actor) {
            fetchDatasets();
        }
    }, [actor]);

    const fetchDatasets = async () => {
        try {
            const datasetList = await actor.getDatasets();
            setDatasets(datasetList);
        } catch (err) {
            setError("An error occurred while fetching datasets.");
            console.error("Fetch datasets error:", err);
        }
    };

    return (
        <div>
            <h1>Datasets</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {datasets.length === 0 ? (
                <p>No datasets available.</p>
            ) : (
                datasets.map((dataset) => (
                    <div key={dataset.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
                        <p>Name: {dataset.name}</p>
                        <p>Description: {dataset.description}</p>
                        <p>Owner: {dataset.owner.toText()}</p>
                        <p>URL: <a href={dataset.url} target="_blank" rel="noopener noreferrer">{dataset.url}</a></p>
                    </div>
                ))
            )}
        </div>
    );
};

export default DatasetPage;