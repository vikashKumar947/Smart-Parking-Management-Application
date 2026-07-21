const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Heading */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Welcome back, Admin 👋
        </p>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow p-6">

          <h3 className="text-slate-500">
            Total Slots
          </h3>

          <p className="text-4xl font-bold mt-3">
            100
          </p>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h3 className="text-slate-500">
            Available
          </h3>

          <p className="text-4xl font-bold text-green-600 mt-3">
            35
          </p>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h3 className="text-slate-500">
            Occupied
          </h3>

          <p className="text-4xl font-bold text-red-600 mt-3">
            65
          </p>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h3 className="text-slate-500">
            Today's Revenue
          </h3>

          <p className="text-4xl font-bold text-blue-600 mt-3">
            ₹4,850
          </p>

        </div>

      </div>

      {/* Parking Overview */}

      <div className="bg-white rounded-xl shadow p-6 mt-10">

        <h2 className="text-2xl font-semibold mb-6">
          Parking Overview
        </h2>

        <div className="grid grid-cols-5 gap-4">

          {Array.from({ length: 20 }).map((_, index) => (

            <div
              key={index}
              className={`rounded-lg p-4 text-center font-semibold text-white
                ${index % 3 === 0 ? "bg-red-500" : "bg-green-500"}
              `}
            >
              A{index + 1}
            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default Dashboard;