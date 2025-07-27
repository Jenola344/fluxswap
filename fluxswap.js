import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  ArrowUpDown, 
  Plus, 
  Minus, 
  TrendingUp, 
  Settings, 
  Users, 
  Vote, 
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  BarChart3,
  Shield,
  Globe,
  Copy,
  ExternalLink
} from 'lucide-react';

const FluxSwapTestnet = () => {
  const [activeTab, setActiveTab] = useState('swap');
  const [isConnected, setIsConnected] = useState(false);
  const [walletBalance, setWalletBalance] = useState({
    ETH: '5.0000',
    USDC: '10000.00',
    FLUX: '1000.00',
    DAI: '5000.00'
  });
  const [swapFrom, setSwapFrom] = useState({ token: 'ETH', amount: '' });
  const [swapTo, setSwapTo] = useState({ token: 'USDC', amount: '' });
  const [liquidityRange, setLiquidityRange] = useState({ min: 1800, max: 2200 });
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const connectWallet = () => {
    setIsConnected(true);
    addNotification('🎉 Connected to Sepolia Testnet!', 'success');
  };

  const executeSwap = () => {
    if (!swapFrom.amount) return;
    addNotification('⏳ Executing swap on testnet...', 'info');
    setTimeout(() => {
      addNotification('✅ Swap completed! Gas used: $0.50', 'success');
      const newBalance = {...walletBalance};
      if (swapFrom.token === 'ETH') {
        newBalance.ETH = (parseFloat(newBalance.ETH) - parseFloat(swapFrom.amount)).toFixed(4);
        newBalance.USDC = (parseFloat(newBalance.USDC) + parseFloat(swapFrom.amount) * 2000).toFixed(2);
      }
      setWalletBalance(newBalance);
      setSwapFrom({ ...swapFrom, amount: '' });
      setSwapTo({ ...swapTo, amount: '' });
    }, 2000);
  };

  const addLiquidity = () => {
    addNotification('⏳ Adding liquidity to ETH/USDC pool...', 'info');
    setTimeout(() => {
      addNotification('✅ Liquidity added! You\'ll earn 0.25% fees', 'success');
    }, 2000);
  };

  useEffect(() => {
    if (swapFrom.amount && swapFrom.token === 'ETH') {
      setSwapTo({ ...swapTo, amount: (parseFloat(swapFrom.amount) * 2000).toFixed(2) });
    }
  }, [swapFrom.amount]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div key={notification.id} className={`p-4 rounded-lg backdrop-blur-md shadow-lg transition-all duration-300 ${
            notification.type === 'success' ? 'bg-green-500/20 border border-green-400/30' :
            notification.type === 'error' ? 'bg-red-500/20 border border-red-400/30' :
            'bg-blue-500/20 border border-blue-400/30'
          }`}>
            {notification.message}
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="p-6 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">FluxSwap</h1>
              <p className="text-sm text-purple-300">Testnet Demo</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="px-3 py-1 bg-orange-500/20 rounded-full text-orange-300 text-sm">
              Sepolia Testnet
            </div>
            {!isConnected ? (
              <button 
                onClick={connectWallet}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-medium hover:scale-105 transition-transform"
              >
                <Wallet className="w-4 h-4 inline mr-2" />
                Connect Testnet Wallet
              </button>
            ) : (
              <div className="px-4 py-2 bg-white/10 rounded-lg">
                <div className="text-sm text-gray-300">0x742d...4B3f</div>
                <div className="text-xs text-green-400">Connected</div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {!isConnected ? (
          <div className="text-center py-20">
            <Wallet className="w-16 h-16 mx-auto mb-6 text-purple-400" />
            <h2 className="text-3xl font-bold mb-4">Welcome to FluxSwap Testnet</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience the future of DeFi trading with our revolutionary AMM. Connect your testnet wallet to try all features with fake tokens and no real money at risk.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <ArrowUpDown className="w-8 h-8 text-blue-400 mb-3" />
                <h3 className="font-semibold mb-2">Advanced Swapping</h3>
                <p className="text-sm text-gray-300">Multi-hop routing with MEV protection</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <TrendingUp className="w-8 h-8 text-green-400 mb-3" />
                <h3 className="font-semibold mb-2">Concentrated Liquidity</h3>
                <p className="text-sm text-gray-300">Earn more fees with targeted ranges</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <Shield className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="font-semibold mb-2">Impermanent Loss Protection</h3>
                <p className="text-sm text-gray-300">Built-in insurance for liquidity providers</p>
              </div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-4 max-w-2xl mx-auto">
              <AlertTriangle className="w-5 h-5 text-yellow-400 inline mr-2" />
              <strong>Testnet Only:</strong> All transactions use fake tokens. Get testnet ETH from faucets to start testing.
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-white/5 p-1 rounded-xl w-fit">
              {[
                { id: 'swap', label: 'Swap', icon: ArrowUpDown },
                { id: 'liquidity', label: 'Liquidity', icon: Plus },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                { id: 'social', label: 'Social', icon: Users },
                { id: 'governance', label: 'Governance', icon: Vote }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${
                    activeTab === tab.id 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Wallet Balance */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(walletBalance).map(([token, balance]) => (
                <div key={token} className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <div className="text-sm text-gray-300">{token}</div>
                  <div className="text-xl font-bold">{balance}</div>
                  <div className="text-xs text-gray-400">~$2,000</div>
                </div>
              ))}
            </div>

            {/* Content based on active tab */}
            {activeTab === 'swap' && (
              <div className="max-w-md mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-6 text-center">Swap Tokens</h3>
                  
                  {/* From Token */}
                  <div className="bg-white/5 rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-300">From</span>
                      <span className="text-xs text-gray-400">Balance: {walletBalance[swapFrom.token]}</span>
                    </div>
                    <div className="flex space-x-3">
                      <select 
                        value={swapFrom.token}
                        onChange={(e) => setSwapFrom({...swapFrom, token: e.target.value})}
                        className="bg-white/10 rounded-lg px-3 py-2 border border-white/20"
                      >
                        <option value="ETH">ETH</option>
                        <option value="USDC">USDC</option>
                        <option value="DAI">DAI</option>
                      </select>
                      <input
                        type="number"
                        placeholder="0.0"
                        value={swapFrom.amount}
                        onChange={(e) => setSwapFrom({...swapFrom, amount: e.target.value})}
                        className="flex-1 bg-transparent text-right text-xl font-medium outline-none"
                      />
                    </div>
                  </div>

                  {/* Swap Button */}
                  <div className="flex justify-center my-4">
                    <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                      <ArrowUpDown className="w-5 h-5" />
                    </button>
                  </div>

                  {/* To Token */}
                  <div className="bg-white/5 rounded-xl p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-300">To</span>
                      <span className="text-xs text-gray-400">Balance: {walletBalance[swapTo.token]}</span>
                    </div>
                    <div className="flex space-x-3">
                      <select 
                        value={swapTo.token}
                        onChange={(e) => setSwapTo({...swapTo, token: e.target.value})}
                        className="bg-white/10 rounded-lg px-3 py-2 border border-white/20"
                      >
                        <option value="USDC">USDC</option>
                        <option value="ETH">ETH</option>
                        <option value="DAI">DAI</option>
                      </select>
                      <input
                        type="number"
                        placeholder="0.0"
                        value={swapTo.amount}
                        readOnly
                        className="flex-1 bg-transparent text-right text-xl font-medium outline-none text-gray-300"
                      />
                    </div>
                  </div>

                  {/* Swap Details */}
                  {swapFrom.amount && (
                    <div className="bg-blue-500/10 rounded-lg p-3 mb-4 text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Price Impact:</span>
                        <span className="text-green-400">0.12%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Trading Fee:</span>
                        <span>0.25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Network Fee:</span>
                        <span>~$0.50</span>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={executeSwap}
                    disabled={!swapFrom.amount}
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl font-medium hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {swapFrom.amount ? 'Swap Tokens' : 'Enter Amount'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'liquidity' && (
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-6">Add Liquidity</h3>
                  
                  {/* Pool Selection */}
                  <div className="bg-white/5 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-medium">ETH/USDC Pool</span>
                      <span className="text-green-400">0.25% Fee Tier</span>
                    </div>
                    <div className="text-sm text-gray-300">
                      Current Price: $2,000 per ETH
                    </div>
                  </div>

                  {/* Price Range Selector */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Select Price Range</h4>
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-center">
                          <div className="text-sm text-gray-300">Min Price</div>
                          <input
                            type="number"
                            value={liquidityRange.min}
                            onChange={(e) => setLiquidityRange({...liquidityRange, min: parseInt(e.target.value)})}
                            className="bg-white/10 rounded-lg px-3 py-2 text-center mt-1"
                          />
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-300">Max Price</div>
                          <input
                            type="number"
                            value={liquidityRange.max}
                            onChange={(e) => setLiquidityRange({...liquidityRange, max: parseInt(e.target.value)})}
                            className="bg-white/10 rounded-lg px-3 py-2 text-center mt-1"
                          />
                        </div>
                      </div>
                      
                      {/* Visual Range Indicator */}
                      <div className="relative h-8 bg-gray-700 rounded-lg overflow-hidden">
                        <div 
                          className="absolute h-full bg-gradient-to-r from-purple-500 to-blue-500"
                          style={{
                            left: `${((liquidityRange.min - 1500) / 1000) * 100}%`,
                            width: `${((liquidityRange.max - liquidityRange.min) / 1000) * 100}%`
                          }}
                        />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-6 bg-yellow-400 rounded" />
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>$1,500</span>
                        <span>Current: $2,000</span>
                        <span>$2,500</span>
                      </div>
                    </div>
                  </div>

                  {/* Deposit Amounts */}
                  <div className="space-y-4 mb-6">
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span>ETH Amount</span>
                        <span className="text-xs text-gray-400">Balance: 5.0000</span>
                      </div>
                      <input
                        type="number"
                        placeholder="0.0"
                        className="w-full bg-transparent text-xl font-medium outline-none"
                      />
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span>USDC Amount</span>
                        <span className="text-xs text-gray-400">Balance: 10,000.00</span>
                      </div>
                      <input
                        type="number"
                        placeholder="0.0"
                        className="w-full bg-transparent text-xl font-medium outline-none"
                      />
                    </div>
                  </div>

                  <button
                    onClick={addLiquidity}
                    className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl font-medium hover:scale-105 transition-transform"
                  >
                    Add Liquidity
                  </button>
                </div>

                {/* Existing Positions */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">Your Positions</h3>
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">ETH/USDC 0.25%</span>
                      <span className="text-green-400">In Range</span>
                    </div>
                    <div className="text-sm text-gray-300 space-y-1">
                      <div>Range: $1,800 - $2,200</div>
                      <div>Liquidity: $5,000</div>
                      <div>Fees Earned: $12.50</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">Portfolio Overview</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Value:</span>
                      <span className="font-bold text-green-400">$22,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>24h Change:</span>
                      <span className="text-green-400">+$234 (+1.08%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fees Earned (7d):</span>
                      <span className="text-blue-400">$45.67</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Impermanent Loss:</span>
                      <span className="text-yellow-400">-$23.45 (-0.11%)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">Top Pools</h3>
                  <div className="space-y-3">
                    {[
                      { pair: 'ETH/USDC', apr: '12.5%', tvl: '$2.1M' },
                      { pair: 'DAI/USDC', apr: '8.2%', tvl: '$890K' },
                      { pair: 'ETH/DAI', apr: '15.3%', tvl: '$1.5M' }
                    ].map(pool => (
                      <div key={pool.pair} className="bg-white/5 rounded-lg p-3 flex justify-between items-center">
                        <span className="font-medium">{pool.pair}</span>
                        <div className="text-right">
                          <div className="text-green-400">{pool.apr} APR</div>
                          <div className="text-xs text-gray-400">{pool.tvl} TVL</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">Trading History</h3>
                  <div className="space-y-3">
                    {[
                      { type: 'Swap', from: '1.0 ETH', to: '2,000 USDC', time: '2 min ago', status: 'confirmed' },
                      { type: 'Add Liquidity', from: '0.5 ETH + 1,000 USDC', to: 'LP Tokens', time: '1 hour ago', status: 'confirmed' },
                      { type: 'Swap', from: '500 DAI', to: '0.25 ETH', time: '3 hours ago', status: 'confirmed' }
                    ].map((tx, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-3 flex justify-between items-center">
                        <div>
                          <div className="font-medium">{tx.type}</div>
                          <div className="text-sm text-gray-300">{tx.from} → {tx.to}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-400">{tx.time}</div>
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            <span className="text-xs text-green-400">{tx.status}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">Top Traders</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'CryptoWhale', profit: '+$12,450', trades: 156, followers: 2340 },
                      { name: 'DeFiMaster', profit: '+$8,920', trades: 89, followers: 1890 },
                      { name: 'YieldFarmer', profit: '+$6,780', trades: 234, followers: 1456 }
                    ].map((trader, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-3 flex justify-between items-center">
                        <div>
                          <div className="font-medium">{trader.name}</div>
                          <div className="text-sm text-gray-300">{trader.trades} trades • {trader.followers} followers</div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-medium">{trader.profit}</div>
                          <button className="text-xs bg-blue-500/20 px-2 py-1 rounded mt-1">
                            Follow
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">Copy Trading</h3>
                  <div className="bg-white/5 rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Following: CryptoWhale</span>
                      <span className="text-green-400">Active</span>
                    </div>
                    <div className="text-sm text-gray-300 space-y-1">
                      <div>Allocation: $1,000 (5% of portfolio)</div>
                      <div>P&L: +$67.50 (+6.75%)</div>
                      <div>Copy Ratio: 100%</div>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                    Manage Copy Settings
                  </button>
                </div>

                <div className="md:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">Community Feed</h3>
                  <div className="space-y-4">
                    {[
                      { user: 'DeFiMaster', action: 'swapped 2 ETH for 4,000 USDC', time: '5 min ago', likes: 12 },
                      { user: 'YieldFarmer', action: 'added liquidity to ETH/DAI pool', time: '15 min ago', likes: 8 },
                      { user: 'CryptoWhale', action: 'opened large position in new FLUX/ETH pool', time: '1 hour ago', likes: 34 }
                    ].map((activity, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="font-medium text-blue-400">{activity.user}</span>
                            <span className="text-gray-300 ml-2">{activity.action}</span>
                          </div>
                          <span className="text-xs text-gray-400">{activity.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <button className="flex items-center space-x-1 hover:text-red-400">
                            <span>❤️</span>
                            <span>{activity.likes}</span>
                          </button>
                          <button className="hover:text-blue-400">
                            <Copy className="w-3 h-3 inline mr-1" />
                            Copy Trade
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'governance' && (
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">Your Voting Power</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-purple-400">1,000</div>
                      <div className="text-sm text-gray-300">FLUX Tokens</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-blue-400">850</div>
                      <div className="text-sm text-gray-300">Voting Power</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-green-400">5</div>
                      <div className="text-sm text-gray-300">Proposals Voted</div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <h3 className="text-xl font-bold mb-4">Active Proposals</h3>
                    <div className="space-y-4">
                      {[
                        { 
                          id: 'FIP-001', 
                          title: 'Reduce trading fees to 0.20%', 
                          status: 'Active', 
                          votes: { for: 67, against: 23 },
                          timeLeft: '2 days'
                        },
                        { 
                          id: 'FIP-002', 
                          title: 'Add new MATIC/ETH pool', 
                          status: 'Active', 
                          votes: { for: 89, against: 11 },
                          timeLeft: '5 days'
                        }
                      ].map((proposal, index) => (
                        <div key={index} className="bg-white/5 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="font-medium">{proposal.id}: {proposal.title}</div>
                              <div className="text-sm text-gray-400">Ends in {proposal.timeLeft}</div>
                            </div>
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                              {proposal.status}
                            </span>
                          </div>
                          <div className="space-y-2 mb-3">
                            <div className="flex justify-between text-sm">
                              <span>For ({proposal.votes.for}%)</span>
                              <span>Against ({proposal.votes.against}%)</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                                style={{ width: `${proposal.votes.for}%` }}
                              />
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="flex-1 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30">
                              Vote For
                            </button>
                            <button className="flex-1 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30">
                              Vote Against
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <h3 className="text-xl font-bold mb-4">Treasury Overview</h3>
                    <div className="space-y-4">
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span>Total Treasury Value</span>
                          <span className="font-bold text-green-400">$2.5M</span>
                        </div>
                        <div className="text-sm text-gray-300 space-y-1">
                          <div className="flex justify-between">
                            <span>FLUX Tokens:</span>
                            <span>500,000 ($1.2M)</span>
                          </div>
                          <div className="flex justify-between">
                            <span>ETH:</span>
                            <span>300 ($600K)</span>
                          </div>
                          <div className="flex justify-between">
                            <span>USDC:</span>
                            <span>700,000 ($700K)</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Recent Treasury Actions</h4>
                        <div className="text-sm text-gray-300 space-y-1">
                          <div>• Allocated $100K for bug bounties</div>
                          <div>• Purchased 50 ETH for liquidity</div>
                          <div>• Distributed $50K to developers</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">Create New Proposal</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Proposal Title"
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-purple-400"
                    />
                    <textarea
                      placeholder="Detailed description of your proposal..."
                      rows={4}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-purple-400 resize-none"
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Voting Duration</label>
                        <select className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3">
                          <option value="3">3 Days</option>
                          <option value="7">7 Days</option>
                          <option value="14">14 Days</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Minimum Voting Power</label>
                        <input
                          type="number"
                          placeholder="1000"
                          className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-purple-400"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => addNotification('📝 Proposal submitted for review!', 'success')}
                      className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-medium hover:scale-105 transition-transform"
                    >
                      Submit Proposal (Costs 100 FLUX)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Feature Highlights */}
      {isConnected && (
        <div className="max-w-7xl mx-auto p-6 mt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Testnet Features You Can Try</h2>
            <p className="text-gray-300">All features are fully functional with testnet tokens</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
              <ArrowUpDown className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Dynamic Fee Swaps</h3>
              <p className="text-sm text-gray-300">Experience 0.05-0.30% fees based on market volatility</p>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Concentrated Liquidity</h3>
              <p className="text-sm text-gray-300">Set custom price ranges for maximum capital efficiency</p>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
              <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Social Trading</h3>
              <p className="text-sm text-gray-300">Follow top traders and copy their strategies</p>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
              <Vote className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">DAO Governance</h3>
              <p className="text-sm text-gray-300">Vote on proposals and shape the protocol's future</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 mt-12 p-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Documentation
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              GitHub
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Discord
            </a>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
            <AlertTriangle className="w-4 h-4" />
            <span>This is a testnet demo. No real money is involved.</span>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            FluxSwap Testnet Demo • Built for educational purposes
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FluxSwapTestnet;