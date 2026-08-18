import { useState, useEffect } from 'react';
import FormFinance from './FormFinance';
import { Tooltip } from 'bootstrap';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Neues Icon für sichtbare/unsichtbare Zustände
import FixedCostsModal from './FixedCostsModal';

// Transaktions-Interface – optional erweitern wir geplante Einträge um ein hidden-Flag
interface Transaction {
  name: string;
  amount: number;
  date?: string;
  hidden?: boolean; // Nur für geplante Einträge relevant
}

type TransactionList = 'incomes' | 'expenses' | 'potentialIncomes' | 'potentialExpenses';

interface EditingTransaction {
  list: TransactionList;
  index: number;
  name: string;
  amount: string;
  date: string;
}

interface ActionMenu {
  list: TransactionList;
  index: number;
  anchorElement: HTMLElement;
}

const getTodayDate = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${today.getFullYear()}-${month}-${day}`;
};

const formatDate = (date?: string) => date ? date.split('-').reverse().join('.') : 'Kein Datum';

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
  const [incomeDate, setIncomeDate] = useState<string>(getTodayDate());
  const [expenseDate, setExpenseDate] = useState<string>(getTodayDate());

  const [potentialExpenseName, setPotentialExpenseName] = useState<string>('');
  const [potentialExpenseAmount, setPotentialExpenseAmount] = useState<string>('');
  const [potentialIncomeName, setPotentialIncomeName] = useState<string>('');
  const [potentialIncomeAmount, setPotentialIncomeAmount] = useState<string>('');
  const [potentialExpenseDate, setPotentialExpenseDate] = useState<string>(getTodayDate());
  const [potentialIncomeDate, setPotentialIncomeDate] = useState<string>(getTodayDate());

  const [showPotentials, setShowPotentials] = useState<boolean>(false);
  const [editingTransaction, setEditingTransaction] = useState<EditingTransaction | null>(null);
  const [actionMenu, setActionMenu] = useState<ActionMenu | null>(null);


  const [isModalOpen, setIsModalOpen] = useState(false);

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

/*   useEffect(() => {
    console.log(expenseName, expenseAmount);
  }, [expenseName, expenseAmount]); */


  const addExpense = () => {
    console.log("addExpense");
    if (expenseName && expenseAmount) {
      const newExpense = { name: expenseName, amount: parseFloat(expenseAmount), date: expenseDate };
      const updatedExpenses = [...expenses, newExpense];
      setExpenses(updatedExpenses);
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
      setExpenseName('');
      setExpenseAmount('');
      setExpenseDate(getTodayDate());
    } else {
      console.log("false ...")
    }
  };

  const addIncome = () => {
    if (incomeName && incomeAmount) {
      const newIncome = { name: incomeName, amount: parseFloat(incomeAmount), date: incomeDate };
      const updatedIncomes = [...incomes, newIncome];
      setIncomes(updatedIncomes);
      localStorage.setItem('incomes', JSON.stringify(updatedIncomes));
      setIncomeName('');
      setIncomeAmount('');
      setIncomeDate(getTodayDate());
    } else {
      console.log("false ...")
    }
  };

  // Hinzufügen von voraussichtlichen Einnahmen/Ausgaben mit hidden-Flag (standardmäßig false)
  const addPotentialExpense = () => {
    if (potentialExpenseName && potentialExpenseAmount) {
      const newExpense: Transaction = { name: potentialExpenseName, amount: parseFloat(potentialExpenseAmount), date: potentialExpenseDate, hidden: false };
      const updatedExpenses = [...potentialExpenses, newExpense];
      setPotentialExpenses(updatedExpenses);
      localStorage.setItem('potentialExpenses', JSON.stringify(updatedExpenses));
      setPotentialExpenseName('');
      setPotentialExpenseAmount('');
      setPotentialExpenseDate(getTodayDate());
    }
  };

  const addPotentialIncome = () => {
    if (potentialIncomeName && potentialIncomeAmount) {
      const newIncome: Transaction = { name: potentialIncomeName, amount: parseFloat(potentialIncomeAmount), date: potentialIncomeDate, hidden: false };
      const updatedIncomes = [...potentialIncomes, newIncome];
      setPotentialIncomes(updatedIncomes);
      localStorage.setItem('potentialIncomes', JSON.stringify(updatedIncomes));
      setPotentialIncomeName('');
      setPotentialIncomeAmount('');
      setPotentialIncomeDate(getTodayDate());
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

  const startEditing = (list: TransactionList, index: number, transaction: Transaction) => {
    setEditingTransaction({ list, index, name: transaction.name, amount: transaction.amount.toString(), date: transaction.date ?? getTodayDate() });
  };

  const cancelEditing = () => setEditingTransaction(null);

  const saveEditing = () => {
    if (!editingTransaction) return;

    const name = editingTransaction.name.trim();
    const amount = Number(editingTransaction.amount);
    if (!name || !Number.isFinite(amount)) return;

    const updateTransaction = (transactions: Transaction[]) =>
      transactions.map((transaction, index) =>
        index === editingTransaction.index ? { ...transaction, name, amount, date: editingTransaction.date } : transaction
      );

    switch (editingTransaction.list) {
      case 'incomes': {
        const updated = updateTransaction(incomes);
        setIncomes(updated);
        localStorage.setItem('incomes', JSON.stringify(updated));
        break;
      }
      case 'expenses': {
        const updated = updateTransaction(expenses);
        setExpenses(updated);
        localStorage.setItem('expenses', JSON.stringify(updated));
        break;
      }
      case 'potentialIncomes': {
        const updated = updateTransaction(potentialIncomes);
        setPotentialIncomes(updated);
        localStorage.setItem('potentialIncomes', JSON.stringify(updated));
        break;
      }
      case 'potentialExpenses': {
        const updated = updateTransaction(potentialExpenses);
        setPotentialExpenses(updated);
        localStorage.setItem('potentialExpenses', JSON.stringify(updated));
        break;
      }
    }

    setEditingTransaction(null);
  };

  const isEditing = (list: TransactionList, index: number) =>
    editingTransaction?.list === list && editingTransaction.index === index;

  const openActionMenu = (event: React.MouseEvent<HTMLButtonElement>, list: TransactionList, index: number) => {
    setActionMenu({ list, index, anchorElement: event.currentTarget });
  };

  const closeActionMenu = () => setActionMenu(null);

  const runMenuAction = (action: () => void) => {
    action();
    closeActionMenu();
  };

  const activeMenuTransaction = actionMenu && (
    actionMenu.list === 'incomes' ? incomes[actionMenu.index]
      : actionMenu.list === 'expenses' ? expenses[actionMenu.index]
        : actionMenu.list === 'potentialIncomes' ? potentialIncomes[actionMenu.index]
          : potentialExpenses[actionMenu.index]
  );

  const toggleTransactionVisibility = (list: TransactionList, indexToToggle: number) => {
    const toggle = (transactions: Transaction[]) =>
      transactions.map((transaction, index) =>
        index === indexToToggle ? { ...transaction, hidden: !transaction.hidden } : transaction
      );

    switch (list) {
      case 'incomes': {
        const updated = toggle(incomes);
        setIncomes(updated);
        localStorage.setItem('incomes', JSON.stringify(updated));
        break;
      }
      case 'expenses': {
        const updated = toggle(expenses);
        setExpenses(updated);
        localStorage.setItem('expenses', JSON.stringify(updated));
        break;
      }
      case 'potentialIncomes': {
        const updated = toggle(potentialIncomes);
        setPotentialIncomes(updated);
        localStorage.setItem('potentialIncomes', JSON.stringify(updated));
        break;
      }
      case 'potentialExpenses': {
        const updated = toggle(potentialExpenses);
        setPotentialExpenses(updated);
        localStorage.setItem('potentialExpenses', JSON.stringify(updated));
        break;
      }
    }
  };

  // Berechnung des Basis-Kontostands (bereits vorhanden)
  const totalExpenses = expenses.reduce((total, expense) => total + (expense.hidden ? 0 : expense.amount), 0);
  const totalIncomes = incomes.reduce((total, income) => total + (income.hidden ? 0 : income.amount), 0);
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
     {/*  <div
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
      </div> */}
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
              style={{ cursor: "pointer" }}>Gib deinen aktuellen Kontostand ein:</label>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                onClick={() => {
                  const newBalance = -balance;
                  setBalance(newBalance);
                  const currentDate = new Date().toLocaleString();
                  localStorage.setItem('balance', newBalance.toString());
                  localStorage.setItem('balanceDate', currentDate);
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
                  }
                }}
                style={{ flex: 1 }}
              />
            </div>
          </div>

          <div className="transaction-switch" role="tablist" aria-label="Buchungsart auswählen">
            <button
              className={!showPotentials ? 'active' : ''}
              onClick={() => setShowPotentials(false)}
              role="tab"
              aria-selected={!showPotentials}
            >
              Aktuell
            </button>
            <button
              className={showPotentials ? 'active' : ''}
              onClick={() => setShowPotentials(true)}
              role="tab"
              aria-selected={showPotentials}
            >
              Geplant
            </button>
          </div>

          <FormFinance
            showPotentials={showPotentials}
            incomeName={incomeName}
            expenseName={expenseName}
            incomeAmount={incomeAmount}
            expenseAmount={expenseAmount}
            incomeDate={incomeDate}
            expenseDate={expenseDate}
            setIncomeName={setIncomeName}
            setIncomeAmount={setIncomeAmount}
            addIncome={addIncome}
            setExpenseName={setExpenseName}
            setExpenseAmount={setExpenseAmount}
            setIncomeDate={setIncomeDate}
            setExpenseDate={setExpenseDate}
            addExpense={addExpense}
            potentialIncomeName={potentialIncomeName}
            potentialExpenseName={potentialExpenseName}
            potentialIncomeAmount={potentialIncomeAmount}
            potentialExpenseAmount={potentialExpenseAmount}
            potentialIncomeDate={potentialIncomeDate}
            potentialExpenseDate={potentialExpenseDate}
            setPotentialIncomeName={setPotentialIncomeName}
            setPotentialIncomeAmount={setPotentialIncomeAmount}
            addPotentialIncome={addPotentialIncome}
            setPotentialExpenseName={setPotentialExpenseName}
            setPotentialExpenseAmount={setPotentialExpenseAmount}
            setPotentialIncomeDate={setPotentialIncomeDate}
            setPotentialExpenseDate={setPotentialExpenseDate}
            addPotentialExpense={addPotentialExpense}
          />

          {!showPotentials && (
            <>
          <h3 className="section-heading mt-3">Einnahmen</h3>
          <ul>
            {incomes.map((income, index) => (
              <li key={index} style={{ color: income.hidden ? 'grey' : 'inherit' }}>
                {isEditing('incomes', index) ? (
                  <>
                    <input aria-label="Name der Einnahme" value={editingTransaction!.name} onChange={(e) => setEditingTransaction({ ...editingTransaction!, name: e.target.value })} />
                    <input aria-label="Betrag der Einnahme" type="number" step="0.01" value={editingTransaction!.amount} onChange={(e) => setEditingTransaction({ ...editingTransaction!, amount: e.target.value })} />
                    <input aria-label="Datum der Einnahme" type="date" value={editingTransaction!.date} onChange={(e) => setEditingTransaction({ ...editingTransaction!, date: e.target.value })} />
                    <button onClick={saveEditing} className="edit-button" aria-label="Einnahme speichern"><SaveIcon /></button>
                    <button onClick={cancelEditing} className="edit-button" aria-label="Bearbeitung abbrechen"><CloseIcon /></button>
                  </>
                ) : (
                  <>
                    <button onClick={(event) => openActionMenu(event, 'incomes', index)} className="menu-button" aria-label="Aktionen für Einnahme"><MoreVertIcon /></button>
                    {income.name}: {income.amount}€ · {formatDate(income.date)}
                  </>
                )}
              </li>
            ))}
          </ul>

          <h3 className="section-heading">Ausgaben</h3>
          <ul>
            {expenses.map((expense, index) => (
              <li key={index} style={{ color: expense.hidden ? 'grey' : 'inherit' }}>
                {isEditing('expenses', index) ? (
                  <>
                    <input aria-label="Name der Ausgabe" value={editingTransaction!.name} onChange={(e) => setEditingTransaction({ ...editingTransaction!, name: e.target.value })} />
                    <input aria-label="Betrag der Ausgabe" type="number" step="0.01" value={editingTransaction!.amount} onChange={(e) => setEditingTransaction({ ...editingTransaction!, amount: e.target.value })} />
                    <input aria-label="Datum der Ausgabe" type="date" value={editingTransaction!.date} onChange={(e) => setEditingTransaction({ ...editingTransaction!, date: e.target.value })} />
                    <button onClick={saveEditing} className="edit-button" aria-label="Ausgabe speichern"><SaveIcon /></button>
                    <button onClick={cancelEditing} className="edit-button" aria-label="Bearbeitung abbrechen"><CloseIcon /></button>
                  </>
                ) : (
                  <>
                    <button onClick={(event) => openActionMenu(event, 'expenses', index)} className="menu-button" aria-label="Aktionen für Ausgabe"><MoreVertIcon /></button>
                    {expense.name}: {expense.amount}€ · {formatDate(expense.date)}
                  </>
                )}
              </li>
            ))}
          </ul>
            </>
          )}

          {showPotentials && (
            <>
              <h3 className="section-heading mt-3">Geplante Einnahmen</h3>
              <ul>
                {potentialIncomes.map((income, index) => (
                  <li key={index} style={{ color: income.hidden ? 'grey' : 'inherit' }}>
                    {isEditing('potentialIncomes', index) ? (
                      <>
                        <input aria-label="Name der geplanten Einnahme" value={editingTransaction!.name} onChange={(e) => setEditingTransaction({ ...editingTransaction!, name: e.target.value })} />
                        <input aria-label="Betrag der geplanten Einnahme" type="number" step="0.01" value={editingTransaction!.amount} onChange={(e) => setEditingTransaction({ ...editingTransaction!, amount: e.target.value })} />
                        <input aria-label="Datum der geplanten Einnahme" type="date" value={editingTransaction!.date} onChange={(e) => setEditingTransaction({ ...editingTransaction!, date: e.target.value })} />
                        <button onClick={saveEditing} className="edit-button" aria-label="Geplante Einnahme speichern"><SaveIcon /></button>
                        <button onClick={cancelEditing} className="edit-button" aria-label="Bearbeitung abbrechen"><CloseIcon /></button>
                      </>
                    ) : (
                      <>
                        <button onClick={(event) => openActionMenu(event, 'potentialIncomes', index)} className="menu-button" aria-label="Aktionen für geplante Einnahme"><MoreVertIcon /></button>
                        {income.name}: {income.amount}€ · {formatDate(income.date)}
                      </>
                    )}
                  </li>
                ))}
              </ul>

              <h3 className="section-heading">Geplante Ausgaben</h3>
              <ul>
                {potentialExpenses.map((expense, index) => (
                  <li key={index} style={{ color: expense.hidden ? 'grey' : 'inherit' }}>
                    {isEditing('potentialExpenses', index) ? (
                      <>
                        <input aria-label="Name der geplanten Ausgabe" value={editingTransaction!.name} onChange={(e) => setEditingTransaction({ ...editingTransaction!, name: e.target.value })} />
                        <input aria-label="Betrag der geplanten Ausgabe" type="number" step="0.01" value={editingTransaction!.amount} onChange={(e) => setEditingTransaction({ ...editingTransaction!, amount: e.target.value })} />
                        <input aria-label="Datum der geplanten Ausgabe" type="date" value={editingTransaction!.date} onChange={(e) => setEditingTransaction({ ...editingTransaction!, date: e.target.value })} />
                        <button onClick={saveEditing} className="edit-button" aria-label="Geplante Ausgabe speichern"><SaveIcon /></button>
                        <button onClick={cancelEditing} className="edit-button" aria-label="Bearbeitung abbrechen"><CloseIcon /></button>
                      </>
                    ) : (
                      <>
                        <button onClick={(event) => openActionMenu(event, 'potentialExpenses', index)} className="menu-button" aria-label="Aktionen für geplante Ausgabe"><MoreVertIcon /></button>
                        {expense.name}: {expense.amount}€ · {formatDate(expense.date)}
                      </>
                    )}
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

          <div style={{ display: "flex", justifyContent: " space-between", marginTop: "20px" }}>
            <button style={{
              marginTop: "10px",
              backgroundColor: "green",
              color: "#ffffff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",

            }} onClick={() => setIsModalOpen(true)}>Fixkosten anzeigen</button>
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
          <FixedCostsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddExpense={addExpense} setExpenseName={setExpenseName} setExpenseAmount={setExpenseAmount} />

          {actionMenu && activeMenuTransaction && (
            <Menu
              anchorEl={actionMenu.anchorElement}
              open
              onClose={closeActionMenu}
              slotProps={{ paper: { sx: { minWidth: 210 } } }}
            >
              <MenuItem onClick={() => runMenuAction(() => startEditing(actionMenu.list, actionMenu.index, activeMenuTransaction))}>
                <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
                Bearbeiten
              </MenuItem>
              <MenuItem onClick={() => runMenuAction(() => toggleTransactionVisibility(actionMenu.list, actionMenu.index))}>
                <ListItemIcon>
                  {activeMenuTransaction.hidden ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                </ListItemIcon>
                {activeMenuTransaction.hidden ? 'Sichtbar machen' : 'Ausblenden'}
              </MenuItem>
              {actionMenu.list === 'potentialIncomes' && (
                <MenuItem onClick={() => runMenuAction(() => movePotentialIncomeToIncome(actionMenu.index))}>
                  Zu Einnahmen verschieben
                </MenuItem>
              )}
              {actionMenu.list === 'potentialExpenses' && (
                <MenuItem onClick={() => runMenuAction(() => movePotentialExpenseToExpense(actionMenu.index))}>
                  Zu Ausgaben verschieben
                </MenuItem>
              )}
              <MenuItem
                onClick={() => runMenuAction(() => {
                  if (actionMenu.list === 'incomes') deleteIncome(actionMenu.index);
                  if (actionMenu.list === 'expenses') deleteExpense(actionMenu.index);
                  if (actionMenu.list === 'potentialIncomes') deletePotentialIncome(actionMenu.index);
                  if (actionMenu.list === 'potentialExpenses') deletePotentialExpense(actionMenu.index);
                })}
                sx={{ color: 'error.main' }}
              >
                <ListItemIcon sx={{ color: 'error.main' }}><DeleteIcon fontSize="small" /></ListItemIcon>
                Entfernen
              </MenuItem>
            </Menu>
          )}

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
