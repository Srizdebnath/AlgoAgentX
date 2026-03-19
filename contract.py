from algopy import ARC4Contract, UInt64, Account, Global, itxn, Txn
from algopy.arc4 import abimethod

class AlgoAgentGuardian(ARC4Contract):
    def __init__(self) -> None:
        self.owner = Txn.sender
        self.agent_address = Txn.sender
        self.daily_limit = UInt64(0)
        self.spent_today = UInt64(0)
        self.last_spend_timestamp = UInt64(0)
        self.is_active = True

    @abimethod
    def setup_guardian(self, agent_address: Account, daily_limit: UInt64) -> None:
        assert Txn.sender == self.owner, "Only owner can setup"
        self.agent_address = agent_address
        self.daily_limit = daily_limit

    @abimethod
    def execute_payment(self, amount: UInt64, receiver: Account) -> None:
        assert self.is_active, "Contract is not active"
        assert Txn.sender == self.agent_address, "Only agent can execute payments"

        time_since_last_spend = Global.latest_timestamp - self.last_spend_timestamp
        if time_since_last_spend > 86400:
            self.spent_today = UInt64(0)

        assert self.spent_today + amount <= self.daily_limit, "Daily limit exceeded"

        itxn.Payment(
            receiver=receiver,
            amount=amount
        ).submit()

        self.spent_today += amount
        self.last_spend_timestamp = Global.latest_timestamp

    @abimethod
    def toggle_kill_switch(self) -> None:
        assert Txn.sender == self.owner, "Only owner can toggle"
        self.is_active = not self.is_active
