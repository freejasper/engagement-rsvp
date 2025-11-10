import { useEffect, useRef } from 'react';
import '../../css/TextHeader.css';

export default function TextHeader() {
    const textHeaderRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (textHeaderRef.current) {
                textHeaderRef.current.classList.remove('header-hidden');
                textHeaderRef.current.classList.add('header-visible');
            }
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (textHeaderRef.current) {
                textHeaderRef.current.classList.remove('header-visible');
                textHeaderRef.current.classList.add('header-moved-up');
            }
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div ref={textHeaderRef} id='text-header' className='header-hidden'>
            <h4>YOU ARE INVITED</h4>
            <h3><span className='superscript' >TO</span> <span className='underline' >CELEBRATE</span> <span className='superscript' >THE</span> <span className='underline' >ENGAGEMENT</span> <span className='superscript' >OF</span></h3>
        </div>
    );
};