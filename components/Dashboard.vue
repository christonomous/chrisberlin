<template>
  <div class="p-6 bg-base-300 min-h-screen" data-theme="dark">
    <h1 class="text-3xl font-bold mb-8 text-base-content">Business Performance Dashboard</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Revenue Chart -->
      <div class="bg-base-200 p-6 rounded-xl shadow-lg border border-base-content/10">
        <h2 class="text-lg font-semibold mb-4">Revenue Overview</h2>
        <Line :data="revenueData" :options="chartOptions" />
      </div>

      <!-- Inbound Payments -->
      <div class="bg-base-200 p-6 rounded-xl shadow-lg border border-base-content/10">
        <h2 class="text-lg font-semibold mb-4">Inbound Payments</h2>
        <Bar :data="paymentsData" :options="chartOptions" />
      </div>

      <!-- Expenses -->
      <div class="bg-base-200 p-6 rounded-xl shadow-lg border border-base-content/10">
        <h2 class="text-lg font-semibold mb-4">Expenses Breakdown</h2>
        <Doughnut :data="expensesData" :options="chartOptions" />
      </div>

      <!-- Leads Growth -->
      <div class="bg-base-200 p-6 rounded-xl shadow-lg border border-base-content/10">
        <h2 class="text-lg font-semibold mb-4">Leads Growth</h2>
        <Line :data="leadsData" :options="chartOptions" />
      </div>

      <!-- User Growth -->
      <div class="bg-base-200 p-6 rounded-xl shadow-lg border border-base-content/10">
        <h2 class="text-lg font-semibold mb-4">User Growth</h2>
        <Line :data="usersData" :options="chartOptions" />
      </div>

      <!-- Conversion Rate -->
      <div class="bg-base-200 p-6 rounded-xl shadow-lg border border-base-content/10">
        <h2 class="text-lg font-semibold mb-4">Conversion Rate</h2>
        <Bar :data="conversionData" :options="chartOptions" />
      </div>
    </div>

    <!-- Transactions Table -->
    <div class="mt-8 bg-base-200 p-6 rounded-xl shadow-lg border border-base-content/10 overflow-x-auto">
      <h2 class="text-2xl font-bold mb-6 text-base-content">Recent Transactions</h2>
      <table class="table table-zebra w-full bg-base-100">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Business</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(transaction, index) in transactions" :key="index">
            <td>{{ transaction.date }}</td>
            <td>
              <span :class="[
                'badge badge-lg',
                transaction.type === 'inbound' ? 'badge-primary' : 'badge-secondary'
              ]">
                {{ transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1) }}
              </span>
            </td>
            <td>
              <span :class="transaction.type === 'inbound' ? 'text-primary' : 'text-secondary'">
                {{ transaction.type === 'inbound' ? '+' : '-' }}${{ transaction.amount.toLocaleString() }}
              </span>
            </td>
            <td>{{ transaction.business }}</td>
            <td>{{ transaction.description }}</td>
            <td>
              <span :class="[
                'badge badge-lg',
                {
                  'badge-success': transaction.status === 'completed',
                  'badge-warning': transaction.status === 'pending',
                  'badge-error': transaction.status === 'failed'
                }
              ]">
                {{ transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line, Bar, Doughnut } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
}

const revenueData = {
  labels: months,
  datasets: [{
    label: 'Revenue ($)',
    data: [30000, 35000, 45000, 40000, 50000, 55000],
    borderColor: '#3b82f6',
    tension: 0.1
  }]
}

const paymentsData = {
  labels: months,
  datasets: [{
    label: 'Payments Received ($)',
    data: [28000, 32000, 42000, 38000, 48000, 52000],
    backgroundColor: '#10b981'
  }]
}

const expensesData = {
  labels: ['Marketing', 'Operations', 'Development', 'Support', 'Infrastructure'],
  datasets: [{
    data: [15000, 12000, 18000, 8000, 7000],
    backgroundColor: [
      '#ef4444',
      '#f59e0b',
      '#3b82f6',
      '#10b981',
      '#8b5cf6'
    ]
  }]
}

const leadsData = {
  labels: months,
  datasets: [{
    label: 'New Leads',
    data: [120, 150, 180, 200, 220, 250],
    borderColor: '#f59e0b',
    tension: 0.1
  }]
}

const usersData = {
  labels: months,
  datasets: [{
    label: 'Active Users',
    data: [500, 600, 750, 900, 1100, 1300],
    borderColor: '#8b5cf6',
    tension: 0.1
  }]
}

const conversionData = {
  labels: months,
  datasets: [{
    label: 'Conversion Rate (%)',
    data: [2.1, 2.3, 2.8, 2.5, 2.9, 3.2],
    backgroundColor: '#ec4899'
  }]
}

const transactions = [
  {
    date: '2024-03-20',
    type: 'inbound',
    amount: 2500,
    business: 'Digital Marketing Agency',
    description: 'Monthly retainer payment',
    status: 'completed'
  },
  {
    date: '2024-03-19',
    type: 'expense',
    amount: 800,
    business: 'E-commerce Store',
    description: 'Software subscription',
    status: 'completed'
  },
  {
    date: '2024-03-18',
    type: 'inbound',
    amount: 1500,
    business: 'Online Course Platform',
    description: 'Course sales revenue',
    status: 'completed'
  },
  {
    date: '2024-03-17',
    type: 'expense',
    amount: 350,
    business: 'Digital Marketing Agency',
    description: 'Ad spend',
    status: 'pending'
  },
  {
    date: '2024-03-16',
    type: 'inbound',
    amount: 3000,
    business: 'Consulting Service',
    description: 'Project milestone payment',
    status: 'completed'
  },
  {
    date: '2024-03-15',
    type: 'expense',
    amount: 600,
    business: 'E-commerce Store',
    description: 'Inventory restock',
    status: 'failed'
  },
  {
    date: '2024-03-14',
    type: 'inbound',
    amount: 1200,
    business: 'Online Course Platform',
    description: 'Affiliate commission',
    status: 'completed'
  }
]
</script>

<style scoped>
.grid > div {
  height: 400px;
}
</style>
