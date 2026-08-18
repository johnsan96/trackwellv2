import React from "react";

interface finance {
    showPotentials: boolean;
    incomeName: string;
    expenseName: string;
    incomeAmount: string;
    expenseAmount: string;
    incomeDate: string;
    expenseDate: string;
    setIncomeName: (e: React.SetStateAction<string>) => void;
    setIncomeAmount: (e: React.SetStateAction<string>) => void;
    addIncome: () => void;
    setExpenseName: (e: React.SetStateAction<string>) => void;
    addExpense: () => void;
    setExpenseAmount: (e: React.SetStateAction<string>) => void;
    setIncomeDate: (e: React.SetStateAction<string>) => void;
    setExpenseDate: (e: React.SetStateAction<string>) => void;

    // Neue Props für voraussichtliche Einnahmen/Ausgaben
    potentialIncomeName: string;
    potentialExpenseName: string;
    potentialIncomeAmount: string;
    potentialExpenseAmount: string;
    potentialIncomeDate: string;
    potentialExpenseDate: string;
    setPotentialIncomeName: (e: React.SetStateAction<string>) => void;
    setPotentialIncomeAmount: (e: React.SetStateAction<string>) => void;
    addPotentialIncome: () => void;
    setPotentialExpenseName: (e: React.SetStateAction<string>) => void;
    setPotentialExpenseAmount: (e: React.SetStateAction<string>) => void;
    setPotentialIncomeDate: (e: React.SetStateAction<string>) => void;
    setPotentialExpenseDate: (e: React.SetStateAction<string>) => void;
    addPotentialExpense: () => void;
}

export default function FormFinance({
    showPotentials,
    incomeName,
    expenseName,
    incomeAmount,
    expenseAmount,
    incomeDate,
    expenseDate,
    setIncomeAmount,
    setIncomeName,
    addIncome,
    setExpenseName,
    setExpenseAmount,
    setIncomeDate,
    setExpenseDate,
    addExpense,

    // Neue Props
    potentialIncomeName,
    potentialExpenseName,
    potentialIncomeAmount,
    potentialExpenseAmount,
    potentialIncomeDate,
    potentialExpenseDate,
    setPotentialIncomeName,
    setPotentialIncomeAmount,
    addPotentialIncome,
    setPotentialExpenseName,
    setPotentialExpenseAmount,
    setPotentialIncomeDate,
    setPotentialExpenseDate,
    addPotentialExpense,
}: finance) {

    return (
        <React.Fragment>
            <div className="container">
                <div className="forms row">

                    {!showPotentials && <>
                    {/* Normale Einnahmen */}
                    <div /* className="col-12 col-md-6 mb-3" */>
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
                            <input type="date" aria-label="Datum der Einnahme" value={incomeDate} onChange={(e) => setIncomeDate(e.target.value)} />
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
                            <input type="date" aria-label="Datum der Ausgabe" value={expenseDate} onChange={(e) => setExpenseDate(e.target.value)} />
                            <button onClick={addExpense}>Ausgabe hinzufügen</button>
                        </div>
                    </div>
                    </>}
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
                                    <input type="date" aria-label="Datum der geplanten Einnahme" value={potentialIncomeDate} onChange={(e) => setPotentialIncomeDate(e.target.value)} />
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
                                    <input type="date" aria-label="Datum der geplanten Ausgabe" value={potentialExpenseDate} onChange={(e) => setPotentialExpenseDate(e.target.value)} />
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
