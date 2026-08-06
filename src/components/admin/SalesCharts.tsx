import { useMemo } from 'react';
import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { BarChart3, TrendingUp, Trophy } from 'lucide-react';
import { useOrders } from '../../context/OrdersContext';
import { formatPrice } from '../../types';

// ── Paleta violeta ─────────────────────────────────────────
const COLORS = {
  primary: '#6d28d9',     // primary-700
  primaryLight: '#a78bfa', // primary-400
  accent: '#d8b4fe',       // lila
  deep: '#2d1b2e',         // purple-deep
  cream: '#faf5f0',        // cream-100
  grid: '#e8ddd3',         // cream-300
};

// ── Helpers de fecha ───────────────────────────────────────
const DAY_NAMES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // lunes como inicio
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isSameDay(d1: Date, d2: Date): boolean {
  return d1.toDateString() === d2.toDateString();
}

function getWeekLabel(weekStart: Date): string {
  const end = new Date(weekStart);
  end.setDate(end.getDate() + 6);
  const fmt = (d: Date) => `${d.getDate()}/${d.getMonth() + 1}`;
  return `${fmt(weekStart)} - ${fmt(end)}`;
}

// ── Tooltip personalizado ──────────────────────────────────
function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl border border-primary-100 shadow-lg px-4 py-3 text-sm">
      <p className="font-semibold text-purple-deep mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-xs" style={{ color: entry.color }}>
          {entry.name}: {entry.name.includes('Ingreso') ? formatPrice(entry.value) : entry.value}
        </p>
      ))}
    </div>
  );
}

