/* eslint-disable react/prop-types */

const IntervalSelector = ({
  selectedInterval,
  onIntervalChange,
  intervals,
}) => {
  return (
    <div className="flex space-x-2">
      {intervals.map((interval) => (
        <button
          key={interval}
          onClick={() => onIntervalChange(interval)}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            selectedInterval === interval
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          } border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          {interval}
        </button>
      ))}
    </div>
  );
};

export default IntervalSelector;
