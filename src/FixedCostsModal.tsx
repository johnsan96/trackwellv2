import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, Button, List, ListItem, ListItemText, IconButton, Typography, useMediaQuery } from '@mui/material';

const modalStyle = (isSmallScreen:any) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: isSmallScreen ? '90%' : 600,
  maxWidth: '100%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: isSmallScreen ? 2 : 4,
  borderRadius: 2,
  maxHeight: '80vh', // Feste Höhe für das Modal
  overflowY: 'auto', // Scrollen innerhalb des Modals ermöglichen
});

const inputStyle = {
  marginBottom: 2,
};

const listItemStyle = (isSmallScreen:any) => ({
  display: 'flex',
  overflowY:"scroll",
  flexDirection: isSmallScreen ? 'column' : 'row',
  justifyContent: 'space-between',
  alignItems: isSmallScreen ? 'flex-start' : 'center',
  padding: '8px 0',
  gap: isSmallScreen ? 1 : 0,
});

const buttonContainerStyle = {
  display: 'flex',
  gap: 1,
  marginTop: (isSmallScreen:any) => isSmallScreen ? 1 : 0,
};

export default function FixedCostsModal({ isOpen, onClose, onAddExpense, setExpenseName, setExpenseAmount }:any) {
  const [fixedCosts, setFixedCosts] = useState<Array<{ name: string; amount: number }>>([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [fixcostToExpense, setFixcostToExpense] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  // Lade Fixkosten aus dem Local Storage beim ersten Rendern
  useEffect(() => {
    const storedFixedCosts = localStorage.getItem('fixedCosts');
    if (storedFixedCosts) {
      console.log('Loaded from localStorage:', JSON.parse(storedFixedCosts));
      setFixedCosts(JSON.parse(storedFixedCosts));
    }else {
      console.log('No fixed costs found in localStorage');
    }
  }, []);

  // Synchronisiere den Local Storage mit dem Zustand, wenn sich fixedCosts ändert
/*   useEffect(() => {
    localStorage.setItem('fixedCosts', JSON.stringify(fixedCosts));
  }, [fixedCosts]); */

  // Funktion zum Hinzufügen eines neuen Fixkosten-Eintrags
  const addFixedCost = () => {
    if (name && amount) {
      const newCost = { name, amount: parseFloat(amount) };
      const updatedCosts = [...fixedCosts, newCost];
      setFixedCosts(updatedCosts);
      localStorage.setItem('fixedCosts', JSON.stringify(updatedCosts));
      setName('');
      setAmount('');
    }
  };

  // Funktion zum Verschieben eines Fixkosten-Eintrags zu den Ausgaben
  const moveToExpenses = (cost:any) => {
    setExpenseName(cost.name);
    setExpenseAmount(cost.amount.toString());
    setFixcostToExpense(true);
  };

  // Funktion zum Löschen eines Fixkosten-Eintrags
  const deleteFixedCost = (index:any) => {
    const updatedCosts = fixedCosts.filter((_, i) => i !== index);
    setFixedCosts(updatedCosts);
    localStorage.setItem('fixedCosts', JSON.stringify(updatedCosts));
  };

  // Effekt, um onAddExpense aufzurufen, wenn fixcostToExpense true ist
  useEffect(() => {
    if (fixcostToExpense) {
      onAddExpense();
      setFixcostToExpense(false);
    }
  }, [fixcostToExpense]);

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle(isSmallScreen)}>
        <Typography variant="h5" gutterBottom>
          Fixkosten
        </Typography>
        <Box sx={inputStyle}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Betrag"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={addFixedCost}
            fullWidth
            sx={{ mt: 2 }}
          >
            Hinzufügen
          </Button>
        </Box>

     {/*    <Typography variant="h6" gutterBottom>
          Fixkosten-Tabelle
        </Typography> */}
        <List>
          {fixedCosts.map((cost, index) => (
            <ListItem key={index} sx={listItemStyle(isSmallScreen)}>
              <ListItemText style={{ color: 'black' }} primary={`${cost.name}: ${cost.amount}€`} />
              <Box sx={buttonContainerStyle}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => moveToExpenses(cost)}
                >
                  Einfügen
                </Button>
                <IconButton
                  color="error"
                  onClick={() => deleteFixedCost(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
}