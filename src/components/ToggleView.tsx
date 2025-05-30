type ToggleViewProps = {
    view: "list" | "grid";
    setView: (view: "list" | "grid") => void;
};

export default function ToggleView({ view, setView }: ToggleViewProps) {
    return (
        <div
            style={{
                display: "flex",
                gap: "1rem",
                backgroundColor: "#f3f4f6", 
                padding: "1rem",
                borderRadius: "0.375rem"
            }}
        >
            <button
                onClick={() => setView("list")}
                style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    backgroundColor: view === "list" ? "#22c55e" : "#e5e7eb",
                    color: view === "list" ? "#ffffff" : "#000000"
                }}
            >
                List View
            </button>

            <button
                onClick={() => setView("grid")}
                style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    backgroundColor: view === "grid" ? "#22c55e" : "#e5e7eb",
                    color: view === "grid" ? "#ffffff" : "#000000"
                }}
            >
                Grid View
            </button>
        </div>
    );
}

