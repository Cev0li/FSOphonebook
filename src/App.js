import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Entry from './components/Entry'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Enter Name Here')
  const [newNum, setNewNum] = useState('Enter Number Here')
  const [filter, setFilter] = useState('Enter Query')

  //Ternary operater filters state according to entry in filter form
  //This is the array mapped into the DOM
  const filtered = filter === 'Enter Query' ? persons : persons.filter(person => person.name.slice(0, filter.length).toLowerCase() === filter.toLowerCase())

  //Effect hook retrieves phonebook from server on initial render and sets component state
  useEffect(() => {
    personsService
      .getAll()
      .then(initBook => {
        setPersons(initBook)
      })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    //Object created from state values at time form is submitted via add button
    const newPerson = {
      name: newName,
      number: newNum
    }
    //Variable assumes name is not added yet. Boolean flipped if name is found in current
    //state, alert is thrown. Name duplicates are not allowed.
    let nameFound = false
    persons.forEach(person => {
      if (person.name === newPerson.name) {
        nameFound = true
        newPerson.id = person.id
      }
    })
    //if name is in server, check to update phone number else add person to state
    if (nameFound) {
      //confirm number change with user
      const check = confirm(`${newPerson.name} is already entered in phonebook. Do you want to update the phone number?`)
      // Ternary operator handles window confirmation
      check 
        ? personsService.update(newPerson)
        : console.log('nothing happens')
    } else {
      personsService.create(newPerson)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
        })
    }
    //reset newName and newNum state, effectivly updating the form placeholder
    //through the controlled component 
    setNewName('Enter Name Here')
    setNewNum('Enter Number Here')
  }

  //Passed to Person prop. Used in the props delete button to delete enrty from state and server.
  const deleteEntry = (id) => {
    const user = personsService.getPerson(id)
    //user provides confirmation to delete phonebook entry
    if (confirm(`Delete ${user.name}`) === true) {
      personsService
        .deleteEntry(id)
        //promise chain syncs component state with server state after delete request is completed
        .then(() => {
          personsService
            .getAll()
            .then(newSet => {
              setPersons(newSet)
            })
        })
    } else {
      alert(`${user.name} not deleted`)
    }
  }

  //controlled component handler
  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  //controlled component handler
  const handleNumberChange = (e) => {
    setNewNum(e.target.value)
  }

  //controlled component handler
  const handleFilterChange = (e) => {
    setFilter(e.target.value)
    //reset form when input is empty
    //This is to control state.
    //Not great user experience, will recode better experience at a later time
    if (e.target.value == '') {
      setFilter('Enter Query')
    }
  }

  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} filter={filter} />
      <Entry
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNum={newNum}
      />
      <Persons filtered={filtered} deleteEntry={deleteEntry} />
    </div>
  )
}

export default App
