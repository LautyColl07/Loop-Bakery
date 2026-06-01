import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart } from 'recharts';
import { TrendingUp, Calendar, BarChart3, TrendingUp as LineChartIcon } from 'lucide-react';

export function SalesStats() {
  const [viewMode, setViewMode] = useState<'monthly' | 'weekly'>('monthly');
  const [chartType, setChartType] = useState<'bar' | 'line' | 'combined'>('bar');

  const monthlyData = [
    { month: 'Ene', ventas: 185000, pedidos: 42, promedio: 4405 },
    { month: 'Feb', ventas: 210000, pedidos: 48, promedio: 4375 },
    { month: 'Mar', ventas: 245000, pedidos: 56, promedio: 4375 },
    { month: 'Abr', ventas: 268000, pedidos: 61, promedio: 4393 },
    { month: 'May', ventas: 285000, pedidos: 64, promedio: 4453 },
  ];

  const weeklyData = [
    { week: 'Sem 1', ventas: 58000, pedidos: 13 },
    { week: 'Sem 2', ventas: 62000, pedidos: 15 },
    { week: 'Sem 3', ventas: 71000, pedidos: 16 },
    { week: 'Sem 4', ventas: 65000, pedidos: 14 },
    { week: 'Sem 5', ventas: 29000, pedidos: 6 },
  ];

  const topProducts = [
    { name: 'Caja Premium', sales: 45, revenue: 675000 },
    { name: 'Caja Dulce Tentación', sales: 38, revenue: 290700 },
    { name: 'Catering 20 personas', sales: 12, revenue: 780000 },
    { name: 'Caja Artesanal', sales: 34, revenue: 188700 },
    { name: 'Alfajor Triple', sales: 156, revenue: 132600 },
  ];

  const currentData = viewMode === 'monthly' ? monthlyData : weeklyData;
  const dataKey = viewMode === 'monthly' ? 'month' : 'week';

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-2">Estadísticas de Ventas</h1>
        <p className="text-muted-foreground">Análisis de rendimiento y métricas</p>
      </div>

      {/* View Mode and Chart Type Toggles */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setViewMode('monthly')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              viewMode === 'monthly'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border-2 border-accent hover:border-primary'
            }`}
          >
            <Calendar className="w-5 h-5" />
            Métricas Mensuales
          </button>
          <button
            onClick={() => setViewMode('weekly')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              viewMode === 'weekly'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border-2 border-accent hover:border-primary'
            }`}
          >
            <Calendar className="w-5 h-5" />
            Métricas Semanales
          </button>
        </div>

        <div className="flex items-center gap-2 bg-card border-2 border-accent rounded-lg p-1">
          <button
            onClick={() => setChartType('bar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
              chartType === 'bar' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/30'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Barras
          </button>
          <button
            onClick={() => setChartType('line')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
              chartType === 'line' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/30'
            }`}
          >
            <LineChartIcon className="w-4 h-4" />
            Líneas
          </button>
          <button
            onClick={() => setChartType('combined')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
              chartType === 'combined' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/30'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Mixto
          </button>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Sales Chart */}
        <div className="bg-card border-2 border-accent rounded-xl p-6">
          <h3 className="mb-6">Ventas en Pesos</h3>
          <ResponsiveContainer width="100%" height={300}>
            {chartType === 'bar' ? (
              <BarChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(123, 75, 148, 0.1)" />
                <XAxis dataKey={dataKey} tick={{ fill: '#6B5A6E' }} axisLine={{ stroke: 'rgba(123, 75, 148, 0.15)' }} />
                <YAxis tick={{ fill: '#6B5A6E' }} axisLine={{ stroke: 'rgba(123, 75, 148, 0.15)' }} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '2px solid #E8D4F1', borderRadius: '8px' }} />
                <Bar dataKey="ventas" fill="#7B4B94" radius={[8, 8, 0, 0]} />
              </BarChart>
            ) : chartType === 'line' ? (
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(123, 75, 148, 0.1)" />
                <XAxis dataKey={dataKey} tick={{ fill: '#6B5A6E' }} axisLine={{ stroke: 'rgba(123, 75, 148, 0.15)' }} />
                <YAxis tick={{ fill: '#6B5A6E' }} axisLine={{ stroke: 'rgba(123, 75, 148, 0.15)' }} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '2px solid #E8D4F1', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="ventas" stroke="#7B4B94" strokeWidth={3} dot={{ fill: '#7B4B94', r: 5 }} />
              </LineChart>
            ) : (
              <ComposedChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(123, 75, 148, 0.1)" />
                <XAxis dataKey={dataKey} tick={{ fill: '#6B5A6E' }} axisLine={{ stroke: 'rgba(123, 75, 148, 0.15)' }} />
                <YAxis tick={{ fill: '#6B5A6E' }} axisLine={{ stroke: 'rgba(123, 75, 148, 0.15)' }} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '2px solid #E8D4F1', borderRadius: '8px' }} />
                <Bar dataKey="ventas" fill="#7B4B94" radius={[8, 8, 0, 0]} />
                <Line type="monotone" dataKey="ventas" stroke="#C8A2D8" strokeWidth={2} dot={{ fill: '#C8A2D8', r: 4 }} />
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Orders Chart */}
        <div className="bg-card border-2 border-accent rounded-xl p-6">
          <h3 className="mb-6">Cantidad de Pedidos</h3>
          <ResponsiveContainer width="100%" height={300}>
            {chartType === 'bar' ? (
              <BarChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(123, 75, 148, 0.1)" />
                <XAxis dataKey={dataKey} tick={{ fill: '#6B5A6E' }} axisLine={{ stroke: 'rgba(123, 75, 148, 0.15)' }} />
                <YAxis tick={{ fill: '#6B5A6E' }} axisLine={{ stroke: 'rgba(123, 75, 148, 0.15)' }} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '2px solid #E8D4F1', borderRadius: '8px' }} />
                <Bar dataKey="pedidos" fill="#C8A2D8" radius={[8, 8, 0, 0]} />
              </BarChart>
            ) : chartType === 'line' ? (
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(123, 75, 148, 0.1)" />
                <XAxis dataKey={dataKey} tick={{ fill: '#6B5A6E' }} axisLine={{ stroke: 'rgba(123, 75, 148, 0.15)' }} />
                <YAxis tick={{ fill: '#6B5A6E' }} axisLine={{ stroke: 'rgba(123, 75, 148, 0.15)' }} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '2px solid #E8D4F1', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="pedidos" stroke="#C8A2D8" strokeWidth={3} dot={{ fill: '#C8A2D8', r: 5 }} />
              </LineChart>
            ) : (
              <ComposedChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(123, 75, 148, 0.1)" />
                <XAxis dataKey={dataKey} tick={{ fill: '#6B5A6E' }} axisLine={{ stroke: 'rgba(123, 75, 148, 0.15)' }} />
                <YAxis tick={{ fill: '#6B5A6E' }} axisLine={{ stroke: 'rgba(123, 75, 148, 0.15)' }} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '2px solid #E8D4F1', borderRadius: '8px' }} />
                <Bar dataKey="pedidos" fill="#C8A2D8" radius={[8, 8, 0, 0]} />
                <Line type="monotone" dataKey="pedidos" stroke="#7B4B94" strokeWidth={2} dot={{ fill: '#7B4B94', r: 4 }} />
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-card border-2 border-accent rounded-xl p-6">
        <h3 className="mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Productos Más Vendidos
        </h3>
        <div className="space-y-4">
          {topProducts.map((product, index) => {
            const maxRevenue = Math.max(...topProducts.map(p => p.revenue));
            const percentage = (product.revenue / maxRevenue) * 100;

            return (
              <div key={index} className="border-2 border-accent rounded-lg p-4 hover:border-primary transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div>
                      <p className="mb-1">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sales} unidades vendidas</p>
                    </div>
                  </div>
                  <p className="text-xl text-primary">${product.revenue.toLocaleString()}</p>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
