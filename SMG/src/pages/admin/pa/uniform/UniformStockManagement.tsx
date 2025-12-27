import { useState } from 'react';
import { ShirtIcon, Search, Plus, Edit, TrendingUp, TrendingDown, AlertTriangle, X, Trash2 } from 'lucide-react';

interface StockItem {
  id: number;
  itemName: string;
  category: string;
  size: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  lastUpdated: string;
}

export const UniformStockManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [stock, setStock] = useState<StockItem[]>([
    {
      id: 1,
      itemName: 'Work Shirt',
      category: 'Apparel',
      size: 'S',
      currentStock: 45,
      minStock: 20,
      maxStock: 100,
      lastUpdated: '2024-12-26'
    },
    {
      id: 2,
      itemName: 'Work Shirt',
      category: 'Apparel',
      size: 'M',
      currentStock: 78,
      minStock: 30,
      maxStock: 150,
      lastUpdated: '2024-12-26'
    },
    {
      id: 3,
      itemName: 'Work Shirt',
      category: 'Apparel',
      size: 'L',
      currentStock: 12,
      minStock: 25,
      maxStock: 120,
      lastUpdated: '2024-12-25'
    },
    {
      id: 4,
      itemName: 'Work Pants',
      category: 'Apparel',
      size: '32',
      currentStock: 34,
      minStock: 20,
      maxStock: 100,
      lastUpdated: '2024-12-26'
    },
    {
      id: 5,
      itemName: 'Work Pants',
      category: 'Apparel',
      size: '34',
      currentStock: 8,
      minStock: 25,
      maxStock: 100,
      lastUpdated: '2024-12-24'
    },
    {
      id: 6,
      itemName: 'Safety Shoes',
      category: 'Footwear',
      size: '9',
      currentStock: 15,
      minStock: 15,
      maxStock: 80,
      lastUpdated: '2024-12-26'
    },
    {
      id: 7,
      itemName: 'Safety Gloves',
      category: 'Safety Gear',
      size: 'Free Size',
      currentStock: 92,
      minStock: 50,
      maxStock: 200,
      lastUpdated: '2024-12-26'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    size: '',
    currentStock: 0,
    minStock: 0,
    maxStock: 0
  });

  const filteredStock = stock.filter(item =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockItems = filteredStock.filter(item => item.currentStock <= item.minStock);
  const totalItems = filteredStock.reduce((sum, item) => sum + item.currentStock, 0);

  const getStockStatus = (item: StockItem) => {
    if (item.currentStock <= item.minStock) return 'low';
    if (item.currentStock >= item.maxStock * 0.8) return 'high';
    return 'normal';
  };

  const handleAddStock = () => {
    setFormData({
      itemName: '',
      category: '',
      size: '',
      currentStock: 0,
      minStock: 0,
      maxStock: 0
    });
    setShowAddModal(true);
  };

  const handleEditStock = (item: StockItem) => {
    setSelectedItem(item);
    setFormData({
      itemName: item.itemName,
      category: item.category,
      size: item.size,
      currentStock: item.currentStock,
      minStock: item.minStock,
      maxStock: item.maxStock
    });
    setShowEditModal(true);
  };

  const handleSaveNewStock = () => {
    const newItem: StockItem = {
      id: stock.length + 1,
      itemName: formData.itemName,
      category: formData.category,
      size: formData.size,
      currentStock: formData.currentStock,
      minStock: formData.minStock,
      maxStock: formData.maxStock,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setStock([...stock, newItem]);
    setShowAddModal(false);
  };

  const handleUpdateStock = () => {
    if (selectedItem) {
      setStock(stock.map(item =>
        item.id === selectedItem.id
          ? {
              ...item,
              itemName: formData.itemName,
              category: formData.category,
              size: formData.size,
              currentStock: formData.currentStock,
              minStock: formData.minStock,
              maxStock: formData.maxStock,
              lastUpdated: new Date().toISOString().split('T')[0]
            }
          : item
      ));
      setShowEditModal(false);
      setSelectedItem(null);
    }
  };

  const handleDeleteStock = (id: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setStock(stock.filter(item => item.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1B254B] flex items-center gap-3">
          <ShirtIcon className="text-pink-500" size={36} />
          Uniform Stock Management
        </h1>
        <p className="text-gray-500 mt-1">Manage inventory levels for all uniform items</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <ShirtIcon className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{totalItems}</p>
              <p className="text-sm text-gray-500">Total Stock</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="text-red-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{lowStockItems.length}</p>
              <p className="text-sm text-gray-500">Low Stock Items</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">7</p>
              <p className="text-sm text-gray-500">Item Categories</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <ShirtIcon className="text-orange-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">145</p>
              <p className="text-sm text-gray-500">Issued This Month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by item name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
            />
          </div>
          <button 
            onClick={handleAddStock}
            className="px-6 py-3 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-semibold"
          >
            <Plus size={20} />
            Add Stock
          </button>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-red-500" size={24} />
            <h3 className="text-lg font-bold text-red-700">Low Stock Alert</h3>
          </div>
          <div className="space-y-2">
            {lowStockItems.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-xl border border-red-200">
                <div>
                  <p className="font-bold text-[#1B254B]">{item.itemName} - {item.size}</p>
                  <p className="text-sm text-gray-500">Current: {item.currentStock} | Min Required: {item.minStock}</p>
                </div>
                <span className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold text-sm">
                  Low Stock
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stock Table */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#1B254B] mb-4">Inventory Overview</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Item Name</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Category</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Size</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Current Stock</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Stock Range</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Status</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStock.map((item) => {
                const status = getStockStatus(item);
                return (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                    <td className="py-4 px-4">
                      <p className="font-bold text-[#1B254B]">{item.itemName}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-semibold text-[#1B254B]">{item.size}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-2xl font-bold text-[#1B254B]">{item.currentStock}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <TrendingDown className="text-red-500" size={14} />
                          <span className="text-sm text-gray-600">Min: {item.minStock}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="text-green-500" size={14} />
                          <span className="text-sm text-gray-600">Max: {item.maxStock}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        status === 'low' ? 'bg-red-100 text-red-700' :
                        status === 'high' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {status === 'low' ? 'Low Stock' : status === 'high' ? 'Well Stocked' : 'Normal'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleEditStock(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteStock(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Stock Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#1B254B]">Add New Stock Item</h2>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Item Name</label>
                  <input
                    type="text"
                    value={formData.itemName}
                    onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    placeholder="e.g., Work Shirt"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  >
                    <option value="">Select Category</option>
                    <option value="Apparel">Apparel</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Safety Gear">Safety Gear</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Size</label>
                  <input
                    type="text"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    placeholder="e.g., M, 32, Free Size"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Current Stock</label>
                  <input
                    type="number"
                    value={formData.currentStock}
                    onChange={(e) => setFormData({ ...formData, currentStock: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Minimum Stock</label>
                  <input
                    type="number"
                    value={formData.minStock}
                    onChange={(e) => setFormData({ ...formData, minStock: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Maximum Stock</label>
                  <input
                    type="number"
                    value={formData.maxStock}
                    onChange={(e) => setFormData({ ...formData, maxStock: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSaveNewStock}
                  className="flex-1 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-[1.02] transition-all"
                >
                  Add Stock Item
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Stock Modal */}
      {showEditModal && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#1B254B]">Edit Stock Item</h2>
                <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Item Name</label>
                  <input
                    type="text"
                    value={formData.itemName}
                    onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  >
                    <option value="Apparel">Apparel</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Safety Gear">Safety Gear</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Size</label>
                  <input
                    type="text"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Current Stock</label>
                  <input
                    type="number"
                    value={formData.currentStock}
                    onChange={(e) => setFormData({ ...formData, currentStock: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Minimum Stock</label>
                  <input
                    type="number"
                    value={formData.minStock}
                    onChange={(e) => setFormData({ ...formData, minStock: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Maximum Stock</label>
                  <input
                    type="number"
                    value={formData.maxStock}
                    onChange={(e) => setFormData({ ...formData, maxStock: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleUpdateStock}
                  className="flex-1 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-[1.02] transition-all"
                >
                  Update Stock
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
