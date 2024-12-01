import React from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface finance {
    incomeName: string;
    expenseName: string;
    incomeAmount: string;
    expenseAmount: string;
    setIncomeName: (e: React.SetStateAction<string>) => void;
    setIncomeAmount: (e: React.SetStateAction<string>) => void;
    addIncome: () => void;
    setExpenseName: (e: React.SetStateAction<string>) => void;
    addExpense: () => void;
    setExpenseAmount: (e: React.SetStateAction<string>) => void;

    // Neue Props für voraussichtliche Einnahmen/Ausgaben
    potentialIncomeName: string;
    potentialExpenseName: string;
    potentialIncomeAmount: string;
    potentialExpenseAmount: string;
    setPotentialIncomeName: (e: React.SetStateAction<string>) => void;
    setPotentialIncomeAmount: (e: React.SetStateAction<string>) => void;
    addPotentialIncome: () => void;
    setPotentialExpenseName: (e: React.SetStateAction<string>) => void;
    setPotentialExpenseAmount: (e: React.SetStateAction<string>) => void;
    addPotentialExpense: () => void;
}

export default function FormFinance({
    incomeName,
    expenseName,
    incomeAmount,
    expenseAmount,
    setIncomeAmount,
    setIncomeName,
    addIncome,
    setExpenseName,
    setExpenseAmount,
    addExpense,

    // Neue Props
    potentialIncomeName,
    potentialExpenseName,
    potentialIncomeAmount,
    potentialExpenseAmount,
    setPotentialIncomeName,
    setPotentialIncomeAmount,
    addPotentialIncome,
    setPotentialExpenseName,
    setPotentialExpenseAmount,
    addPotentialExpense,
}: finance) {

    const [showPotentials, setShowPotentials] = React.useState<boolean>(false);

    return (
        <React.Fragment>
            <div className="container">
                <div className="forms row">

                    {/* Normale Einnahmen */}
                    <div /* className="col-12 col-md-6 mb-3" */ className="mt-3">
                        <div className="form">
                            <input
                                type="text"
                                placeholder="Einnahmen Name"
                                value={incomeName}
                                onChange={(e) => setIncomeName(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Betrag"
                                value={incomeAmount}
                                onChange={(e) => setIncomeAmount(e.target.value)}
                            />
                            <button onClick={addIncome}>Einnahme hinzufügen</button>
                        </div>
                    </div>

                    {/* Normale Ausgaben */}
                    <div /* className="col-12 col-md-6 mb-3 mt-3" */>
                        <div className="form">
                            <input
                                type="text"
                                placeholder="Ausgaben Name"
                                value={expenseName}
                                onChange={(e) => setExpenseName(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Betrag"
                                value={expenseAmount}
                                onChange={(e) => setExpenseAmount(e.target.value)}
                            />
                            <button onClick={addExpense}>Ausgabe hinzufügen</button>
                        </div>
                    </div>
                    {/* Toggle Button für Potentials */}
                    <div className="col-12 mb-3">
                        <button
                            onClick={() => setShowPotentials(!showPotentials)} // Toggle Sichtbarkeit
                            style={{
                                backgroundColor: "#dcdcdc",
                                color: "black",
                                padding: "10px 20px",
                                border: "none",
                                marginTop: "10px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                width: "100%",
                            }}
                        >
                            {showPotentials ? "Geplante Ein-/Ausgaben" : "Geplante Ein-/Ausgaben hinzufügen"}

                            {showPotentials ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </button>
                    </div>
                    {/* Voraussichtliche Einnahmen/Ausgaben */}
                    {showPotentials && (
                        <>
                            {/* Voraussichtliche Einnahmen */}
                            <div /* className="col-12 col-md-6 mb-3 mt-3" */>
                                <div className="form">
                                    <input
                                        type="text"
                                        placeholder="Geplante Einnahme"
                                        value={potentialIncomeName}
                                        onChange={(e) => setPotentialIncomeName(e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Betrag"
                                        value={potentialIncomeAmount}
                                        onChange={(e) => setPotentialIncomeAmount(e.target.value)}
                                    />
                                    <button onClick={addPotentialIncome}>Geplante Einnahme hinzufügen</button>
                                </div>
                            </div>

                            {/* Voraussichtliche Ausgaben */}
                            <div /* className="col-12 col-md-6 mb-3 mt-3" */>
                                <div className="form">
                                    <input
                                        type="text"
                                        placeholder="Geplante Ausgabe"
                                        value={potentialExpenseName}
                                        onChange={(e) => setPotentialExpenseName(e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Betrag"
                                        value={potentialExpenseAmount}
                                        onChange={(e) => setPotentialExpenseAmount(e.target.value)}
                                    />
                                    <button onClick={addPotentialExpense}>Geplante Ausgabe hinzufügen</button>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </React.Fragment>
    );
}
