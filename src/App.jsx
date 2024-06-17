import './App.css'

function App() {

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      age: formData.get('age')
  };

  try {
    const response = await fetch('http://localhost:3001/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <p>
          <label>Nome:</label>
          <input type='text' name='name'></input>
        </p>
        <p>
          <label>Idade</label>
          <input type='number' name='age'></input>
        </p>
        <input type='submit' value='SAVE'></input>
      </form>
    </div>
  )
}

export default App
