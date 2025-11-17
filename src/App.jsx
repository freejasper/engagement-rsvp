import { useEffect, useLayoutEffect, useState, useRef } from 'react'
import NameInputShell from './utils/NameInputShell';
import TextHeader from './utils/ui/TextHeader';
import RsvpOptionsShell from './utils/RsvpOptionsShell';
import TextFooter from './utils/ui/TextFooter';
import './App.css'

// API
import { loadList, saveList } from './api.js';

function App() {
  // load and set data
  const [loading, setLoading] = useState(true);
  const [listData, setListData] = useState([]);
  const [listSha, setListSha] = useState('');

  const [submitComplete, setSubmitComplete] = useState(false);
  const submitMessageRef = useRef(null);

  useEffect(() => {
    if (submitMessageRef.current) {
      setSubmitComplete(false);
      submitMessageRef.current.style.display = 'none';
          submitMessageRef.current.style.opacity = '0';
    }

    const fetchData = async () => {
      try {
        const result = await loadList();
        if (result.ok) setListData(result.data);
        if(result.ok) setListSha(result.sha);
      } catch (err) {
        console.log('Error loading list data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  //window resize listener
  const svgRef = useRef(null);
  const infoRef = useRef(null);

  useLayoutEffect(() => {
    function setTopMargin() {
      if (svgRef.current && infoRef.current) {
        const svgHeight = svgRef.current.getBoundingClientRect().height * 0.27;
        console.log('svgHeight:', svgHeight);
        infoRef.current.style.marginTop = `-${svgHeight}px`;
      }      
    }
    if(!loading) setTopMargin();
    window.addEventListener('resize', setTopMargin);
    return () => {
      window.removeEventListener('resize', setTopMargin);
    };
  }, [loading]);
   
  // Setting and checking entered name against names list
  const [matchedName, setMatchedName] = useState('');
  const [plusOne, setPlusOne] = useState('');
  const [skipPlusOne, setSkipPlusOne] = useState(false);
  const [step, setStep] = useState(1);
  const [dinnerInvite, setDinnerInvite] = useState(false)

  function norm(str) {
    return String(str).toLowerCase().replace(/\s+/g, '');
  }

  function matchName(enteredName) {
    const match = listData.find((person) => {
      return norm(person.name) === norm(enteredName);
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

  // RSVP states
  const [attendance, setAttendance] = useState('');
  const [plusOneAttendance, setPlusOneAttendance] = useState('');
  const [dinnerAttendance, setDinnerAttendance] = useState('');
  const [dinnerPlusOneAttendance, setDinnerPlusOneAttendance] = useState('');
  const [attendanceComplete, setAttendanceComplete] = useState(false);
  const [dinnerAttendanceComplete, setDinnerAttendanceComplete] = useState(false);

  // SUBMIT FORM FUNCTION
  function submitForm () {
    if ((dinnerInvite && dinnerAttendanceComplete) || (!dinnerInvite)) {
      if (matchedName && attendanceComplete) {
      const updates = {
        [norm(matchedName)]:{
        name: matchedName,
        rsvp: attendance,
        dinnerRsvp: dinnerAttendance,
        dinnerInvite: dinnerInvite
      }
      };
      if (plusOne){
        updates[norm(plusOne)] = {
        name: plusOne,
        rsvp: plusOneAttendance,
        dinnerRsvp: dinnerPlusOneAttendance,
        dinnerInvite: dinnerInvite
        }
      }

      setListData((prev) => {
        const newData = prev.map((person) => {
          const key = norm(person.name);
          return updates[key] ? { ...person, ...updates[key] } : person;
        });
        saveList(newData, listSha).then((result) => {
          if (result.ok) {
            setListSha(result.sha);
            console.log('List saved', result.sha);
          }
        }).catch(console.error);

        console.log('Submit complete', newData);
        // reset states
        setListData(newData);
        setMatchedName('');
        setPlusOne('');
        setStep(1);
        setAttendance('');
        setPlusOneAttendance('');
        setDinnerAttendance('');
        setDinnerPlusOneAttendance('');
        setAttendanceComplete(false);
        setDinnerAttendanceComplete(false);
        setDinnerInvite(false);

        setSubmitComplete(true);
        if (submitMessageRef.current) {
          setTimeout(() => {
            submitMessageRef.current.style.display = 'flex';
            submitMessageRef.current.style.opacity = '1';
          }, 500);
          
        }
        return newData;
      })
    }
  }
  }

  // LOGGING STATES
  useEffect(() => {
    console.log('Attendance status:', attendance);
  }, [attendance]);

  useEffect(() => {
    console.log('Plus one attendance status:', plusOneAttendance);
  }, [plusOneAttendance]);

  useEffect(() => {
    console.log('Dinner status:', dinnerAttendance);
  }, [dinnerAttendance]);

  useEffect(() => {
    console.log('Plus One Dinner status:', dinnerPlusOneAttendance);
  }, [dinnerPlusOneAttendance]);

  useEffect(() => {
    console.log('Plus one:', plusOne);
  }, [plusOne]);

  useEffect(() => {
    console.log('listData:', listData)
  }, [listData]);

  useEffect(() => {
    console.log('List SHA:', listSha);
  }, [listSha]);

  if (loading) {
    return (
      <div id="loading">Loading ...</div>
    )
  }

  if (!loading){
    return (
    <div id="app-container">
      <TextHeader />
      <TextFooter
      infoRef={infoRef}
      svgRef={svgRef} />
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
        {submitComplete && <div id="submit-complete-message"><div id="submission-box">RSVP submission complete <br></br>See you on the 7th of Feb</div></div>}
    </div>
  )
}
}

export default App
