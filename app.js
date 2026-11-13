
"use strict";

const $ = (id) => document.getElementById(id);

const STARTING_BALANCE = 10000;
const STORAGE_KEY = "mt_exchange_demo_v1";

const markets = [
  { symbol: "BTC/USDT", name: "Bitcoin", price: 67500, change: 2.45 },
  { symbol: "ETH/USDT", name: "Ethereum", price: 3520, change: 1.82 },
  { symbol: "EUR/USD", name: "Euro / US Dollar", price: 1.085, change: -0.35 },
  { symbol: "XAU/USD", name: "Gold", price: 2680, change: 0.72 }
];

let state = loadState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (
      saved &&
      Number.isFinite(saved.balance) &&
      Array.isArray(saved.orders)
    ) {
      return saved;
    }
  } catch (error) {
    console.warn("Saved demo data could not be loaded.");
  }

  return {
    balance: STARTING_BALANCE,
    orders: []
  };
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    showMessage("Could not save demo data on this device.");
  }
}

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(value);
}

function getMarket(symbol) {
  return markets.find((market) => market.symbol === symbol);
}

function renderBalance() {
  const balance = $("wallet-balance");
  if (balance) balance.textContent = money(state.balance);
}

function renderMarkets() {
  const container = $("market-list");
  if (!container) return;

  container.replaceChildren();

  markets.forEach((market) => {
    const row = document.createElement("div");
    row.className = "market-row";

    const name = document.createElement("span");
    name.textContent = market.symbol;

    const details = document.createElement("span");
    details.textContent =
      money(market.price) + "  " +
      (market.change >= 0 ? "+" : "") +
      market.change.toFixed(2) + "%";

    details.style.color =
      market.change >= 0 ? "#20c987" : "#ff5b68";

    row.append(name, details);
    container.appendChild(row);
  });
}

function renderOrders() {
  const container = $("order-history");
  if (!container) return;

  container.replaceChildren();

  if (state.orders.length === 0) {
    container.textContent = "No demo orders yet.";
    return;
  }

  state.orders.slice().reverse().forEach((order) => {
    const row = document.createElement("div");
    row.className = "order-row";

    const info = document.createElement("span");
    info.textContent =
      order.side + " · " + order.symbol + " · " + order.quantity;

    const amount = document.createElement("span");
    amount.textContent = money(order.value);
    amount.style.color =
      order.side === "BUY" ? "#20c987" : "#ff5b68";

    row.append(info, amount);
    container.appendChild(row);
  });
}

function showMessage(message) {
  const element = $("trade-message");
  if (element) element.textContent = message;
}

function placeDemoOrder(side) {
  const symbol = $("trade-symbol")?.value;
  const quantity = Number($("trade-quantity")?.value);
  const market = getMarket(symbol);

  if (!market) {
    showMessage("Please select a valid market.");
    return;
  }

  if (!Number.isFinite(quantity) || quantity <= 0) {
    showMessage("Enter a valid quantity.");
    return;
  }

  const value = quantity * market.price;

  if (!Number.isFinite(value) || value <= 0) {
    showMessage("Invalid order value.");
    return;
  }

  if (side === "BUY" && value > state.balance) {
    showMessage("Insufficient demo wallet balance.");
    return;
  }

  if (side === "BUY") {
    state.balance -= value;
  } else {
    state.balance += value;
  }

  const order = {
    id: Date.now(),
    side,
    symbol,
    quantity,
    price: market.price,
    value,
    time: new Date().toISOString()
  };

  state.orders.push(order);
  state.orders = state.orders.slice(-100);

  saveState();
  renderBalance();
  renderOrders();

  showMessage(
    side + " demo order recorded: " +
    quantity + " " + symbol +
    " at " + money(market.price)
  );

  $("trade-quantity").value = "";
}

function setupChart() {
  const selector = $("chart-symbol");
  const container = $("trading-chart");

  if (!selector || !container) return;

  function loadChart() {
    container.replaceChildren();

    const frame = document.createElement("iframe");
    frame.title = "TradingView market chart";
    frame.width = "100%";
    frame.height = "360";
    frame.style.border = "0";
    frame.loading = "lazy";

    const symbol = selector.value;
    const url = new URL(
      "https://s.tradingview.com/widgetembed/"
    );

    url.searchParams.set("symbol", symbol);
    url.searchParams.set("interval", "60");
    url.searchParams.set("hidesidetoolbar", "1");
    url.searchParams.set("symboledit", "1");
    url.searchParams.set("saveimage", "0");
    url.searchParams.set("toolbarbg", "080b12");
    url.searchParams.set("theme", "dark");
    url.searchParams.set("style", "1");
    url.searchParams.set("locale", "en");

    frame.src = url.toString();
    container.appendChild(frame);
  }

  selector.addEventListener("change", loadChart);
  loadChart();
}

function init() {
  renderBalance();
  renderMarkets();
  renderOrders();
  setupChart();

  $("buy-button")?.addEventListener("click", () => {
    placeDemoOrder("BUY");
  });

  $("sell-button")?.addEventListener("click", () => {
    placeDemoOrder("SELL");
  });
}

document.addEventListener("DOMContentLoaded", init); 