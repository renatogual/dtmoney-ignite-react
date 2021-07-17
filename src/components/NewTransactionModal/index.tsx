import { FormEvent, useContext, useState } from "react";
import { TransactionsContext } from "../../TransactionsContext";
import Modal from "react-modal";

import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";

import { Container, RadioBox, TransactionTypeContainer } from "./styles";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const formValuesInitialState = {
  title: "",
  value: 0,
  category: "",
};

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useContext(TransactionsContext);
  const [formValues, setFormValues] = useState(formValuesInitialState);
  const [type, setType] = useState("deposit");

  function handleCreateNewTransaction(e: FormEvent) {
    e.preventDefault();

    const data = { ...formValues, type };

    createTransaction(data);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>
        <input
          placeholder="Título"
          value={formValues?.title}
          onChange={(e) => {
            setFormValues({ ...formValues, title: e.target.value });
          }}
        />

        <input
          placeholder="Valor"
          type="number"
          value={formValues?.value}
          onChange={(e) => {
            setFormValues({ ...formValues, value: +e.target.value });
          }}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            isActive={type === "deposit"}
            activeColor="green"
            onClick={() => {
              setType("deposit");
            }}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            isActive={type === "withdraw"}
            activeColor="red"
            onClick={() => {
              setType("withdraw");
            }}
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={formValues?.category}
          onChange={(e) => {
            setFormValues({ ...formValues, category: e.target.value });
          }}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
