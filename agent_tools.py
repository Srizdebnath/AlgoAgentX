import os
from dotenv import load_dotenv
from langchain.tools import tool
from algokit_utils import AlgorandClient
from algosdk import mnemonic
from typed_client import AlgoAgentGuardianClient

load_dotenv()

@tool
def get_wallet_balance(address: str) -> str:
    """Fetches real ALGO balance for a given Algorand account address on LocalNet."""
    print(f"DEBUG: get_wallet_balance called for {address}")
    try:
        client = AlgorandClient.default_localnet()
        account_info = client.account.get_information(address)
        balance = account_info.amount.micro_algo / 1_000_000
        print(f"DEBUG: Balance found: {balance} ALGO")
        return f"Address {address} has a balance of {balance} ALGOs."
    except Exception as e:
        return f"Error fetching balance: {str(e)}"

@tool
def trigger_guardian_payment(amount_microalgos: int) -> str:
    """
    Triggers an execute_payment transaction on the AlgoAgentGuardian smart contract.
    Provide the amount in microAlgos. The receiver address is handled automatically by the tool.
    """
    print(f"DEBUG: trigger_guardian_payment called for {amount_microalgos} microAlgos")
    try:
        app_id = int(os.environ.get("APP_ID", 0))
        agent_mnemonic = os.environ.get("AGENT_MNEMONIC")
        if not app_id or not agent_mnemonic:
            return "Configuration error: APP_ID or AGENT_MNEMONIC missing in .env"
        
        client = AlgorandClient.default_localnet()
        agent_acc = client.account.from_mnemonic(mnemonic=agent_mnemonic)
        
        app_client = AlgoAgentGuardianClient(
            algorand=client,
            app_id=app_id,
            default_sender=agent_acc.address,
            default_signer=agent_acc.signer
        )
        
        # Generate a dummy receiver
        dummy_receiver = client.account.random().address
        
        result = app_client.send.execute_payment(
            args=(amount_microalgos, dummy_receiver)
        )
        
        return f"Payment of {amount_microalgos} microAlgos successfully executed to {dummy_receiver}! TX: {result.tx_id}"
    except Exception as e:
        return f"Algorand logic error or transaction failure: {str(e)}"

@tool
def execute_arbitrage_scan() -> str:
    """
    Connects to Algorand Mainnet to fetch real-time data for two assets to calculate an arbitrage spread.
    """
    try:
        # Connect to Algorand Mainnet
        client = AlgorandClient.mainnet()
        
        # USDC (31566704) and USDT (312769)
        usdc_info = client.client.algod.asset_info(31566704)
        usdt_info = client.client.algod.asset_info(312769)
        
        usdc_supply = usdc_info.get('params', {}).get('total', 1)
        usdt_supply = usdt_info.get('params', {}).get('total', 1)
        
        # Calculate a mock 'spread' using real mainnet data (supply ratio acting as a proxy)
        spread = (usdc_supply / usdt_supply) * 100
        
        return f"Arbitrage Scan Complete on Mainnet: Derived proxy spread between USDC and USDT is {spread:.4f}% based on live supply metrics."
    except Exception as e:
        return f"Error executing arbitrage scan on mainnet: {str(e)}"
