DROP SCHEMA IF EXISTS xpStocks;
CREATE SCHEMA IF NOT EXISTS xpStocks;

CREATE TABLE xpStocks.clients (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  client_name VARCHAR(30) NOT NULL,
  account_balance DECIMAL(10,2) NOT NULL,
  amount_invested DECIMAL(10,2) NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE xpStocks.stocks(
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  ticket VARCHAR(30) NOT NULL,
  sector VARCHAR(50) NOT NULL,
  available_qty INTEGER NOT NULL,
  unit_price DECIMAL(5,2) NOT NULL
);

CREATE TABLE xpStocks.transactions(
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  transaction_type VARCHAR(30) NOT NULL,
  client_id INTEGER NOT NULL,
  ticket_id INTEGER NOT NULL,
  qty INTEGER NOT NULL,
  unit_price DECIMAL(5,2) NOT NULL,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id)
    REFERENCES xpStocks.clients (id)
    ON DELETE CASCADE,
  FOREIGN KEY (ticket_id)
    REFERENCES xpStocks.stocks (id)
    ON DELETE CASCADE
);

CREATE TABLE xpStocks.asset_client(
  client_id INTEGER NOT NULL,
  ticket_id INTEGER NOT NULL,
  qty INTEGER NOT NULL,
  FOREIGN KEY (client_id)
    REFERENCES xpStocks.clients (id)
    ON DELETE CASCADE,
  FOREIGN KEY (ticket_id)
    REFERENCES xpStocks.stocks (id)
    ON DELETE CASCADE
);

CREATE TABLE xpStocks.balance_history(
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  balance_type VARCHAR(30) NOT NULL,
  client_id INTEGER NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id)
    REFERENCES xpStocks.clients (id)
    ON DELETE CASCADE
);

INSERT INTO
  xpStocks.clients (client_name, account_balance, amount_invested, password)
VALUES
  ("client01", 1000, 0, "client01Pass"),
  ("client02", 200, 970.9, "client02Pass"),
  ("client03", 0, 0, "client03Pass");

INSERT INTO
  xpStocks.stocks (ticket, sector, available_qty, unit_price)
VALUES
  ("VALE3", "Materiais Básicos", 100, 68.37),
  ("PETR4", "Petróleo, Gás e Biocombustíveis", 100, 27.96),
  ("XPBR31", "Financeiro", 100, 94.31),
  ("MGLU3", "Consumo Cíclico" ,100, 2.78),
  ("RAIL3", "Bens Industriais", 100, 15.34),
  ("CMIG4", "Utilidade Pública", 100, 10.45);

INSERT INTO
  xpStocks.asset_client (client_id, ticket_id, qty)
VALUES
  (2, 3, 10),
  (2, 4, 10);
