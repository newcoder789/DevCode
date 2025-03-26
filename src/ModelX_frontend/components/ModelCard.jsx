function ModelCard({ model, onSelect }) {
    return (
      <li className="flex justify-between items-center p-2 bg-gray-100 rounded">
        <span>
          {model.name} - {(Number(model.price) / 100_000_000).toFixed(2)} LICP
        </span>
        <button
          onClick={() => onSelect(model)}
          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Select
        </button>
      </li>
    );
  }
  
  export default ModelCard;