import { useState, useRef, useEffect } from 'react';
import './Admin.css';
import { supabase } from '../../../../src/Supabase/Client';
import { useNavigate } from 'react-router-dom';

const ADMIN_EMAIL = "admin3256@gmail.com";

const Admin = () => {
  const [carList, setCarList] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [showSection, setShowSection] = useState('add-car');
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const carFormRef = useRef(null);
  const customerFormRef = useRef(null);
  const [selectedCustomers, setSelectedCustomers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.email !== ADMIN_EMAIL) {
        navigate('/');
      } else {
        await fetchData();
        await fetchAssignments();
        setLoading(false);
      }
    };
    checkAdmin();
  }, []);

  const fetchData = async () => {
    const { data: cars } = await supabase.from('Admin Table').select('*').order('created_at', { ascending: false });
    const { data: customers } = await supabase.from('Add Customer').select('*').order('created_at', { ascending: false });
    setCarList(cars || []);
    setCustomers(customers || []);
  };

  const fetchAssignments = async () => {
    const { data } = await supabase.from('Update Data').select('*').order('id', { ascending: false });
    setAssignments(data || []);
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    const form = carFormRef.current;
    const formData = new FormData(form);

    const file = formData.get('image');
    let imageUrl = '';

    if (file && file.name) {
      const fileExt = file.name.split('.').pop();
      const filePath = `cars/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('car-images')
        .upload(filePath, file);

      if (uploadError) {
        alert('❌ Failed to upload image: ' + uploadError.message);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('car-images')
        .getPublicUrl(filePath);

      imageUrl = publicUrl;
    }

    const newCar = {
      make: formData.get('make'),
      model: formData.get('model'),
      year: Number(formData.get('year')),
      price: Number(formData.get('price')),
      mileage: Number(formData.get('mileage')),
      fuel: formData.get('fuel'),
      color: formData.get('color'),
      transmission: formData.get('transmission'),
      engine: formData.get('engine'),
      doors: Number(formData.get('doors')),
      seats: Number(formData.get('seats')),
      registration: formData.get('registration'),
      vin: formData.get('vin'),
      image_url: imageUrl,
    };

    const { error } = await supabase.from('Admin Table').insert([newCar]);
    if (error) {
      alert('❌ Failed to add car: ' + error.message);
    } else {
      form.reset();
      fetchData();
    }
  };

  const handleAssignClick = async (car) => {
    const selectedCustomerId = selectedCustomers[car.id];
    if (!selectedCustomerId) {
      alert('⚠️ Please select a customer before assigning.');
      return;
    }

    const customer = customers.find(c => c.id === selectedCustomerId);
    if (!customer) {
      alert('❌ Customer not found.');
      return;
    }

    const assignmentData = {
      id: car.id,
      car_make: car.make,
      car_model: car.model,
      // car_year: car.year,
      image_url: car.image_url,
      customer_name: customer.name,
      customer_address: customer.address,
      // customer_email: customer.email,

    };

    // Insert assignment data
    const { error } = await supabase.from('Update Data').insert([assignmentData]);
    if (error) {
      alert('❌ Failed to assign car: ' + error.message);
      return;
    }

    // Also update the customer record with the assigned car ID
    const { error: customerUpdateError } = await supabase
      .from('Add Customer')
      .update({ assigned_car_id: car.id })
      .eq('id', selectedCustomerId);

    if (customerUpdateError) {
      console.error('Failed to update customer with assigned car ID:', customerUpdateError);
    }

    fetchAssignments();
    setSuccessMessage(`Assigned ${car.make} ${car.model} to ${customer.name}`);

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);

  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    const form = customerFormRef.current;
    const formData = new FormData(form);

    const newCustomer = {
      name: formData.get('name'),
      email: formData.get('email'),
      address: formData.get('address'),
      from_port: formData.get('from_port'),
      departure_date: formData.get('departure_date'),
      consignee: formData.get('consignee'),
      consignee_address: formData.get('consignee_address'),
      consignee_tel: formData.get('consignee_tel'),
      arrival_port: formData.get('arrival_port'),
      arrival_date: formData.get('arrival_date'),
      arrival_tel: formData.get('arrival_tel'),
    };

    const { error } = await supabase.from('Add Customer').insert([newCustomer]);
    if (error) {
      alert('❌ Failed to add customer: ' + error.message);
    } else {
      form.reset();
      fetchData();
      alert(`✅ Customer ${newCustomer.name} added successfully.`);
    }
  };

  const handleDeleteCustomer = async (id) => {
    const { error } = await supabase.from('Add Customer').delete().eq('id', id);
    if (error) {
      alert('❌ Failed to delete customer: ' + error.message);
    } else {
      setCustomers(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleDeleteCar = async (carId) => {
    const confirmDelete = window.confirm("Are you sure you want to permanently delete this car?");
    if (!confirmDelete) return;

    const { error } = await supabase.from('Admin Table').delete().eq('id', carId);
    if (error) {
      alert('❌ Failed to delete car: ' + error.message);
    } else {
      setCarList(prev => prev.filter(car => car.id !== carId));
    }
  };

  if (loading) return <div class="loader"></div>;

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Car Dealer Portal</h2>

        <a onClick={async () => { await supabase.auth.signOut(); navigate(-1); }} className="logout">Logout</a>
        {successMessage && (
          <div className="fixed top-6  z-50 b text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-all duration-300 msgsuccess">
            <span className="text-lg">✅</span>
            <span>{successMessage}</span>
          </div>
        )}

      </aside>


      <main className="main-content">


        <h1>Welcome, Admin!</h1>
        <nav className='nav'>
          <button onClick={() => setShowSection('add-car')} className={`tab-link ${showSection === 'add-car' ? 'active' : ''}`}> Add Car</button>

          <button onClick={() => setShowSection('manage-cars')} className={`tab-link ${showSection === 'manage-cars' ? 'active' : ''}`}> Manage Cars </button>
          <button onClick={() => setShowSection('add-customer')} className={`tab-link ${showSection === 'add-customer' ? 'active' : ''}`}>Add Customer</button>
          <div className="active-indicator"
            style={{
              transform:
                showSection === 'add-car'
                  ? 'translateX(0%)'
                  : showSection === 'manage-cars'
                    ? 'translateX(100%)'
                    : 'translateX(200%)'
            }}>

          </div>
        </nav>

        {showSection === 'add-car' && (
          <section className="tab-content">
            <h2>Add Car</h2>
            <form ref={carFormRef} onSubmit={handleAddCar}>
              <div className="form-grid">
                <input type="text" name="make" placeholder="Make" required />
                <input type="text" name="model" placeholder="Model" required />
                <input type="number" name="year" placeholder="Year" required />
                <input type="number" name="price" placeholder="Price" required />
                <input type="number" name="mileage" placeholder="Mileage" required />
                <input type="text" name="fuel" placeholder="Fuel Type" required />
                <input type="text" name="color" placeholder="Color" required />
                <input type="text" name="transmission" placeholder="Transmission" required />
                <input type="text" name="engine" placeholder="Engine CC" required />
                <input type="number" name="doors" placeholder="Doors" required />
                <input type="number" name="seats" placeholder="Seats" required />
                <input type="text" name="registration" placeholder="Registration Year" required />
                <input type="text" name="vin" placeholder="VIN" required />
              </div>
              <div className="form-group">
                <label>Select Car Image:</label>
                <input type="file" name="image" accept="image/*" required />
              </div>
              <button type="submit">Add Car</button>
            </form>

            {/* {carList.length > 0 && (
              <div style={{ marginTop: '2rem' }}>
                <h3>Added Cars</h3>
                <div className="card-grid">
                  {carList.map((car) => (
                    <div key={car.id} className="car-card">
                      {car.image_url ? (
                        <img src={car.image_url} alt="Car" className="car-image" />
                      ) : (
                        <div className="car-image car-placeholder">No Image</div>
                      )}
                      <h3>{car.make} {car.model} ({car.year})</h3>
                      <p>Price: ${car.price}</p>
                      <p>Fuel: {car.fuel}</p>
                      <p>Transmission: {car.transmission}</p>
                      <p>Engine: {car.engine}cc</p>
                      <p>Seats: {car.seats}</p>

                      <select onChange={(e) => setSelectedCustomers({ ...selectedCustomers, [car.id]: e.target.value })}>
                        <option value="">Assign to Customer</option>
                        {customers.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => handleAssignClick(car)} className="delete-btn">Assign</button>
                        <button onClick={() => handleDeleteCar(car.id)} className="delete-btn">🗑 Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}
          </section>
        )}

        {showSection === 'add-customer' && (
          <section className="tab-content">
            <h2>Add Customer</h2>
            <form ref={customerFormRef} onSubmit={handleAddCustomer}>
              <div className="form-grid">
                <input type="text" name="name" placeholder="Customer Name" required />
                <input type="email" name="email" placeholder="Customer Email" required />
                <input type="text" name="address" placeholder="Customer Address" required />
                <input type="text" name="from_port" placeholder="From Port" required />
                <label htmlFor="Departure Date"><input type="date" name="departure_date" placeholder="Departure Date" required /></label>
                <input type="text" name="consignee" placeholder="Consignee" required />
                <input type="text" name="consignee_address" placeholder="Consignee Address" required />
                <input type="text" name="consignee_tel" placeholder="Consignee Tel" required />
                <input type="text" name="arrival_port" placeholder="Arrival Port" required />
                <label htmlFor="Arrival Date"><input type="date" name="arrival_date" placeholder="Arrival Date" required /></label>
                <input type="text" name="arrival_tel" placeholder="Arrival Tel" required />
              </div>
              <button type="submit">Add Customer</button>
            </form>

            {customers.length > 0 && (
              <div style={{ marginTop: '2rem' }}>
                <h3>Customer List</h3>
                <div className="card-grid">
                  {customers.map((customer) => (
                    <div key={customer.id} className="car-card-2" style={{ width: '400px' }}>
                      <h3 className='redtxt'>{customer.name}</h3>
                      <div className='txtflex'>
                        <p className='wgreen' ></p>
                        <p ><span ></span> {customer.email}</p>
                      </div>
                      <div className='txtflex'>
                        <p className='wblue' ></p>
                        <p ><span ></span> {customer.address}</p>
                      </div>
                      <div className='txtflex'>
                        <p className='wpurple' ></p>
                        <p ><span ></span> {customer.departure_date}</p>
                      </div>
                      <button onClick={() => handleDeleteCustomer(customer.id)} className="delete-btn-1">Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}


        {showSection === 'manage-cars' && (
          <section className="tab-content">
            {/* <h2>Add Car</h2>
            <form ref={carFormRef} onSubmit={handleAddCar}>
              <div className="form-grid">
                <input type="text" name="make" placeholder="Make" required />
                <input type="text" name="model" placeholder="Model" required />
                <input type="number" name="year" placeholder="Year" required />
                <input type="number" name="price" placeholder="Price" required />
                <input type="number" name="mileage" placeholder="Mileage" required />
                <input type="text" name="fuel" placeholder="Fuel Type" required />
                <input type="text" name="color" placeholder="Color" required />
                <input type="text" name="transmission" placeholder="Transmission" required />
                <input type="text" name="engine" placeholder="Engine CC" required />
                <input type="number" name="doors" placeholder="Doors" required />
                <input type="number" name="seats" placeholder="Seats" required />
                <input type="text" name="registration" placeholder="Registration Year" required />
                <input type="text" name="vin" placeholder="VIN" required />
              </div>
              <div className="form-group">
                <label>Select Car Image:</label>
                <input type="file" name="image" accept="image/*" required />
              </div>
              <button type="submit">Add Car</button>
            </form> */}

            {carList.length > 0 && (
              <div style={{ marginTop: '2rem' }}>
                <h3>Added Cars</h3>
                <div className="card-grid">
                  {carList.map((car) => (
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
                          <p >Price: ${car.price}</p>
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

                      <select onChange={(e) => setSelectedCustomers({ ...selectedCustomers, [car.id]: e.target.value })}>
                        <option value="">Assign to Customer</option>
                        {customers.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => handleAssignClick(car)} className="delete-btn">Assign</button>
                        <button onClick={() => handleDeleteCar(car.id)} className="delete-btn">🗑 Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default Admin;