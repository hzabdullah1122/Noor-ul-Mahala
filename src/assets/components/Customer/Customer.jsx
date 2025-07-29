import { useState, useEffect } from 'react';
import './Customer.css';
import { supabase } from '../../../../src/Supabase/Client';
import { useNavigate } from 'react-router-dom';

const Customer = () => {
  const [activeTab, setActiveTab] = useState('my-cars');
  const [myCars, setMyCars] = useState([]);
  const [assignedCars, setAssignedCars] = useState([]);
  const [modal, setModal] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);
  const [allCustomerData, setAllCustomerData] = useState([]);
  const [availableCars, setAvailableCars] = useState([]);

  const [loading, setLoading] = useState(false);

  const [viewingDetails, setViewingDetails] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email);
        fetchAssignedCars(user.email);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      const { data, error } = await supabase
        .from('Customer Table')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) setMyCars(data);
    };
    fetchCars();
  }, []);

  const fetchAssignedCars = async (email) => {
    const { data, error } = await supabase
      .from('Update Data')
      .select('*');
    if (!error && data) setAssignedCars(data);
  };



  const fetchAllCustomerData = async (selectedCar) => {
    setLoading(true);
    console.log('Selected car object:', selectedCar);

    try {
      const { data: allData, error: allError } = await supabase
        .from('Add Customer')
        .select('car_id');
      console.log('All car_id values in Add Customer table:', allData);
      // Filter by car_id from Add Customer table
      const { data, error } = await supabase
        .from('Add Customer')
        .select('*')
        .eq('name', selectedCar.customer_name);
      console.log('Query result:', { data, error });
      console.log('Looking for car_id:', selectedCar.id);
      if (error) {
        console.error('Error fetching customer data:', error);
        setAllCustomerData([]);
      } else {
        setAllCustomerData(data || []);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setAllCustomerData([]);
    } finally {
      setLoading(false);
    }
  };


  const addMyCar = async () => {
    const make = document.getElementById('carMake').value;
    const model = document.getElementById('carModel').value;
    const year = document.getElementById('carYear').value;
    const file = document.getElementById('carImage').files[0];

    if (!make || !model || !year || !file) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `customer-cars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('customer-cars')
      .upload(filePath, file);

    if (uploadError) {
      alert("❌ Failed to upload image: " + uploadError.message);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('customer-cars')
      .getPublicUrl(filePath);

    const { data, error: insertError } = await supabase
      .from('Customer Table')
      .insert([{ make, model, year: parseInt(year), image_url: publicUrl }])
      .select();

    if (insertError) {
      alert("❌ Failed to store car data: " + insertError.message);
      return;
    }

    setMyCars([data[0], ...myCars]);
    setModal('');
  };

  const handleRemove = async (id) => {
    const { error } = await supabase
      .from('Customer Table')
      .delete()
      .eq('id', id);

    if (!error) setMyCars(myCars.filter(car => car.id !== id));
  };

  const handleAssignedRemove = async (id) => {
    const { error } = await supabase
      .from('Update Data')
      .delete()
      .eq('id', id);

    if (!error) setAssignedCars(assignedCars.filter(car => car.id !== id));
  };


  useEffect(() => {
    const fetchAvailableCars = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('Admin Table')
        .select('*');

      if (error) {
        console.error('Error fetching available cars:', error);
        setAvailableCars([]);
      } else {
        setAvailableCars(data);
      }
      setLoading(false);
    };

    fetchAvailableCars();

    // Keep mock for myCars and assignedCars (unless also migrating those)
    setMyCars([
      {
        id: 1,
        make: 'Mazda',
        model: 'CX-3',
        year: 2019,
        image_url: '/lovable-uploads/4797a706-14c3-4b12-8b8c-47df423fd817.png'
      }
    ]);
    setAssignedCars([
      {
        id: 1,
        car_make: 'Mazda',
        car_model: 'CX-3',
        car_year: 2019,
        customer_name: 'John Doe',
        customer_address: '123 Main St, City, State',
        image_url: '/lovable-uploads/4797a706-14c3-4b12-8b8c-47df423fd817.png'
      }
    ]);
    setUserEmail('demo@example.com');
  }, []);


  const handleViewDetails = async (car) => {
    setSelectedCar(car);
    setViewingDetails(true);
    await fetchAllCustomerData(car);
  };


  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const renderCustomerDataField = (key, value) => {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const formattedKey = key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return (
      <p key={key} style={{ wordBreak: 'break-word' }}>
        <strong>{formattedKey}:</strong> {value.toString()}
      </p>
    );
  };
  // if (loading) return <div class="loader"></div>;
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Car Dealer Portal</h2>
        <a onClick={handleLogout} className="logout">Logout</a>
      </aside>
      <main className="main-content">
        {!viewingDetails && (
          <>
            <h1>Welcome, Admin!</h1>
            <nav className="nav">
    <button
      onClick={() => { setSelectedCar(null); setActiveTab('my-cars'); }}
      className={`tab-link ${activeTab === 'my-cars' ? 'active' : ''}`}
    >
       My Cars
    </button>

    <button
      onClick={() => { setSelectedCar(null); setActiveTab('assigned-cars'); }}
      className={`tab-link ${activeTab === 'assigned-cars' ? 'active' : ''}`}
    >
       Purchase History
    </button>

    <button
      onClick={() => { setSelectedCar(null); setActiveTab('manage-cars'); }}
      className={`tab-link ${activeTab === 'manage-cars' ? 'active' : ''}`}
    >
       Available Cars
    </button>

    {/* Sliding Underline */}
    <div
      className="active-indicator"
      style={{
        transform:
          activeTab === 'my-cars'
            ? 'translateX(0%)'
            : activeTab === 'assigned-cars'
            ? 'translateX(100%)'
            : 'translateX(200%)'
      }}
    />
</nav>

          </>
        )}


        {activeTab === 'my-cars' && (
          <section className="tab-content">
            <div className="section-header">
              <h2>My Cars</h2>
              <button onClick={() => setModal('myCarModal')}>+ Add Car</button>
            </div>
            <div className="card-grid">
              {myCars.map((car) => (
                <div key={car.id} className="car-card">
                  <img src={car.image_url} className="car-image" alt="Car" />
                  <h3>{car.make} {car.model} ({car.year}) {car.arrival_date && `(${car.arrival_date})`} {car.arrival_price && `(${car.arrival_price})`}</h3>
                  <button onClick={() => handleRemove(car.id)} className='remove-btn2'>Delete</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'assigned-cars' && (
          <>
            {selectedCar ? (
              <section className="p-6 bg-white shadow-md rounded-lg  ">
                <div className="main-flex">
                  <div className="md:col-span-1 flex-2 ">
                    <div className='fleximg1'>
                      <img src={selectedCar.image_url} alt="Car" className="w-full rounded-lg" />
                    </div>
                    <div className='fleximg2'>
                      <img src={selectedCar.image_url} alt="Car" className="w-full rounded-lg " />
                      <img src={selectedCar.image_url} alt="Car" className="w-full rounded-lg" />
                      <img src={selectedCar.image_url} alt="Car" className="w-full rounded-lg" />
                      <img src={selectedCar.image_url} alt="Car" className="w-full img-four rounded-lg " />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-4 flex-3 ">
                    <div>
                      <h3 className="text-xl font-semibold mb-1 bgclr">Car Specs</h3>
                      <p><strong className='flex-p'>Make:</strong> {selectedCar.car_make}</p>
                      <p><strong className='flex-p'>Model:</strong> {selectedCar.car_model}</p>
                      <p><strong className='flex-p'>Year:</strong> {selectedCar.car_year}</p>
                      <h3 className="text-xl font-semibold mb-1 bgclr">Customer Detail</h3>
                      <p><strong className='flex-p'>Assigned to:</strong> {selectedCar.customer_name}</p>
                      <p><strong className='flex-p-2'>Customer Address:</strong> {selectedCar.customer_address}</p>
                    </div>

                    {loading ? (
                      <div>
                        <h3 className="text-xl font-semibold mt-6 mb-2">Loading Customer Data...</h3>
                        <p>Please wait while we fetch customer information for this car...</p>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-xl font-semibold mt-6 mb-2 bgclr">Shipping Information</h3>
                        {allCustomerData.length > 0 ? (
                          <div className='space-y-4 '>
                            {allCustomerData.map((customerRecord, index) => (
                              <div key={index} className="border border-gray-200 p-4 rounded-lg">
                                <h4 className="text-lg font-medium mb-2">Customer Record #{index + 1}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flexp  ">
                                  {Object.entries(customerRecord).map(([key, value]) =>
                                    renderCustomerDataField(key, value)
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-gray-500 italic">
                            <p>No customer data found for this specific car in the "Admin Table".</p>
                            <p className="text-sm mt-2">This might mean:</p>
                            <ul className="text-sm mt-1 ml-4">
                              <li>• No data has been entered for this specific car yet</li>
                              <li>• The car details don't match exactly with records in Admin Table</li>
                              <li>• The customer name doesn't match</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-60 flex gap-3  btn-6">
                  <button
                    onClick={() => {
                      setSelectedCar(null);
                      setAllCustomerData([]);
                      setViewingDetails(false);
                    }}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Back
                  </button>
                </div>
              </section>
            ) : (
              <section className="tab-content">
                <div className="section-header">
                  <h2>Assigned Cars</h2>
                </div>
                {assignedCars.length === 0 ? (
                  <p>No cars assigned yet.</p>
                ) : (
                  <div className="card-grid">
                    {assignedCars.map((car) => (
                      <div key={car.id} className="car-card">
                        <h3>{car.car_make} {car.car_model}</h3>
                        <div>
                          <div className='assignedimg'>
                            {car.image_url && <img src={car.image_url} className="car-image" alt="Assigned Car" />}
                          </div>
                          <div className='assignedp3'>
                            <p><strong>Customer Name:</strong> {car.customer_name}</p>
                            <p><strong>Address:</strong> {car.customer_address}</p>
                            <button
                              onClick={() => handleAssignedRemove(car.id)}
                              className="remove-btn"
                              style={{ padding: '5px 12px', fontSize: '14px' }}
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => handleViewDetails(car)}
                              className="remove-btn-2"
                              style={{ padding: '5px 12px', fontSize: '14px', marginLeft: '5px' }}
                            >
                              View Details
                            </button>
                          </div>
                        </div>


                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </>
        )}
      </main>

      {activeTab === 'manage-cars' && (
        <>
          {loading ? (
            <div className="loader">Loading available cars...</div>
          ) : availableCars.length === 0 ? (
            <p>No cars available yet.</p>
          ) : (
            <div className="card-grid">
              {availableCars.map((car) => (
                <div key={car.id} className="car-card">
                  {car.image_url ? (
                    <img src={car.image_url} alt="Car" className="car-image" />
                  ) : (
                    <div className="car-image car-placeholder">No Image</div>
                  )}
                  <h3>{car.make} {car.model} ({car.year})</h3>
                  <div className='flexadd'>
                    <div className='txtflex'>
                      <p className='wgreen-2'></p>
                      <p>Price: ${car.price}</p>
                    </div>
                    <div className='txtflex'>
                      <p className='wyellow-2'></p>
                      <p>Fuel: {car.fuel}</p>
                    </div>
                    <div className='txtflex'>
                      <p className='wpurple-2'></p>
                      <p>Transmission: {car.transmission}</p>
                    </div>
                    <div className='txtflex'>
                      <p className='wdark-2'></p>
                      <p>Engine: {car.engine}cc</p>
                    </div>
                    <div className='txtflex'>
                      <p className='wyellow-2'></p>
                      <p>Seats: {car.seats}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}


      {modal === 'myCarModal' && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add My Car</h3>
            <input type="text" id="carMake" placeholder="Make" />
            <input type="text" id="carModel" placeholder="Model" />
            <input type="number" id="carYear" placeholder="Year" />
            <input type="file" id="carImage" accept="image/*" />
            <button onClick={addMyCar}>Add</button>
            <button onClick={() => setModal('')}>Cancel</button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Customer;