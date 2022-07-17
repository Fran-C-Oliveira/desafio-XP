DROP SCHEMA IF EXISTS xpStocks;
CREATE SCHEMA IF NOT EXISTS xpStocks;

CREATE TABLE xpStocks.clients (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  client_name VARCHAR(30) NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE xpStocks.accounts(
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  client_id INTEGER NOT NULL,
  amount_deposited DECIMAL(10,2) NOT NULL,
  amount_invested DECIMAL(10,2) NOT NULL,
  amount_withdrawn DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (client_id)
    REFERENCES xpStocks.clients (id)
    ON DELETE CASCADE
);

CREATE TABLE xpStocks.stocks(
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  ticket VARCHAR(30) NOT NULL,
  sector VARCHAR(50) NOT NULL,
  available_qty INTEGER NOT NULL,
  unit_price DECIMAL(5,2) NOT NULL
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

CREATE TABLE xpStocks.sell_history(
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
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
    ON DELETE CASCADE,
  FOREIGN KEY (unit_price)
    REFERENCES xpStocks.stocks (unit_price)
    ON DELETE CASCADE
);

CREATE TABLE xpStocks.buy_history(
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
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
    ON DELETE CASCADE,
  FOREIGN KEY (unit_price)
    REFERENCES xpStocks.stocks (unit_price)
    ON DELETE CASCADE
);

CREATE TABLE xpStocks.deposit_history(
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  account_id INTEGER NOT NULL,
  amount_deposited DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (account_id)
    REFERENCES xpStocks.accounts (id)
    ON DELETE CASCADE,
  FOREIGN KEY (amount_deposited)
    REFERENCES xpStocks.accounts (amount_deposited)
    ON DELETE CASCADE
);

CREATE TABLE xpStocks.withdrawn_history(
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  account_id INTEGER NOT NULL,
  amount_withdrawn DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (account_id)
    REFERENCES xpStocks.accounts (id)
    ON DELETE CASCADE,
  FOREIGN KEY (amount_withdrawn)
    REFERENCES xpStocks.accounts (amount_withdrawn)
    ON DELETE CASCADE
);

INSERT INTO
  xpStocks.clients (client_name, password)
VALUES
  ("client01", "client01Pass"),
  ("client02", "client02Pass"),
  ("client03", "client03Pass");

INSERT INTO
  xpStocks.accounts (client_id, amount_deposited, amount_invested)
VALUES
  (1, 1000, 0),
  (2, 200, 970.9),
  (3, 0, 0);


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