// ── Componente principal ───────────────────────────────────
export function SalesCharts() {
  const { completedOrders } = useOrders();

  // ── Datos semanales (7 días, Lun-Dom) ──────────────────
  const weeklyData = useMemo(() => {
    const today = new Date();
    const weekStart = getWeekStart(today);

    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      return d;
    });

    return days.map(day => {
      const dayOrders = completedOrders.filter(o =>
        isSameDay(new Date(o.completedAt || o.createdAt), day)
      );
      return {
        name: DAY_NAMES[day.getDay()],
        pedidos: dayOrders.length,
        ingreso: dayOrders.reduce((s, o) => s + o.total, 0),
      };
    });
  }, [completedOrders]);

  // ── Datos mensuales (últimas 4 semanas) ─────────────────
  const monthlyData = useMemo(() => {
    const weeks: { start: Date; label: string; pedidos: number; ingreso: number }[] = [];
    const today = new Date();

    for (let w = 3; w >= 0; w--) {
      const wStart = new Date(today);
      wStart.setDate(wStart.getDate() - w * 7);
      const weekBegin = getWeekStart(wStart);
      const weekEnd = new Date(weekBegin);
      weekEnd.setDate(weekEnd.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);

      const weekOrders = completedOrders.filter(o => {
        const d = new Date(o.completedAt || o.createdAt);
        return d >= weekBegin && d <= weekEnd;
      });

      weeks.push({
        start: weekBegin,
        label: getWeekLabel(weekBegin),
        pedidos: weekOrders.length,
        ingreso: weekOrders.reduce((s, o) => s + o.total, 0),
      });
    }

    return weeks.map(w => ({
      name: w.label,
      pedidos: w.pedidos,
      ingreso: w.ingreso,
    }));
  }, [completedOrders]);

  // ── Top productos más vendidos ──────────────────────────
  const topProducts = useMemo(() => {
    const map = new Map<string, { name: string; qty: number; revenue: number }>();
    completedOrders.forEach(order => {
      order.items.forEach(item => {
        const existing = map.get(item.productName);
        if (existing) {
          existing.qty += item.quantity;
          existing.revenue += item.unitPrice * item.quantity;
        } else {
          map.set(item.productName, {
            name: item.productName,
            qty: item.quantity,
            revenue: item.unitPrice * item.quantity,
          });
        }
      });
    });
    return Array.from(map.values())
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 6);
  }, [completedOrders]);

  // ── Métricas resumen ────────────────────────────────────
  const weekTotal = weeklyData.reduce((s, d) => s + d.ingreso, 0);
  const weekOrders = weeklyData.reduce((s, d) => s + d.pedidos, 0);
  const monthTotal = monthlyData.reduce((s, d) => s + d.ingreso, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ── Header ──────────────────────────────── */}
      <div>
        <h2 className="font-display text-2xl font-bold text-purple-deep flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary-700" strokeWidth={1.8} />
          Estadísticas de Ventas
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Rendimiento semanal y mensual basado en pedidos completados
        </p>
      </div>

      {/* ── Métricas ─────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-primary-700 to-primary-600 rounded-2xl p-5 text-white shadow-card">
          <p className="text-white/70 text-xs font-medium mb-1">Ingresos esta semana</p>
          <p className="text-2xl font-bold">{formatPrice(weekTotal)}</p>
          <p className="text-white/60 text-xs mt-1">{weekOrders} pedidos</p>
        </div>
        <div className="bg-gradient-to-br from-purple-deep to-primary-800 rounded-2xl p-5 text-white shadow-card">
          <p className="text-white/70 text-xs font-medium mb-1">Ingresos último mes</p>
          <p className="text-2xl font-bold">{formatPrice(monthTotal)}</p>
          <p className="text-white/60 text-xs mt-1">{completedOrders.length} pedidos totales</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-primary-100 shadow-card">
          <p className="text-muted-foreground text-xs font-medium mb-1">Ticket promedio</p>
          <p className="text-2xl font-bold text-primary-700">
            {completedOrders.length > 0
              ? formatPrice(Math.round(monthTotal / completedOrders.length))
              : formatPrice(0)}
          </p>
          <p className="text-muted-foreground text-xs mt-1">por pedido</p>
        </div>
      </div>

      {/* ── Gráfico semanal ─────────────────────── */}
      <div className="bg-white rounded-2xl border border-primary-100 shadow-card p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-primary-700" strokeWidth={1.8} />
          <h3 className="font-display text-lg font-semibold text-purple-deep">
            Ventas de la semana
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: COLORS.deep, fontSize: 12 }}
              axisLine={{ stroke: COLORS.grid }}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              tick={{ fill: COLORS.deep, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={35}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: COLORS.primaryLight, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
              width={45}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 12 }}
              iconType="circle"
              iconSize={8}
            />
            <Bar
              yAxisId="left"
              dataKey="pedidos"
              name="Pedidos"
              fill={COLORS.primary}
              radius={[8, 8, 0, 0]}
            />
            <Bar
              yAxisId="right"
              dataKey="ingreso"
              name="Ingreso ($)"
              fill={COLORS.accent}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Gráfico mensual ─────────────────────── */}
      <div className="bg-white rounded-2xl border border-primary-100 shadow-card p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-primary-700" strokeWidth={1.8} />
          <h3 className="font-display text-lg font-semibold text-purple-deep">
            Tendencia mensual
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="gradientIngreso" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3} />
                <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="gradientPedidos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.accent} stopOpacity={0.4} />
                <stop offset="95%" stopColor={COLORS.accent} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: COLORS.deep, fontSize: 11 }}
              axisLine={{ stroke: COLORS.grid }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: COLORS.deep, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={35}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 12 }}
              iconType="circle"
              iconSize={8}
            />
            <Area
              type="monotone"
              dataKey="ingreso"
              name="Ingreso ($)"
              stroke={COLORS.primary}
              strokeWidth={2.5}
              fill="url(#gradientIngreso)"
            />
            <Area
              type="monotone"
              dataKey="pedidos"
              name="Pedidos"
              stroke={COLORS.accent}
              strokeWidth={2}
              fill="url(#gradientPedidos)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ── Top productos ───────────────────────── */}
      <div className="bg-white rounded-2xl border border-primary-100 shadow-card p-6">
        <div className="flex items-center gap-2 mb-5">
          <Trophy className="w-5 h-5 text-amber-500" strokeWidth={1.8} />
          <h3 className="font-display text-lg font-semibold text-purple-deep">
            Productos más vendidos
          </h3>
        </div>

        {topProducts.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No hay datos aún. Marcá pedidos como completados para ver estadísticas.
          </p>
        ) : (
          <div className="space-y-3">
            {topProducts.map((prod, i) => {
              const maxQty = topProducts[0].qty;
              const pct = Math.round((prod.qty / maxQty) * 100);
              return (
                <div key={prod.name} className="flex items-center gap-3">
                  {/* Posición */}
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    i === 0 ? 'bg-amber-100 text-amber-700'
                      : i === 1 ? 'bg-gray-100 text-gray-600'
                      : i === 2 ? 'bg-orange-100 text-orange-600'
                      : 'bg-cream-200 text-muted-foreground'
                  }`}>
                    {i + 1}
                  </span>

                  {/* Barra + info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-purple-deep truncate">{prod.name}</p>
                      <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                        <span className="text-xs font-semibold text-primary-700">{prod.qty} un.</span>
                        <span className="text-xs text-muted-foreground">{formatPrice(prod.revenue)}</span>
                      </div>
                    </div>
                    <div className="h-2 bg-cream-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary-700 to-primary-500 transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
