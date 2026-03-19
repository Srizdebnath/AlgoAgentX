# AlgoAgentX 🤖🛡️
**Autonomous AI Security & Execution Layer for Algorand**

AlgoAgentX is a sophisticated AI-powered autonomous agent designed for the Algorand ecosystem. It leverages **LLaMA 3.3-70b** (via Groq) and **LangGraph** to execute complex financial operations, monitor security via a "Guardian" smart contract, and provide a real-time terminal interface for decentralized portfolio management.

---

## 🏗️ Architecture Overview

The system is composed of four primary layers:
1.  **Smart Contract (Puya/Python)**: A secure "Guardian" contract that enforces daily spending limits and an emergency kill switch.
2.  **Agent Tools (Algorand SDK)**: A collection of Python tools executed by the LLM to interact with LocalNet and Mainnet.
3.  **Inference Backend (FastAPI)**: A ReAct-pattern agent server that processes natural language commands into blockchain actions.
4.  **Dashboard UI (Next.js 16)**: A high-performance, minimalist terminal used to command the agent and monitor the guardian's state.

---

## 🔒 The Guardian Protocol (`contract.py`)

A Puya-standard ARC-56 smart contract that protects user assets from unauthorized AI spending.
-   **Daily Limits**: Enforces a strict maximum ALGO spend per 24-hour window.
-   **Emergency Kill Switch**: The owner can instantly revoke all agent spending permissions.
-   **Autonomous Execution**: Authorized agents can trigger payments up to the limit without owner intervention.

---

## 🛠️ Agent Tools

The LLM has access to the following specialized tools in `agent_tools.py`:
-   **`get_wallet_balance(address: str)`**: Fetches real-time ALGO balances (LocalNet/Mainnet).
-   **`trigger_guardian_payment(amount_microalgos: int)`**: Safely signs a transaction via the Guardian smart contract.
-   **`execute_arbitrage_scan()`**: Connects to **Mainnet** to calculate live arbitrage spreads between USDC and USDT supply metrics.

---

## 🌐 API Reference (FastAPI)

The backend runs on `http://localhost:8000`.

### `POST /api/chat`
The main interface for natural language interaction with the agent.
-   **Request Body**:
    ```json
    { "prompt": "Check my balance and run an arbitrage scan." }
    ```
-   **Response**:
    -   `response`: The AI's textual reasoning and tool output summary.
    -   `tx_ids`: A list of successful transaction hashes detected in the agent's output.

---

## 🖥️ Frontend Dashboard (Next.js)

Located in `/web`, the dashboard provides a premium, "digital clone" aesthetic.
-   **Wallet Integration**: Connect via `@txnlab/use-wallet` (Pera, Defly, Lute, etc.).
-   **Guardian metrics**: Visualized "Limit vs Spent" tracking.
-   **Agent Terminal**: A faux-terminal with line numbering, pulsating carets, and clickable transaction links to **AlgoExplorer**.
-   **Geometric Grid Visuals**: High-performance CSS-based space-black design.

---

## 🚀 Quick Start

### 1. Backend Setup
```bash
# Install dependencies
venv/bin/pip install -r requirements.txt (or langchain-groq fastapi langchain)

# Run the server
venv/bin/uvicorn main:app --port 8000 --reload
```

### 2. Frontend Setup
```bash
cd web
npm install
npm run dev
```

### 3. Environment Config (`.env`)
-   `GROQ_API_KEY`: Required for LLaMA 3.3 inference.
-   `APP_ID`: ID of the deployed Guardian smart contract.
-   `AGENT_MNEMONIC`: Mnemonic of the agent account authorized to spend.

---

## 🛡️ Security
AlgoAgentX operates on a "human-in-the-loop" security model. While the AI can suggest and execute actions, it can **never** exceed the hard constraints programmed into the on-chain Guardian smart contract.
