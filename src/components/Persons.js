import Person from './Person'

const Persons = ({filtered, deleteEntry }) => {
    return (
        <div>
            <h2>Numbers</h2>
            {filtered.map(person => 
                <Person 
                key={person.id} 
                name={person.name} 
                number={person.number} 
                deleteEntry={() => deleteEntry(person.id)}
                />
            )}
        </div>
    )
}

export default Persons
