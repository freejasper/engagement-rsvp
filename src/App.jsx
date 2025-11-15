import { use, useEffect, useState } from 'react'
import names from './dummyData';
import NameInputShell from './utils/NameInputShell';
import TextHeader from './utils/ui/TextHeader';
import RsvpOptionsShell from './utils/RsvpOptionsShell';
import TextFooter from './utils/ui/TextFooter';
import './App.css'

import { loadList, saveList } from './api.js';

function App() {
  // load and set data
  const [listData, setListData] = useState([]);
  const [listSha, setListSha] = useState('');

  async function fetchData() {
      try {
        const result = await loadList();
        if (result.ok) setListData(result.data);
        if(result.ok) setListSha(result.sha);
      } catch (err) {
        console.log('Error loading list data:', err);
      }
    }

  useEffect(() => {
    fetchData();
    if (listData) console.log('List data loaded:', listData);
  }, [listData]);
   
  // Setting and checking entered name against names list
  const [matchedName, setMatchedName] = useState('');
  const [plusOne, setPlusOne] = useState('');
  const [skipPlusOne, setSkipPlusOne] = useState(false);
  const [step, setStep] = useState(1);

  const namesValues = Object.values(names);
  const [dinnerInvite, setDinnerInvite] = useState(false)

  function matchName(enteredName) {
    const match = namesValues.find((person) => {
      return person.name.toLowerCase().replace(/\s+/g, '') === enteredName.toLowerCase().replace(/\s+/g, '')
    });
    if (match) {
      setMatchedName(enteredName);
      if (match.partner) {
        setPlusOne(match.partner);
        setSkipPlusOne(false);
      } else {
        setPlusOne('');
        setSkipPlusOne(true);
      }
      setDinnerInvite(match.dinnerInvite);
    } else {
      setMatchedName('');
      setPlusOne('');
      setSkipPlusOne(false);
    }
  }

  useEffect(() => {
    if (matchedName.length > 0) setStep(2);
  }, [matchedName]);

  useEffect(() => {
    console.log('Plus one:', plusOne);
  }, [plusOne]);

  // RSVP options
  const [attendance, setAttendance] = useState('');
  const [plusOneAttendance, setPlusOneAttendance] = useState('');

  useEffect(() => {
    console.log('Attendance status:', attendance);
  }, [attendance]);

  useEffect(() => {
    console.log('Plus one attendance status:', plusOneAttendance);
  }, [plusOneAttendance]);

  const [dinnerAttendance, setDinnerAttendance] = useState('');
  const [dinnerPlusOneAttendance, setDinnerPlusOneAttendance] = useState('');

  useEffect(() => {
    console.log('Dinner status:', dinnerAttendance);
  }, [dinnerAttendance]);

  useEffect(() => {
    console.log('Plus One Dinner status:', dinnerPlusOneAttendance);
  }, [dinnerPlusOneAttendance]);

  const [attendanceComplete, setAttendanceComplete] = useState(false);
  const [dinnerAttendanceComplete, setDinnerAttendanceComplete] = useState(false);

  function submitForm () {
    if (matchedName, attendanceComplete, dinnerAttendanceComplete) {

      const match = namesValues.find((person) => {
        if (person.name.toLowerCase().replace(/\s+/g, '') === matchedName.toLowerCase().replace(/\s+/g, '')) {
          return person;
        }
      });
      if (match) {
        match.rsvp = attendance;
        match.dinnerRsvp = dinnerAttendance;

        const plusOneMatch = namesValues.find((person) => {
          if (person.name.toLowerCase().replace(/\s+/g, '') === plusOne.toLowerCase().replace(/\s+/g, '')) {
            return person;
          }
        });
        if (plusOneMatch) {
          plusOneMatch.rsvp = plusOneAttendance;
          plusOneMatch.dinnerRsvp = plusOneAttendance;
        }
      }

    }
  }

  return (
    <>
      <TextHeader />
      <TextFooter />
      <NameInputShell 
        matchName={matchName}
        setStep={setStep} />
      <RsvpOptionsShell
        matchedName={matchedName}
        attendance={attendance}
        setAttendance={setAttendance}
        plusOne={plusOne} 
        plusOneAttendance={plusOneAttendance} 
        setPlusOneAttendance={setPlusOneAttendance}
        skipPlusOne={skipPlusOne}
        dinnerAttendance={dinnerAttendance}
        setDinnerAttendance={setDinnerAttendance}
        dinnerPlusOneAttendance={dinnerPlusOneAttendance}
        setDinnerPlusOneAttendance={setDinnerPlusOneAttendance} 
        step={step}
        setStep={setStep}
        dinnerInvite={dinnerInvite}
        attendanceComplete={attendanceComplete}
        setAttendanceComplete={setAttendanceComplete}
        dinnerAttendanceComplete={dinnerAttendanceComplete}
        setDinnerAttendanceComplete={setDinnerAttendanceComplete}
        submitForm={submitForm} />
    </>
  )
}

export default App
