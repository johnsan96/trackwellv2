import { useState, useEffect } from 'react';
import FormFinance from './FormFinance';
import { Tooltip } from 'bootstrap';

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Neues Icon für sichtbare/unsichtbare Zustände

// Transaktions-Interface – optional erweitern wir geplante Einträge um ein hidden-Flag
interface Transaction {
  name: string;
  amount: number;
  hidden?: boolean; // Nur für geplante Einträge relevant
}

function App() {
  const [balance, setBalance] = useState<number>(0);

  // Normale Einnahmen und Ausgaben
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [incomes, setIncomes] = useState<Transaction[]>([]);

  // Voraussichtliche Einnahmen und Ausgaben
  const [potentialExpenses, setPotentialExpenses] = useState<Transaction[]>([]);
  const [potentialIncomes, setPotentialIncomes] = useState<Transaction[]>([]);

  const [expenseName, setExpenseName] = useState<string>('');
  const [expenseAmount, setExpenseAmount] = useState<string>('');
  const [incomeName, setIncomeName] = useState<string>('');
  const [incomeAmount, setIncomeAmount] = useState<string>('');

  const [potentialExpenseName, setPotentialExpenseName] = useState<string>('');
  const [potentialExpenseAmount, setPotentialExpenseAmount] = useState<string>('');
  const [potentialIncomeName, setPotentialIncomeName] = useState<string>('');
  const [potentialIncomeAmount, setPotentialIncomeAmount] = useState<string>('');

  const [showPotentials, setShowPotentials] = useState<boolean>(false);
  const [date, setDate] = useState<string>(new Date().toLocaleDateString());

  useEffect(() => {
    const storedBalance = localStorage.getItem('balance');
    const storedExpenses = localStorage.getItem('expenses');
    const storedIncomes = localStorage.getItem('incomes');
    const storedPotentialExpenses = localStorage.getItem('potentialExpenses');
    const storedPotentialIncomes = localStorage.getItem('potentialIncomes');

    if (storedBalance) {
      setBalance(parseFloat(storedBalance));
    }
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
    if (storedIncomes) {
      setIncomes(JSON.parse(storedIncomes));
    }
    if (storedPotentialExpenses) setPotentialExpenses(JSON.parse(storedPotentialExpenses));
    if (storedPotentialIncomes) setPotentialIncomes(JSON.parse(storedPotentialIncomes));
  }, []);

  const addExpense = () => {
    if (expenseName && expenseAmount) {
      const newExpense = { name: expenseName, amount: parseFloat(expenseAmount) };
      const updatedExpenses = [...expenses, newExpense];
      setExpenses(updatedExpenses);
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
      setExpenseName('');
      setExpenseAmount('');
    }
  };

  const addIncome = () => {
    if (incomeName && incomeAmount) {
      const newIncome = { name: incomeName, amount: parseFloat(incomeAmount) };
      const updatedIncomes = [...incomes, newIncome];
      setIncomes(updatedIncomes);
      localStorage.setItem('incomes', JSON.stringify(updatedIncomes));
      setIncomeName('');
      setIncomeAmount('');
    }
  };

  // Hinzufügen von voraussichtlichen Einnahmen/Ausgaben mit hidden-Flag (standardmäßig false)
  const addPotentialExpense = () => {
    if (potentialExpenseName && potentialExpenseAmount) {
      const newExpense: Transaction = { name: potentialExpenseName, amount: parseFloat(potentialExpenseAmount), hidden: false };
      const updatedExpenses = [...potentialExpenses, newExpense];
      setPotentialExpenses(updatedExpenses);
      localStorage.setItem('potentialExpenses', JSON.stringify(updatedExpenses));
      setPotentialExpenseName('');
      setPotentialExpenseAmount('');
    }
  };

  const addPotentialIncome = () => {
    if (potentialIncomeName && potentialIncomeAmount) {
      const newIncome: Transaction = { name: potentialIncomeName, amount: parseFloat(potentialIncomeAmount), hidden: false };
      const updatedIncomes = [...potentialIncomes, newIncome];
      setPotentialIncomes(updatedIncomes);
      localStorage.setItem('potentialIncomes', JSON.stringify(updatedIncomes));
      setPotentialIncomeName('');
      setPotentialIncomeAmount('');
    }
  };

  const movePotentialIncomeToIncome = (indexToMove: number) => {
    const itemToMove = potentialIncomes[indexToMove];
    const updatedPotentialIncomes = potentialIncomes.filter((_, index) => index !== indexToMove);
    setPotentialIncomes(updatedPotentialIncomes);
    setIncomes([...incomes, itemToMove]);

    localStorage.setItem('potentialIncomes', JSON.stringify(updatedPotentialIncomes));
    localStorage.setItem('incomes', JSON.stringify([...incomes, itemToMove]));
  };

  const movePotentialExpenseToExpense = (indexToMove: number) => {
    const itemToMove = potentialExpenses[indexToMove];
    const updatedPotentialExpenses = potentialExpenses.filter((_, index) => index !== indexToMove);
    setPotentialExpenses(updatedPotentialExpenses);
    setExpenses([...expenses, itemToMove]);

    localStorage.setItem('potentialExpenses', JSON.stringify(updatedPotentialExpenses));
    localStorage.setItem('expenses', JSON.stringify([...expenses, itemToMove]));
  };

  const clearAllData = () => {
    setBalance(0);
    setExpenses([]);
    setIncomes([]);
    setPotentialExpenses([]);
    setPotentialIncomes([]);
    localStorage.removeItem('balance');
    localStorage.removeItem('expenses');
    localStorage.removeItem('incomes');
    localStorage.removeItem('potentialIncomes');
    localStorage.removeItem('potentialExpenses');
  };

  const deleteIncome = (indexToDelete: number) => {
    const updatedIncomes = incomes.filter((_, index) => index !== indexToDelete);
    setIncomes(updatedIncomes);
    localStorage.setItem('incomes', JSON.stringify(updatedIncomes));
  };

  const deleteExpense = (indexToDelete: number) => {
    const updatedExpenses = expenses.filter((_, index) => index !== indexToDelete);
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const deletePotentialIncome = (indexToDelete: number) => {
    const updatedIncomes = potentialIncomes.filter((_, index) => index !== indexToDelete);
    setPotentialIncomes(updatedIncomes);
    localStorage.setItem('potentialIncomes', JSON.stringify(updatedIncomes));
  };

  const deletePotentialExpense = (indexToDelete: number) => {
    const updatedExpenses = potentialExpenses.filter((_, index) => index !== indexToDelete);
    setPotentialExpenses(updatedExpenses);
    localStorage.setItem('potentialExpenses', JSON.stringify(updatedExpenses));
  };

  // Neue Toggle-Funktion für geplante Einnahmen
  const togglePotentialIncomeVisibility = (index: number) => {
    const updatedPotentialIncomes = [...potentialIncomes];
    updatedPotentialIncomes[index].hidden = !updatedPotentialIncomes[index].hidden;
    setPotentialIncomes(updatedPotentialIncomes);
    localStorage.setItem('potentialIncomes', JSON.stringify(updatedPotentialIncomes));
  };

  // Neue Toggle-Funktion für geplante Ausgaben
  const togglePotentialExpenseVisibility = (index: number) => {
    const updatedPotentialExpenses = [...potentialExpenses];
    updatedPotentialExpenses[index].hidden = !updatedPotentialExpenses[index].hidden;
    setPotentialExpenses(updatedPotentialExpenses);
    localStorage.setItem('potentialExpenses', JSON.stringify(updatedPotentialExpenses));
  };

  // Berechnung des Basis-Kontostands (bereits vorhanden)
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const totalIncomes = incomes.reduce((total, income) => total + income.amount, 0);
  const remainingBalance = Math.round((balance + totalIncomes - totalExpenses) * 100) / 100;

  // Nur sichtbare geplante Einnahmen und Ausgaben berücksichtigen:
  const potentialIncomeEffect = potentialIncomes.reduce(
    (sum, income) => sum + (income.hidden ? 0 : income.amount),
    0
  );
  const potentialExpenseEffect = potentialExpenses.reduce(
    (sum, expense) => sum + (expense.hidden ? 0 : expense.amount),
    0
  );

  // Für den prognostizierten Kontostand: Einnahmen addieren, Ausgaben subtrahieren
  const projectedBalance = Math.round((remainingBalance + potentialIncomeEffect - potentialExpenseEffect) * 100) / 100;


  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      try {
        new Tooltip(tooltipTriggerEl); // Tooltip instanziieren
      } catch (error) {
        console.error('Tooltip konnte nicht initialisiert werden:', error);
      }
    });
  }, []);

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "orange",
          color: "white",
          padding: "5px 10px",
          borderRadius: "5px",
          fontWeight: "bold",
          zIndex: 1000,
          fontSize: "12px",
        }}
      >
        Open Alpha - Testversion
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f0f4f8',
          margin: 0,
        }}
      >
        <div className="Finance">
          <h2>Trackwell - Easy & Fast Money-Tracking</h2>

          <div>
            <label data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={"Kontostand beschreibt den Betrag, der aktuell auf deinem Bankkonto (z. B. Girokonto, Tagesgeld) verfügbar ist oder auch den Betrag, den du gerade zu Hause hast."}
              style={{ cursor: "pointer" }}>Kontostand (geändert am: {date}):</label>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                onClick={() => {
                  const newBalance = -balance;
                  setBalance(newBalance);
                  const currentDate = new Date().toLocaleString();
                  localStorage.setItem('balance', newBalance.toString());
                  localStorage.setItem('balanceDate', currentDate);
                  setDate(currentDate);
                }}
                style={{
                  padding: "4px 8px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                ±
              </button>
              <input
                type="number"
                placeholder="Betrag eingeben"
                value={balance === 0 ? "" : balance}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (inputValue === "") {
                    setBalance(0);
                    localStorage.setItem("balance", "0");
                    return;
                  }
                  const newBalance = parseFloat(inputValue);
                  if (!isNaN(newBalance)) {
                    setBalance(newBalance);
                    const currentDate = new Date().toLocaleString();
                    localStorage.setItem("balance", newBalance.toString());
                    localStorage.setItem("balanceDate", currentDate);
                    setDate(currentDate);
                  }
                }}
                style={{ flex: 1 }}
              />
            </div>
          </div>

          <FormFinance
            incomeName={incomeName}
            expenseName={expenseName}
            incomeAmount={incomeAmount}
            expenseAmount={expenseAmount}
            setIncomeName={setIncomeName}
            setIncomeAmount={setIncomeAmount}
            addIncome={addIncome}
            setExpenseName={setExpenseName}
            setExpenseAmount={setExpenseAmount}
            addExpense={addExpense}
            potentialIncomeName={potentialIncomeName}
            potentialExpenseName={potentialExpenseName}
            potentialIncomeAmount={potentialIncomeAmount}
            potentialExpenseAmount={potentialExpenseAmount}
            setPotentialIncomeName={setPotentialIncomeName}
            setPotentialIncomeAmount={setPotentialIncomeAmount}
            addPotentialIncome={addPotentialIncome}
            setPotentialExpenseName={setPotentialExpenseName}
            setPotentialExpenseAmount={setPotentialExpenseAmount}
            addPotentialExpense={addPotentialExpense}
          />

          <h3 className="section-heading mt-3">Einnahmen</h3>
          <ul>
            {incomes.map((income, index) => (
              <li key={index}>
                <button onClick={() => deleteIncome(index)} className='delete-button'>
                  <DeleteIcon />
                </button>
                {income.name}: {income.amount}€
              </li>
            ))}
          </ul>

          <h3 className="section-heading">Ausgaben</h3>
          <ul>
            {expenses.map((expense, index) => (
              <li key={index}>
                <button onClick={() => deleteExpense(index)} className='delete-button'>
                  <DeleteIcon />
                </button>
                {expense.name}: {expense.amount}€
              </li>
            ))}
          </ul>

          <button
            onClick={() => setShowPotentials(!showPotentials)}
            style={{
              marginTop: '3px',
              backgroundColor: '#dcdcdc',
              color: 'black',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {showPotentials ? 'Geplante Ein-/Ausgaben ausblenden' : 'Geplante Ein-/Ausgaben anzeigen'}
            {showPotentials ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </button>

          {showPotentials && (
            <>
              <h3 className="section-heading mt-3">Geplante Einnahmen</h3>
              <ul>
                {potentialIncomes.map((income, index) => (
                  <li key={index} style={{ color: income.hidden ? 'grey' : 'inherit' }}>
                    <button onClick={() => deletePotentialIncome(index)} className="delete-button">
                      <DeleteIcon />
                    </button>
                    {/* Toggle-Button: Wenn hidden, dann VisibilityIcon anzeigen, sonst VisibilityOffIcon */}
                    <button onClick={() => togglePotentialIncomeVisibility(index)} className="delete-button">
                      {income.hidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </button>
                    {income.name}: {income.amount}€
                    <button
                      onClick={() => movePotentialIncomeToIncome(index)}
                      style={{
                        marginLeft: "10px",
                        backgroundColor: "green",
                        color: "white",
                        padding: "5px 10px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Zu Einnahmen
                    </button>
                  </li>
                ))}
              </ul>

              <h3 className="section-heading">Geplante Ausgaben</h3>
              <ul>
                {potentialExpenses.map((expense, index) => (
                  <li key={index} style={{ color: expense.hidden ? 'grey' : 'inherit' }}>
                    <button onClick={() => deletePotentialExpense(index)} className="delete-button">
                      <DeleteIcon />
                    </button>
                    {/* Toggle-Button für Ausgaben */}
                    <button onClick={() => togglePotentialExpenseVisibility(index)} className="delete-button">
                      {expense.hidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </button>
                    {expense.name}: {expense.amount}€
                    <button
                      onClick={() => movePotentialExpenseToExpense(index)}
                      style={{
                        marginLeft: "10px",
                        backgroundColor: "red",
                        color: "white",
                        padding: "5px 10px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Zu Ausgaben
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
            <h3
              style={{
                marginBottom: "10px",
                fontSize: "21px",
                color: remainingBalance < 0 ? "red" : "white",
              }}
            >
              Neuer Kontostand: {remainingBalance}€
            </h3>

            {showPotentials && (
              <h3
                style={{
                  marginBottom: "10px",
                  fontSize: "21px",
                  color: projectedBalance < 0 ? "red" : "white",
                }}
              >
                Prognostizierter Kontostand: {projectedBalance}€
              </h3>
            )}
          </div>

          <button
            onClick={() => {
              if (window.confirm("Bist du dir sicher, dass du wirklich ALLES löschen möchtest?")) {
                clearAllData();
              }
            }}
            style={{
              marginTop: "10px",
              backgroundColor: "#d32f2f",
              color: "#ffffff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#b71c1c")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#d32f2f")}
          >
            Alles löschen
          </button>
        </div>
      </div>

     {/*  <footer
        className='footer'
        style={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
          fontStyle: "italic",
          fontSize: "12px",
          color: "gray",
        }}
      >
        Entwickelt von johnsan96
      </footer> */}
    </>
  );
}

export default App;
