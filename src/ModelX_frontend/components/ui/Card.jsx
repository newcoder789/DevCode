import React from 'react'

export const ModelCard = ({ model }) => {
    return (
      <div className="bg-white p-4 rounded-md shadow-lg transition-transform hover:scale-105">
        <h3 className="text-lg font-semibold">{model.name}</h3>
        <p className="text-sm text-gray-500">{model.language}</p>
        <div className="flex gap-2 mt-2">
          {model.tags.map((tag) => (
            <span key={tag} className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        <Button variant="primary" onClick={() => alert(`Viewing ${model.name}`)}>
          View Model
        </Button>
      </div>
    );
  };
  