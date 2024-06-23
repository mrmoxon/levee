# Coin Change problem: 

# Given an array of coin denominations and a target amount, find the minimum number coins needed to make up taht amount.
# If the amount can't be made up by any combination of the coins, return -1.

# 1. Provide python code for the solution.
# 2. Explain how the DP approach works for this problem.
# 3. Example.

import matplotlib.pyplot as plt

def coin_change(coins, amount):
    # Initialise dp array with amount + 1 (greater than max possible value)
    dp = [amount + 1] * (amount + 1) # dp[i] = minimum number of coins needed to make up amount i
    dp[0] = 0 # Set base case: 0 coins needed when amount is zero

    for i in range(1, amount + 1): # Iterate through all amounts from 1 to amount
        for coin in coins: # Iterate through all coins
            if coin <= i: # If coin value is less than or equal to amount
                dp[i] = min(dp[i], dp[i - coin] + 1) # Update dp[i] with minimum of current value and dp[i - coin] + 1

    return dp[amount] if dp[amount] != amount + 1 else -1 # Return dp[amount] if it is less than amount + 1, else return -1

coins = [10, 13, 27, 250, 300]
# amount = 34

def visualize_coin_change(coins, max_amount=500):
    results = []
    for amount in range(1, max_amount + 1):
        result = coin_change(coins, amount)
        results.append(result)
    
    plt.figure(figsize=(15, 6))
    plt.bar(range(1, max_amount + 1), results)
    plt.xlabel('Amount')
    plt.ylabel('Minimum number of coins')
    plt.title(f'Minimum Coins Needed for Amounts 1-{max_amount}')
    plt.xticks(range(0, max_amount + 1, 5))
    plt.yticks(range(0, max(results) + 1))
    plt.grid(axis='y', linestyle='--', alpha=0.7)
    plt.show()


# result = coin_change(coins, amount)
visualize_coin_change(coins)

print(f"Minimum number of coi  /ns needed to make up amount {amount} is {result}")