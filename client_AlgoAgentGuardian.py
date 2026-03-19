# This file is auto-generated, do not modify
# flake8: noqa
# fmt: off
import typing

import algopy


class AlgoAgentGuardian(algopy.arc4.ARC4Client, typing.Protocol):
    @algopy.arc4.abimethod
    def setup_guardian(
        self,
        agent_address: algopy.arc4.Address,
        daily_limit: algopy.arc4.UIntN[typing.Literal[64]],
    ) -> None: ...

    @algopy.arc4.abimethod
    def execute_payment(
        self,
        amount: algopy.arc4.UIntN[typing.Literal[64]],
        receiver: algopy.arc4.Address,
    ) -> None: ...

    @algopy.arc4.abimethod
    def toggle_kill_switch(
        self,
    ) -> None: ...
