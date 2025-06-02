import React from "react";

const Footer: React.FC<{
  remaining: number;
  currentFilter: "all" | "active" | "completed";
  onFilterChange: (f: "all" | "active" | "completed") => void;
  onClearCompleted: () => void;
}> = ({ remaining, currentFilter, onFilterChange, onClearCompleted }) => (
  <div className="footer">
    <span>{remaining} items left</span>
    <div className="filters">
      {["all", "active", "completed"].map(f => (
        <button
          key={f}
          onClick={() => onFilterChange(f as any)}
          style={{ fontWeight: currentFilter === f ? "bold" : "normal" }}
        >
          {f[0].toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
    <button onClick={onClearCompleted}>Clear completed</button>
  </div>
);

export default Footer;
