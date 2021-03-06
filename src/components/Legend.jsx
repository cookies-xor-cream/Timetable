import React, { useState, useEffect } from 'react';
import 'react-dom';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import Timeslot from './Timeslot';

const Legend = ({ className, unitList, unitColours, addUnit, deleteUnitIndex, allColoursExhausted }) => {
  const [units, setUnits]     = useState(unitList);
  const [colours, setColours] = useState(unitColours);

  const [unitInput, setUnitInput] = useState('');

  useEffect(
    () => {
      setUnits(unitList);
      setColours(unitColours);
    },
    [unitList, unitColours]
  );

  const handleUnitAddition = () => {
    if(!allColoursExhausted() && unitInput !== '') {
      addUnit(unitInput);
      setUnitInput('');
    }
  }

  // Enter does the same as the add button
  const handleAdditionOnEnter = event => {
    if (event.keyCode === 13) {
      handleUnitAddition()
    }
  }

  // handles the onChange event of the input
  const updateUnitInput = event => {
    if (event.target.value.match(/^[A-Z]+[0-9A-Z]*$/) || event.target.value === '') {
      setUnitInput(event.target.value);
    }
  }

  return (
    <Table 
      variant='dark'
      style={{'tableLayout': 'fixed', 'width': '100%'}}
    >
      <thead>
        <tr>
          <th key={ 'legendTitle' } colSpan='3'> Legend </th>
        </tr>

        {
          units.length > 0 &&
            <tr key={ 'legendHeading' }>
              <th key={ 'colourHeading' } colSpan='2'>Colour Key</th>
              <th key={ 'unitDeleteHeading' }>Delete</th>    
            </tr>
        }
      </thead>

      <tbody>
        {
          units.map((_, i) => {
            return (
              <tr key={ 'legend' + units[i] }>
                <Timeslot
                  key={ 'keyUnit' + i + units[i]}
                  allocationIndex={i}
                  unitList={units}
                  unitColours={colours}
                  content={units[i]}
                  colSpan='2'
                />

                <td key={ 'delete' + units[i] }> 
                  <Button 
                  onClick={ () => deleteUnitIndex(i) }
                  style={{'width': '100%'}}
                  variant='outline-danger'
                  >
                    !!!
                  </Button>
                </td>
              </tr>
            );
          })
        }

        {
          (!allColoursExhausted()) &&            
            <tr key={ 'inputrow' }>
              <td>
                <input 
                  type="text"
                  onChange={ updateUnitInput }
                  value={ unitInput }
                  placeholder={ 'Add a unit' }
                  style={{'textAlign': 'center', 'width': '200%'}}
                  onKeyDown={ handleAdditionOnEnter }
                >          
                </input>
              </td>
              <td></td>
              <td>
                <Button
                  variant='outline-neon'
                  onClick={handleUnitAddition}
                  style={{'width': '100%'}}
                >
                  Add
                </Button>
              </td>
            </tr>
        }

        {
          (allColoursExhausted()) &&
            <tr key={ 'maxReached' }>
              <td colSpan='3'>
                All Colours Exhausted
              </td>
            </tr>
        }

      </tbody>
    </Table>
  );
};

export default Legend;
