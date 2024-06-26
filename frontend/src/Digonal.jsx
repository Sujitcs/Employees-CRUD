import React, { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

const Digonal = () => {
    const [one, setOne] = useState('');
    const [six, setSix] = useState('');
    const [eleven, setEleven] = useState('');
    const [sixt, setSixt] = useState('');
    const [sum, setSum] = useState('');

    const calculate = () => {
        const add = parseInt(one || 0) + parseInt(six || 0) + parseInt(eleven || 0) + parseInt(sixt || 0);
        setSum(add);
    };

    return (
        <div className='del'>
            <div className='assignment'>
                <Link to='/'><h2>Assignment 1</h2></Link>
            </div>
            <div className='assignment'>
                <h2>Assignment 2</h2>
            </div>
            <h3>Calculate sum of the diagonal numbers</h3>
            <input type="number" name="one" onChange={(e) => setOne(e.target.value)} id="" />
            <input type="number" name="2" id="" />
            <input type="number" name="3" id="" />
            <input type="number" name="4" id="" />
            <br />

            <input type="number" name="5" id="" />
            <input type="number" name="six" onChange={(e) => setSix(e.target.value)} id="" />
            <input type="number" name="7" id="" />
            <input type="number" name="8" id="" />
            <br />

            <input type="number" name="9" id="" />
            <input type="number" name="10" id="" />
            <input type="number" name="eleven" onChange={(e) => setEleven(e.target.value)} id="" />
            <input type="number" name="12" id="" />
            <br />

            <input type="number" name="13" id="" />
            <input type="number" name="14" id="" />
            <input type="number" name="15" id="" />
            <input type="number" name="sixt" onChange={(e) => setSixt(e.target.value)} id="" />
            <br />
            <button className='button4' onClick={calculate}> <b>Sum</b></button>
            <h1>The sum is: {sum}</h1>
        </div>
    );
};

export default Digonal;
