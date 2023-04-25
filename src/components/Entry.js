import personsService from '../services/persons'

const Entry = ({
        addPerson, 
        handleNameChange, 
        newName, 
        handleNumberChange, 
        newNum 
        }) => {  
    return (
        <div> 
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: 
                    <input 
                    onChange={handleNameChange}
                    value={newName}
                    />
                </div>
                <div>
                    number:
                    <input
                    onChange={handleNumberChange}
                    value={newNum}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>`
            </form>
        </div>   
    )
}

export default Entry