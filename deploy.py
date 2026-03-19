from algokit_utils import AlgorandClient, AlgoAmount
from algosdk import mnemonic
from typed_client import AlgoAgentGuardianFactory

def main():
    # Connect to LocalNet natively
    client = AlgorandClient.default_localnet()

    # Create two test accounts
    owner = client.account.random()
    agent = client.account.random()

    print("Owner address:", owner.address)
    print("Agent address:", agent.address)

    dispenser = client.account.localnet_dispenser()
    
    # Fund Owner
    client.account.ensure_funded(
        owner,
        dispenser_account=dispenser,
        min_spending_balance=AlgoAmount.from_algo(100)
    )
    # Fund Agent
    client.account.ensure_funded(
        agent,
        dispenser_account=dispenser,
        min_spending_balance=AlgoAmount.from_algo(100)
    )

    # Factory for deploying
    factory = AlgoAgentGuardianFactory(
        algorand=client,
        default_sender=owner.address,
        default_signer=owner.signer
    )

    print("Deploying contract...")
    app_client, deploy_result = factory.deploy()
    print("Contract deployed at App ID:", app_client.app_id)
    print("Contract account address:", app_client.app_address)

    # Fund the contract (needed for inner transactions)
    print("Funding the contract...")
    client.account.ensure_funded(
        app_client.app_address,
        dispenser_account=dispenser,
        min_spending_balance=AlgoAmount.from_algo(10)
    )

    # Call setup_guardian
    daily_limit = 50_000_000 # 50 Algos
    print(f"Calling setup_guardian with Agent {agent.address} and daily limit {daily_limit}...")
    app_client.send.setup_guardian(
        args=(agent.address, daily_limit)
    )

    print("Contract successfully setup!")

    print("Writing Configuration to .env...")
    with open(".env", "a") as f:
        f.write(f"APP_ID={app_client.app_id}\n")
        f.write(f"OWNER_MNEMONIC=\"{mnemonic.from_private_key(owner.private_key)}\"\n")
        f.write(f"AGENT_MNEMONIC=\"{mnemonic.from_private_key(agent.private_key)}\"\n")
    print("Variables securely written to .env!")

if __name__ == "__main__":
    main()
