import { useState } from 'react'
import { 
  useDashboardStats, 
  useRecentBookings,
  useTurfs,
  useOwners,
  usePlayers,
  useBookings,
  usePayouts,
  useCoupons,
  useReviews,
  useSettings,
  useSubscriptions,
  useActivityLogs,
  useBookingsReport
} from '../../api/hooks/useAllAPIs'
import Button from '../ui/Button'

export default function APITestComponent() {
  const [activeTest, setActiveTest] = useState(null)

  // All API hooks
  const dashboardStats = useDashboardStats()
  const recentBookings = useRecentBookings()
  const turfs = useTurfs()
  const owners = useOwners()
  const players = usePlayers()
  const bookings = useBookings()
  const payouts = usePayouts()
  const coupons = useCoupons()
  const reviews = useReviews()
  const settings = useSettings()
  const subscriptions = useSubscriptions()
  const activityLogs = useActivityLogs()
  const bookingsReport = useBookingsReport()

  const apiTests = [
    { name: 'Dashboard Stats', hook: dashboardStats, endpoint: '/v1/admin/dashboard/stats' },
    { name: 'Recent Bookings', hook: recentBookings, endpoint: '/v1/admin/dashboard/recent-bookings' },
    { name: 'Turfs List', hook: turfs, endpoint: '/v1/admin/turfs' },
    { name: 'Owners List', hook: owners, endpoint: '/v1/admin/owners' },
    { name: 'Players List', hook: players, endpoint: '/v1/admin/players' },
    { name: 'Bookings List', hook: bookings, endpoint: '/v1/admin/bookings' },
    { name: 'Payouts List', hook: payouts, endpoint: '/v1/admin/payouts' },
    { name: 'Coupons List', hook: coupons, endpoint: '/v1/admin/coupons' },
    { name: 'Reviews List', hook: reviews, endpoint: '/v1/admin/reviews' },
    { name: 'Settings', hook: settings, endpoint: '/v1/admin/settings' },
    { name: 'Subscriptions', hook: subscriptions, endpoint: '/v1/admin/subscriptions' },
    { name: 'Activity Logs', hook: activityLogs, endpoint: '/v1/admin/logs/activity' },
    { name: 'Bookings Report', hook: bookingsReport, endpoint: '/v1/admin/reports/bookings' }
  ]

  const getStatusColor = (hook) => {
    if (hook.isLoading) return 'bg-yellow-100 text-yellow-800'
    if (hook.isError) return 'bg-red-100 text-red-800'
    if (hook.isSuccess) return 'bg-green-100 text-green-800'
    return 'bg-gray-100 text-gray-800'
  }

  const getStatusText = (hook) => {
    if (hook.isLoading) return 'Loading...'
    if (hook.isError) return `Error: ${hook.error?.message || 'Unknown error'}`
    if (hook.isSuccess) return 'Success'
    return 'Not tested'
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">API Endpoints Test Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {apiTests.map((test, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">{test.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{test.endpoint}</p>
            
            <div className={`px-2 py-1 rounded text-xs mb-3 ${getStatusColor(test.hook)}`}>
              {getStatusText(test.hook)}
            </div>
            
            <Button
              size="sm"
              onClick={() => {
                setActiveTest(test.name)
                test.hook.refetch()
              }}
              loading={test.hook.isLoading}
            >
              Test API
            </Button>
            
            {test.hook.isSuccess && (
              <div className="mt-2 text-xs text-green-600">
                ✅ Data loaded: {Array.isArray(test.hook.data) ? test.hook.data.length : 'Object'} items
              </div>
            )}
          </div>
        ))}
      </div>

      {activeTest && (
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Response for: {activeTest}</h2>
          <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto max-h-96">
            {JSON.stringify(
              apiTests.find(t => t.name === activeTest)?.hook.data, 
              null, 
              2
            )}
          </pre>
        </div>
      )}
    </div>
  )
}