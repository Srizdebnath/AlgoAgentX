import requests
import json

tests = [
    ("Test 1: Read State", '{"prompt": "Check the wallet balance for the agent account."}'),
    ("Test 2: Write State (Guardian AppCall)", '{"prompt": "Send 5 ALGO (5000000 microalgos) to the vendor."}'),
    ("Test 3: Read Mainnet (Arbitrage Scan)", '{"prompt": "Run an arbitrage scan on Mainnet right now."}')
]

for name, payload in tests:
    print(f"\n--- {name} ---")
    try:
        resp = requests.post("http://127.0.0.1:8000/api/chat", json=json.loads(payload))
        print("Status:", resp.status_code)
        print("JSON Response:")
        print(json.dumps(resp.json(), indent=2))
    except Exception as e:
        print("Error:", e)
