import { BookOpen, Activity, Heart, Clock } from "lucide-react";

export default function DashboardMetrics() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Dashboard</h1>
        <p className="text-gray-600">
          Track your progress and manage your activities
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Academic Hours Card */}
        <div className="bg-white border rounded-lg p-4">
          <div className="mb-3">
            <h3 className="text-gray-600 font-medium">Academic Hours</h3>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-3xl font-bold text-gray-800">32.5</span>
            <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-blue-500" />
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: "47%" }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">47% of your weekly goal</p>
        </div>

        {/* Exercise Time Card */}
        <div className="bg-white border rounded-lg p-4">
          <div className="mb-3">
            <h3 className="text-gray-600 font-medium">Exercise Time</h3>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-3xl font-bold text-gray-800">28.0</span>
            <div className="h-10 w-10 rounded-md bg-green-100 flex items-center justify-center">
              <Activity className="h-5 w-5 text-green-500" />
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: "40%" }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">40% of your weekly goal</p>
        </div>

        {/* Personal Time Card */}
        <div className="bg-white border rounded-lg p-4">
          <div className="mb-3">
            <h3 className="text-gray-600 font-medium">
              <h3 className="text-gray-600 font-medium">Personal Time</h3>
            </h3>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-3xl font-bold text-gray-800">9.0</span>
            <div className="h-10 w-10 rounded-md bg-yellow-100 flex items-center justify-center">
              <Heart className="h-5 w-5 text-yellow-500" />
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
            <div
              className="bg-yellow-500 h-2 rounded-full"
              style={{ width: "13%" }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">13% of your weekly goal</p>
        </div>

        {/* Total Hours Card */}
        <div className="bg-white border rounded-lg p-4">
          <div className="mb-3">
            <h3 className="text-gray-600 font-medium">Total Hours</h3>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-3xl font-bold text-gray-800">69.5</span>
            <div className="h-10 w-10 rounded-md bg-purple-100 flex items-center justify-center">
              <Clock className="h-5 w-5 text-purple-500" />
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
            <div
              className="bg-purple-500 h-2 rounded-full"
              style={{ width: "83%" }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">83% of your weekly capacity</p>
        </div>
      </div>

      {/* Visualization Section */}
      <div className="border rounded-lg bg-white p-6">
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          Your Week, Visualized
        </h2>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Total Hours Box */}
          <div className="bg-gray-100 p-8 rounded-md flex flex-col items-center justify-center w-48 h-48">
            <p className="text-gray-600 mb-1">Total</p>
            <p className="text-3xl font-bold text-gray-800">69.5h</p>
          </div>

          {/* Progress Bars */}
          <div className="flex-1 space-y-6">
            {/* Academic Progress */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="mr-2 inline-block w-3 h-3 rounded-full bg-blue-500"></span>
                  <span>Academic</span>
                </div>
                <span className="font-medium">47%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: "47%" }}
                ></div>
              </div>
            </div>

            {/* Exercise Progress */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="mr-2 inline-block w-3 h-3 rounded-full bg-green-500"></span>
                  <span>Exercise</span>
                </div>
                <span className="font-medium">40%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{ width: "40%" }}
                ></div>
              </div>
            </div>

            {/* Personal Progress */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="mr-2 inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span>Personal/Other</span>
                </div>
                <span className="font-medium">13%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-yellow-500 h-2.5 rounded-full"
                  style={{ width: "13%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
