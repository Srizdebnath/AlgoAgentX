from algokit_utils import AlgorandClient
import inspect
client = AlgorandClient.default_local_net()
print(dir(client.app))
print(client.account.random().address)
