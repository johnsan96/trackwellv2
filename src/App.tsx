import { useState, useEffect } from 'react';
import FormFinance from './FormFinance';
import { Tooltip } from 'bootstrap';

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

interface Transaction {
  name: string;
  amount: number;
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

  /*     const { currentUser } = useAuth() */

  /*     const navigate = useNavigate(); */

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

  // Hinzufügen von voraussichtlichen Einnahmen/Ausgaben
  const addPotentialExpense = () => {
    if (potentialExpenseName && potentialExpenseAmount) {
      const newExpense = { name: potentialExpenseName, amount: parseFloat(potentialExpenseAmount) };
      const updatedExpenses = [...potentialExpenses, newExpense];
      setPotentialExpenses(updatedExpenses);
      localStorage.setItem('potentialExpenses', JSON.stringify(updatedExpenses));
      setPotentialExpenseName('');
      setPotentialExpenseAmount('');
    }
  };

  const addPotentialIncome = () => {
    if (potentialIncomeName && potentialIncomeAmount) {
      const newIncome = { name: potentialIncomeName, amount: parseFloat(potentialIncomeAmount) };
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

  /*  const handleSignOut = async () => {
       try {
           await doSignOut();
           navigate('/login'); // Weiterleitung zur Login-Seite
       } catch (error) {
           console.error('Fehler beim Abmelden:', error);
       }
   }; */

  // alte Berechnung
  /*   const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    const totalIncomes = incomes.reduce((total, income) => total + income.amount, 0);
    const remainingBalance = Math.round((balance + totalIncomes - totalExpenses) * 100) / 100; */

  // neue Berechnung
  // Berechnungen
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const totalIncomes = incomes.reduce((total, income) => total + income.amount, 0);

  const potentialExpenseTotal = potentialExpenses.reduce((total, expense) => total + expense.amount, 0);
  const potentialIncomeTotal = potentialIncomes.reduce((total, income) => total + income.amount, 0);

  const remainingBalance = Math.round((balance + totalIncomes - totalExpenses) * 100) / 100;
  const projectedBalance = Math.round((remainingBalance + potentialIncomeTotal - potentialExpenseTotal) * 100) / 100;

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
          top: "10px", // Abstand vom oberen Rand
          right: "10px", // Abstand vom rechten Rand
          backgroundColor: "orange", // Hintergrundfarbe des Badges
          color: "white", // Textfarbe
          padding: "5px 10px", // Innenabstand
          borderRadius: "5px", // Abgerundete Ecken
          fontWeight: "bold", // Fettschrift
          zIndex: 1000, // Überlagert andere Elemente
          fontSize: "12px", // Schriftgröße
        }}
      >
        Open Alpha - Testversion
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center', // Zentriert horizontal
          alignItems: 'center', // Zentriert vertikal
          minHeight: '100vh', // Volle Höhe des Viewports
          backgroundColor: '#f0f4f8', // Hintergrundfarbe der App
          margin: 0,
        }}
      >
        <div className="Finance">
          <>
            {/**
             * 
             *    <p style={{ color: 'black' }}>{currentUser?.uid}</p>
          
                  <div className='text-2xl font-bold pt-14'>Hello {currentUser?.displayName ? currentUser.displayName : currentUser?.email}, you are now logged in.</div>
             */}
          </>

          <h2>Trackwell - Easy & Fast Money-Tracking</h2>
          {/*      <p>Zuletzt aktualisiert: {date}</p> */}
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
                  const currentDate = new Date().toLocaleString(); // Aktuelles Datum und Uhrzeit
                  localStorage.setItem('balance', newBalance.toString());
                  localStorage.setItem('balanceDate', currentDate); // Datum speichern
                  setDate(currentDate); // Datum aktualisieren
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
                value={balance}
                onChange={(e) => {
                  const newBalance = parseFloat(e.target.value);
                  if (!isNaN(newBalance)) {
                    setBalance(newBalance);
                    const currentDate = new Date().toLocaleString(); // Aktuelles Datum und Uhrzeit
                    localStorage.setItem('balance', newBalance.toString());
                    localStorage.setItem('balanceDate', currentDate); // Datum speichern
                    setDate(currentDate); // Datum aktualisieren
                  }
                }}
                style={{ flex: 1 }}
              />
            </div>
            {/* Datum anzeigen */}
            {/*   <p style={{ marginTop: "10px", fontSize: "12px", color: "gray" }}>
                    Letzte Änderung: {date}
                </p> */}
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

            // Neue Props für voraussichtliche Einträge
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
                <button onClick={() => deleteIncome(index)} className='delete-button'>x</button>
                {income.name}: {income.amount}€
              </li>
            ))}
          </ul>

          <h3 className="section-heading">Ausgaben</h3>
          <ul>
            {expenses.map((expense, index) => (
              <li key={index}>
                <button onClick={() => deleteExpense(index)} className='delete-button'>x</button>
                {expense.name}: {expense.amount}€
              </li>
            ))}
          </ul>

          <button
            onClick={() => setShowPotentials(!showPotentials)} // Umschalten
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
          </button>


          {showPotentials && (
            <>
              <h3 className="section-heading mt-3">Geplante Einnahmen</h3>
              <ul>
                {potentialIncomes.map((income, index) => (

                  <li key={index}>
                    <button onClick={() => deletePotentialIncome(index)} className="delete-button">x</button>
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
                      In Einnahmen verschieben
                    </button>

                  </li>
                ))}
              </ul>

              <h3 className="section-heading">Geplante Ausgaben</h3>
              <ul>
                {potentialExpenses.map((expense, index) => (
                  <li key={index}>
                    <button onClick={() => deletePotentialExpense(index)} className="delete-button">x</button>
                    {expense.name}: {expense.amount}€
                    <button
                      onClick={() => movePotentialExpenseToExpense(index)}
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
                      In Ausgaben verschieben
                    </button>

                  </li>
                ))}
              </ul>


            </>
          )}

          {/*   <hr /> */}
          <div
            style={{
              backgroundColor: "black", // Schwarzer Hintergrund
              color: "white",           // Standard-Textfarbe
              padding: "20px",          // Innenabstand
              borderRadius: "10px",     // Abgerundete Ecken
              marginTop: "20px",        // Abstand nach oben
            }}
          >
            <h3
              style={{
                marginBottom: "10px",
                color: remainingBalance < 0 ? "red" : "white", // Rot, wenn negativ; Weiß, wenn positiv
              }}
            >
              Neuer Kontostand: {remainingBalance}€
            </h3>

            {showPotentials && (
              <h3
                style={{
                  marginBottom: "10px",
                  color: projectedBalance < 0 ? "red" : "white", // Rot, wenn negativ; Weiß, wenn positiv
                }}
              >
                Voraussichtlicher Kontostand: {projectedBalance}€
              </h3>
            )}
          </div>

          <button
            onClick={clearAllData}
            style={{
              marginTop: "10px",
              backgroundColor: "red",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Alles löschen
          </button>

          {/*   <button onClick={handleSignOut} style={{ marginTop: '20px', backgroundColor: 'red', color: 'white', marginLeft: '20px' }}>
                Abmelden
            </button> */}
        </div>
      </div>
    </>
  );
}

export default App;
